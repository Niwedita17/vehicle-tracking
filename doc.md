# FleetOps Platform - Feature Demo Guide

Welcome to the FleetOps Platform! This document summarizes all the features and functionalities currently implemented in this service.

---

## 🔐 Authentication Flow
- **Secure Login/Signup**: Accessible via a premium glassmorphic interface.
- **Phone + OTP Verification**: Fleet managers can log in or register using their 10-digit mobile number.
- **Mock Verification**: For demo purposes, use any 10-digit number and enter **`123456`** as the OTP to bypass the screen.

---

## 📊 Dashboard Overview
The command center of the application, featuring a modern responsive grid layout.

### 1. Key Metrics Grid
- **In Maintenance**: Real-time count of vehicles currently in the shop.
- **Overdue Tasks**: Urgent maintenance items that missed their deadline.
- **Upcoming (30D)**: Predictive counter for scheduled maintenance in the next 30 days.
- **Maint. Cost (Apr)**: Financial tracking for the current month.
- **Total Maint. Cost**: Cumulative fleet spending tracker.

### 2. Advanced Data Visualization
- **Maintenance Cost Chart**: A bar chart breaking down spending by month.
- **Compliance Health Chart**: A vehicle-centric Doughnut chart categorizing the fleet into:
  - 🟢 **Fully Compliant**
  - 🟡 **At Risk** (Documents expiring soon)
  - 🔴 **Grounded** (Expired critical documents)

### 3. Actionable Feeds
- **Active Alerts**: Critical warnings (e.g., "Insurance expired - Do not dispatch").
- **Upcoming Maintenance**: A direct list of next-up tasks sorted by date.

---

## 🚛 Module Breakdown

### 1. Vehicles View
- Complete fleet listing with plate numbers, models, driver assignments, and odometer readings.
- Status indicators (Active, Maintenance).
- Form to add new vehicles (simulated backend storage).

### 2. Maintenance Log
- Historical record of all repairs, inspections, and routine services.
- Cost tracking per log entry.

### 3. Schedule View
- Calendar list of pending and completed maintenance tasks.
- Status toggles to manage workflow.

### 4. Drivers View
- List of drivers with contact details and license verification statuses.

### 5. Compliance View
- Deep dive into vehicle documentation (RC, Insurance, PUC, Fitness, Road Tax).
- Tracks exact renewal dates.

---

## 🔌 Integration Layer (Backend)

### 1. Vahan API Adapter (Option A)
- Simulated endpoint returning rich vehicle data including Owner Name, Chassis Number, Engine Number, and fuel types.

### 2. Twilio WhatsApp Alerts (Simulated)
- Simulated webhook and send-alert endpoints ready for real Twilio API credentials.

### 3. Experimental Vahan Scraper
- A hybrid Puppeteer script (`server/scraper.js`) that can be used to attempt manual-assisted data extraction on machines supporting Chromium automation.

---
*This project is currently running in Hybrid Mode (Simulated APIs with Full UI Capability).*
