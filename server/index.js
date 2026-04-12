const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let vehiclesData = [
  { plate: 'HR26AR7790', name: 'Tata Prima 4928.S', year: '2021', status: 'Active', odometer: '37,400 km', driver: '-', lastService: 'Jan 5, 2026' },
  { plate: 'RJ14GP1137', name: 'Ashok Leyland 3518', year: '2020', status: 'Active', odometer: '74,300 km', driver: '-', lastService: 'Feb 2, 2026' },
  { plate: 'KA02W14451', name: 'Eicher Pro 6025', year: '2022', status: 'Active', odometer: '51,200 km', driver: '-', lastService: 'Mar 5, 2026' },
  { plate: 'TN18C7712', name: 'BharatBenz 3723R', year: '2019', status: 'Maintenance', odometer: '126,800 km', driver: '-', lastService: 'Dec 5, 2025' },
  { plate: 'GJ05CD4460', name: 'Mahindra Blazo X 49', year: '2021', status: 'Active', odometer: '63,100 km', driver: '-', lastService: 'Dec 2, 2025' },
];

let driversData = [
  { id: 'DRV001', name: 'John Doe', license: 'DL-12345', contact: '+91 9876543210', status: 'Active', dlExpiry: '2028-01-01', hazmatValid: '2027-01-01', eyeTestDate: '2026-12-01' },
  { id: 'DRV002', name: 'Jane Smith', license: 'DL-67890', contact: '+91 8765432109', status: 'Inactive', dlExpiry: '2026-05-01', hazmatValid: 'Expired', eyeTestDate: '2025-12-01' },
  { id: 'DRV003', name: 'Mike Johnson', license: 'DL-54321', contact: '+91 7654321098', status: 'Active', dlExpiry: '2029-01-01', hazmatValid: '2026-10-01', eyeTestDate: '2026-06-01' },
];

let scheduleData = [
  { id: 'SCH001', vehicle: 'HR26AR7790', task: 'Oil Change', date: '2026-04-15', status: 'Pending' },
  { id: 'SCH002', vehicle: 'GJ05CD4460', task: 'Tire Rotation', date: '2026-04-18', status: 'Pending' },
  { id: 'SCH003', vehicle: 'KA02W14451', task: 'Brake Repair', date: '2026-04-10', status: 'Completed' },
  { id: 'SCH004', vehicle: 'TN18C7712', task: 'Engine Check', date: '2026-04-01', status: 'Overdue' },
];

let complianceData = [
  { id: 'CMP001', vehicle: 'HR26AR7790', type: 'RC', status: 'Valid', renewalDate: '2031-01-01' },
  { id: 'CMP002', vehicle: 'HR26AR7790', type: 'Insurance', status: 'Valid', renewalDate: '2026-12-01' },
  { id: 'CMP003', vehicle: 'HR26AR7790', type: 'PUC', status: 'Valid', renewalDate: '2026-06-01' },
  { id: 'CMP004', vehicle: 'HR26AR7790', type: 'Fitness', status: 'Valid', renewalDate: '2027-01-01' },
  { id: 'CMP005', vehicle: 'HR26AR7790', type: 'Road Tax', status: 'Valid', renewalDate: '2026-12-01' },
  
  { id: 'CMP006', vehicle: 'RJ14GP1137', type: 'RC', status: 'Valid', renewalDate: '2030-05-01' },
  { id: 'CMP007', vehicle: 'RJ14GP1137', type: 'Insurance', status: 'Expired', renewalDate: '2026-04-01' },
  { id: 'CMP008', vehicle: 'RJ14GP1137', type: 'PUC', status: 'Valid', renewalDate: '2026-05-01' },
  { id: 'CMP009', vehicle: 'RJ14GP1137', type: 'Fitness', status: 'Valid', renewalDate: '2026-09-01' },
  
  { id: 'CMP010', vehicle: 'KA02W14451', type: 'RC', status: 'Valid', renewalDate: '2032-01-01' },
  { id: 'CMP011', vehicle: 'KA02W14451', type: 'Insurance', status: 'Valid', renewalDate: '2027-01-01' },
  { id: 'CMP012', vehicle: 'KA02W14451', type: 'PUC', status: 'Expiring Soon', renewalDate: '2026-04-20' },
  { id: 'CMP013', vehicle: 'KA02W14451', type: 'Fitness', status: 'Valid', renewalDate: '2026-12-01' },
];

// Routes
app.get('/api/vehicles', (req, res) => res.json(vehiclesData));
app.post('/api/vehicles', (req, res) => { vehiclesData.push(req.body); res.json({ success: true }); });

app.get('/api/drivers', (req, res) => res.json(driversData));
app.post('/api/drivers', (req, res) => { driversData.push(req.body); res.json({ success: true }); });

app.get('/api/schedule', (req, res) => res.json(scheduleData));
app.post('/api/schedule', (req, res) => { scheduleData.push(req.body); res.json({ success: true }); });

app.get('/api/compliance', (req, res) => res.json(complianceData));
app.post('/api/compliance', (req, res) => { complianceData.push(req.body); res.json({ success: true }); });

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
