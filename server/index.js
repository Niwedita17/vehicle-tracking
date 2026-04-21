const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { phone, name, company } = req.body;
  try {
    const user = await prisma.user.create({
      data: { phone, name, company }
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { phone }
    });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Routes
app.get('/api/vehicles', async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    const vehicles = await prisma.vehicle.findMany({ where: { company } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

app.post('/api/vehicles', async (req, res) => {
  const { company } = req.body;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    await prisma.vehicle.create({ data: req.body });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
});

app.get('/api/drivers', async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    const drivers = await prisma.driver.findMany({ where: { company } });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

app.post('/api/drivers', async (req, res) => {
  const { company } = req.body;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    await prisma.driver.create({ data: req.body });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create driver' });
  }
});

app.get('/api/schedule', async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    const schedule = await prisma.schedule.findMany({ where: { company } });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

app.post('/api/schedule', async (req, res) => {
  const { company } = req.body;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    await prisma.schedule.create({ data: req.body });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

app.get('/api/compliance', async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    const compliance = await prisma.compliance.findMany({ where: { company } });
    res.json(compliance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch compliance' });
  }
});

app.post('/api/compliance', async (req, res) => {
  const { company } = req.body;
  if (!company) return res.status(400).json({ error: 'Company required' });
  try {
    await prisma.compliance.create({ data: req.body });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create compliance' });
  }
});

// Admin Routes (No company filtering)
app.get('/api/admin/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all vehicles' });
  }
});

app.get('/api/admin/drivers', async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all drivers' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all users' });
  }
});

// Approach A: Vahan API Adapter (Mocked)
app.post('/api/vahan/fetch', (req, res) => {
  const { vehicleNumber } = req.body;
  
  if (!vehicleNumber) {
    return res.status(400).json({ error: 'Vehicle number is required' });
  }

  console.log(`[Vahan] Fetching data for ${vehicleNumber} via API...`);
  
  // Simulate API response
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        vehicleNumber,
        ownerName: 'Fleet Manager Corp',
        makerModel: 'Tata Prima 4928.S',
        vehicleClass: 'Heavy Goods Vehicle',
        fuelType: 'Diesel',
        chassisNumber: 'MAT123456E7890123',
        engineNumber: 'ENG987654321',
        rcExpiry: '2031-01-01',
        insuranceExpiry: '2026-12-01',
        pucExpiry: '2026-06-01',
        fitnessExpiry: '2027-01-01',
        taxExpiry: '2026-12-01'
      }
    });
  }, 1000);
});

// Twilio WhatsApp Webhook (Mocked)
app.post('/api/twilio/webhook', (req, res) => {
  const { From, Body } = req.body;
  console.log(`[Twilio] Received message from ${From}: ${Body}`);
  
  // Simulate automated reply
  res.json({
    success: true,
    message: 'Reply received and logged.'
  });
});

// Send Alert Route (Mocked)
app.post('/api/alerts/send', (req, res) => {
  const { to, message } = req.body;
  console.log(`[Twilio] Sending WhatsApp alert to ${to}: ${message}`);
  
  res.json({
    success: true,
    message: `Alert sent to ${to}`
  });
});

app.get('/', (req, res) => {
  res.send('FleetOps Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
