import os
import uuid
import asyncio
from datetime import date, timedelta
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from main import Client, Vehicle, ComplianceRecord

# Environment Variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/fleetguard")

# SQLAlchemy Async Engine
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def seed():
    print("Seeding test data for FleetGuard...")
    
    async with AsyncSessionLocal() as session:
        async with session.begin():
            # Create Dummy Client
            # NOTE: Replace '+919876543210' with your actual test WhatsApp number to receive messages!
            client = Client(
                client_id=uuid.UUID('11111111-1111-1111-1111-111111111111'),
                company_name='Sister Logistics',
                whatsapp_number='+919876543210' 
            )
            
            # Create Dummy Vehicle
            vehicle = Vehicle(
                vehicle_id=uuid.UUID('22222222-2222-2222-2222-222222222222'),
                client_id=uuid.UUID('11111111-1111-1111-1111-111111111111'),
                registration_number='KA-01-AB-1234'
            )
            
            # Create Dummy Compliance Record (Set to expire exactly 7 days from today)
            record = ComplianceRecord(
                record_id=uuid.UUID('33333333-3333-3333-3333-333333333333'),
                vehicle_id=uuid.UUID('22222222-2222-2222-2222-222222222222'),
                document_type='PUC',
                expiry_date=date.today() + timedelta(days=7),
                status='VALID'
            )
            
            session.add(client)
            session.add(vehicle)
            session.add(record)
            
    print("Seeding successfully completed!")

if __name__ == "__main__":
    asyncio.run(seed())
