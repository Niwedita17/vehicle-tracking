const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Google company data...');

  // Create mock vehicles
  await prisma.vehicle.createMany({
    data: [
      { plate: 'HR26AR7790', name: 'Tata Prima 4928.S', year: '2021', status: 'Active', odometer: '37,400 km', driver: '-', lastService: 'Jan 5, 2026', company: 'Google' },
      { plate: 'RJ14GP1137', name: 'Ashok Leyland 3518', year: '2020', status: 'Active', odometer: '74,300 km', driver: '-', lastService: 'Feb 2, 2026', company: 'Google' },
      { plate: 'KA02W14451', name: 'Eicher Pro 6025', year: '2022', status: 'Active', odometer: '51,200 km', driver: '-', lastService: 'Mar 5, 2026', company: 'Google' },
      { plate: 'TN18C7712', name: 'BharatBenz 3723R', year: '2019', status: 'Maintenance', odometer: '126,800 km', driver: '-', lastService: 'Dec 5, 2025', company: 'Google' },
      { plate: 'GJ05CD4460', name: 'Mahindra Blazo X 49', year: '2021', status: 'Active', odometer: '63,100 km', driver: '-', lastService: 'Dec 2, 2025', company: 'Google' },
    ],
    skipDuplicates: true,
  });

  // Create mock drivers
  await prisma.driver.createMany({
    data: [
      { id: 'DRV001', name: 'John Doe', license: 'DL-12345', contact: '+91 9876543210', status: 'Active', dlExpiry: '2028-01-01', hazmatValid: '2027-01-01', eyeTestDate: '2026-12-01', company: 'Google' },
      { id: 'DRV002', name: 'Jane Smith', license: 'DL-67890', contact: '+91 8765432109', status: 'Inactive', dlExpiry: '2026-05-01', hazmatValid: 'Expired', eyeTestDate: '2025-12-01', company: 'Google' },
      { id: 'DRV003', name: 'Mike Johnson', license: 'DL-54321', contact: '+91 7654321098', status: 'Active', dlExpiry: '2029-01-01', hazmatValid: '2026-10-01', eyeTestDate: '2026-06-01', company: 'Google' },
    ],
    skipDuplicates: true,
  });

  // Create mock schedule
  await prisma.schedule.createMany({
    data: [
      { id: 'SCH001', vehicle: 'HR26AR7790', task: 'Oil Change', date: '2026-04-15', status: 'Pending', company: 'Google' },
      { id: 'SCH002', vehicle: 'GJ05CD4460', task: 'Tire Rotation', date: '2026-04-18', status: 'Pending', company: 'Google' },
      { id: 'SCH003', vehicle: 'KA02W14451', task: 'Brake Repair', date: '2026-04-10', status: 'Completed', company: 'Google' },
      { id: 'SCH004', vehicle: 'TN18C7712', task: 'Engine Check', date: '2026-04-01', status: 'Overdue', company: 'Google' },
    ],
    skipDuplicates: true,
  });

  // Create mock compliance
  await prisma.compliance.createMany({
    data: [
      { id: 'CMP001', vehicle: 'HR26AR7790', type: 'RC', status: 'Valid', renewalDate: '2031-01-01', company: 'Google' },
      { id: 'CMP002', vehicle: 'HR26AR7790', type: 'Insurance', status: 'Valid', renewalDate: '2026-12-01', company: 'Google' },
      { id: 'CMP003', vehicle: 'HR26AR7790', type: 'PUC', status: 'Valid', renewalDate: '2026-06-01', company: 'Google' },
      { id: 'CMP004', vehicle: 'HR26AR7790', type: 'Fitness', status: 'Valid', renewalDate: '2027-01-01', company: 'Google' },
      { id: 'CMP005', vehicle: 'HR26AR7790', type: 'Road Tax', status: 'Valid', renewalDate: '2026-12-01', company: 'Google' },
      { id: 'CMP006', vehicle: 'RJ14GP1137', type: 'RC', status: 'Valid', renewalDate: '2030-05-01', company: 'Google' },
      { id: 'CMP007', vehicle: 'RJ14GP1137', type: 'Insurance', status: 'Expired', renewalDate: '2026-04-01', company: 'Google' },
      { id: 'CMP008', vehicle: 'RJ14GP1137', type: 'PUC', status: 'Valid', renewalDate: '2026-05-01', company: 'Google' },
      { id: 'CMP009', vehicle: 'RJ14GP1137', type: 'Fitness', status: 'Valid', renewalDate: '2026-09-01', company: 'Google' },
      { id: 'CMP010', vehicle: 'KA02W14451', type: 'RC', status: 'Valid', renewalDate: '2032-01-01', company: 'Google' },
      { id: 'CMP011', vehicle: 'KA02W14451', type: 'Insurance', status: 'Valid', renewalDate: '2027-01-01', company: 'Google' },
      { id: 'CMP012', vehicle: 'KA02W14451', type: 'PUC', status: 'Expiring Soon', renewalDate: '2026-04-20', company: 'Google' },
      { id: 'CMP013', vehicle: 'KA02W14451', type: 'Fitness', status: 'Valid', renewalDate: '2026-12-01', company: 'Google' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
