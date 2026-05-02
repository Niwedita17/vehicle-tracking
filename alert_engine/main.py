import os
import logging
from datetime import datetime, date, timedelta
import uuid
from contextlib import asynccontextmanager
import pytz

from fastapi import FastAPI
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from twilio.rest import Client as TwilioClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import UUID, String, Date, ForeignKey, select

# Logging Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Environment Variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/fleetguard")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_NUMBER = os.getenv("TWILIO_WHATSAPP_NUMBER") # format: 'whatsapp:+14155238886'

# Twilio Client Initialization
twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# SQLAlchemy Async Engine and Session
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# Database Models (SQLAlchemy 2.0 Style)
class Base(DeclarativeBase):
    pass

class Client(Base):
    __tablename__ = "clients"
    client_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    company_name: Mapped[str] = mapped_column(String(255))
    whatsapp_number: Mapped[str] = mapped_column(String(15))

class Vehicle(Base):
    __tablename__ = "vehicles"
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    client_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("clients.client_id"))
    registration_number: Mapped[str] = mapped_column(String(15))

class ComplianceRecord(Base):
    __tablename__ = "compliance_records"
    record_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("vehicles.vehicle_id"))
    document_type: Mapped[str] = mapped_column(String(50))
    expiry_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(20))

# Core Alert Logic
async def send_daily_alerts():
    logger.info("Starting daily WhatsApp compliance alerts job...")
    ist = pytz.timezone('Asia/Kolkata')
    today = datetime.now(ist).date()
    
    # Target intervals: 15 days, 7 days, and 1 day away
    intervals = [1, 7, 15]
    target_dates = [today + timedelta(days=d) for d in intervals]

    async with AsyncSessionLocal() as session:
        stmt = (
            select(
                Client.whatsapp_number,
                Vehicle.registration_number,
                ComplianceRecord.document_type,
                ComplianceRecord.expiry_date
            )
            .join(Vehicle, Client.client_id == Vehicle.client_id)
            .join(ComplianceRecord, Vehicle.vehicle_id == ComplianceRecord.vehicle_id)
            .where(ComplianceRecord.expiry_date.in_(target_dates))
        )
        
        try:
            result = await session.execute(stmt)
            records = result.all()
        except Exception as e:
            logger.error(f"Database query failed during alert job: {e}", exc_info=True)
            return

    logger.info(f"Found {len(records)} records expiring within target intervals.")

    for r in records:
        days_remaining = (r.expiry_date - today).days
        
        # Message format requirement
        message_body = (
            f"🚨 FleetGuard Alert 🚨\n"
            f"Vehicle: {r.registration_number}\n"
            f"Document: {r.document_type}\n"
            f"Status: Expiring in {days_remaining} days on {r.expiry_date.strftime('%Y-%m-%d')} ⚠️\n"
            f"Please renew immediately to avoid challans."
        )
        
        try:
            recipient_number = f"whatsapp:{r.whatsapp_number}"
            
            message = twilio_client.messages.create(
                body=message_body,
                from_=TWILIO_WHATSAPP_NUMBER,
                to=recipient_number
            )
            logger.info(f"Message {message.sid} sent to {recipient_number} for vehicle {r.registration_number}")
        except Exception as e:
            # Individual error handling ensures a single failed message doesn't stop the bulk execution
            logger.error(f"Twilio message failed for vehicle {r.registration_number} to {r.whatsapp_number}: {e}", exc_info=True)

    logger.info("Daily WhatsApp compliance alerts job finished.")

# Scheduler Setup
scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Schedule the job daily at 08:00 AM IST
    scheduler.add_job(
        send_daily_alerts,
        CronTrigger(hour=8, minute=0, timezone='Asia/Kolkata'),
        id="daily_compliance_alerts",
        replace_existing=True
    )
    scheduler.start()
    logger.info("APScheduler initiated. Daily job configured for 08:00 AM IST.")
    yield
    scheduler.shutdown()
    logger.info("APScheduler shut down.")

app = FastAPI(lifespan=lifespan)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Endpoint for manual testing & triggering
@app.post("/admin/trigger-alerts")
async def trigger_alerts():
    await send_daily_alerts()
    return {"status": "Alert job triggered manually"}
