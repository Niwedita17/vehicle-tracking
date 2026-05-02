# FleetOps Dashboard

A professional, data-driven compliance and maintenance platform for fleet managers.

## Project Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Running the Application

1. **Backend Server**:
   ```bash
   cd server
   npm install
   npm start
   ```
   The server will run on `http://localhost:5000`.

2. **Frontend (React)**:
   ```bash
   # In the root directory
   npm install
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Database Setup (PostgreSQL & Prisma)

If you are running this on a machine that supports Prisma engines (some environments may block the binary):

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file in the `server` directory and add your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/fleetops?schema=public"
   ```
3. Run the Prisma migration to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

## WhatsApp Alert Engine (Python/FastAPI)

This microservice runs a daily cron job at 08:00 AM IST and triggers WhatsApp alerts via Twilio to clients for documents expiring in 15, 7, or 1 days.

### How to Run the Engine

1. Navigate to the alert engine directory:
   ```bash
   cd alert_engine
   ```
2. Create a Python virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Provide your environment variables and start the Uvicorn server:
   ```bash
   export DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/fleetguard"
   export TWILIO_ACCOUNT_SID="your_sid"
   export TWILIO_AUTH_TOKEN="your_token"
   export TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
   
   uvicorn main:app --reload
   ```

## Vahan Data Extraction (Scraper)

We have implemented a prototype hybrid scraper to fetch vehicle details from the Parivahan website.

### How to Test the Scraper
Due to Captcha protections on the official site, this is a **hybrid scraper** that requires manual intervention for login.

1. Open a terminal and navigate to the server directory:
   ```bash
   cd server
   ```
2. Install Puppeteer (if not already installed):
   ```bash
   npm install puppeteer
   ```
3. Run the scraper script:
   ```bash
   node scraper.js
   ```
4. A Chromium browser window will open. **You must manually solve the Captcha and log in with your mobile number.**
5. Once logged in, the script can be extended to read the data (currently it just waits for 1 minute to demonstrate the window stays open).

*Note: If you encounter "Failed to launch the browser process" errors on some machines, ensure all Chromium dependencies are installed for Puppeteer.*
