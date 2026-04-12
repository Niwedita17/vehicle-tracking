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
