import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardView from './views/DashboardView'
import VehiclesView from './views/VehiclesView'
import MaintenanceLogView from './views/MaintenanceLogView'
import ScheduleView from './views/ScheduleView'
import DriversView from './views/DriversView'
import ComplianceView from './views/ComplianceView'
import './index.css'

// Initial Data
const initialVehicles = [
  { plate: 'HR26AR7790', name: 'Tata Prima 4928.S', year: '2021', status: 'Active', odometer: '37,400 km', driver: '-', lastService: 'Jan 5, 2026' },
  { plate: 'RJ14GP1137', name: 'Ashok Leyland 3518', year: '2020', status: 'Active', odometer: '74,300 km', driver: '-', lastService: 'Feb 2, 2026' },
  { plate: 'KA02W14451', name: 'Eicher Pro 6025', year: '2022', status: 'Active', odometer: '51,200 km', driver: '-', lastService: 'Mar 5, 2026' },
  { plate: 'TN18C7712', name: 'BharatBenz 3723R', year: '2019', status: 'Maintenance', odometer: '126,800 km', driver: '-', lastService: 'Dec 5, 2025' },
  { plate: 'GJ05CD4460', name: 'Mahindra Blazo X 49', year: '2021', status: 'Active', odometer: '63,100 km', driver: '-', lastService: 'Dec 2, 2025' },
];

const initialLogs = [
  { id: 'LOG001', vehicle: 'Truck 01', type: 'Routine', description: 'Oil Change', date: '2026-04-05', cost: 5000, performedBy: 'Auto Care' },
  { id: 'LOG002', vehicle: 'Truck 03', type: 'Repair', description: 'Brake Repair', date: '2026-04-10', cost: 4500, performedBy: 'Speedy Garage' },
  { id: 'LOG003', vehicle: 'Truck 02', type: 'Inspection', description: 'Routine Inspection', date: '2026-04-08', cost: 1500, performedBy: 'Safe Check' },
];

const initialSchedule = [
  { id: 'SCH001', vehicle: 'Truck 01', task: 'Oil Change', date: '2026-04-15', status: 'Pending' },
  { id: 'SCH002', vehicle: 'Truck 05', task: 'Tire Rotation', date: '2026-04-18', status: 'Pending' },
  { id: 'SCH003', vehicle: 'Truck 03', task: 'Brake Repair', date: '2026-04-10', status: 'Completed' },
  { id: 'SCH004', vehicle: 'Truck 04', task: 'Engine Check', date: '2026-04-01', status: 'Overdue' },
];

const initialDrivers = [
  { id: 'DRV001', name: 'John Doe', license: 'DL-12345', contact: '+91 9876543210', status: 'Active' },
  { id: 'DRV002', name: 'Jane Smith', license: 'DL-67890', contact: '+91 8765432109', status: 'Inactive' },
  { id: 'DRV003', name: 'Mike Johnson', license: 'DL-54321', contact: '+91 7654321098', status: 'Active' },
];

const initialCompliance = [
  { id: 'CMP001', vehicle: 'Truck 01', type: 'Insurance', status: 'Valid', renewalDate: '2026-12-01' },
  { id: 'CMP002', vehicle: 'Truck 02', type: 'Pollution', status: 'Expired', renewalDate: '2026-03-15' },
  { id: 'CMP003', vehicle: 'Truck 03', type: 'Fitness', status: 'Expiring Soon', renewalDate: '2026-04-30' },
];

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  
  // State
  const [globalSearch, setGlobalSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All Status');
  const [scheduleFilter, setScheduleFilter] = useState('All Status');
  const [vehicles, setVehicles] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('vehicles'));
    return saved && saved.length > 0 ? saved : initialVehicles;
  });
  const [logs, setLogs] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('logs'));
    return saved && saved.length > 0 ? saved : initialLogs;
  });
  const [schedule, setSchedule] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('schedule'));
    return saved && saved.length > 0 ? saved : initialSchedule;
  });
  const [drivers, setDrivers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('drivers'));
    return saved && saved.length > 0 ? saved : initialDrivers;
  });
  const [compliance, setCompliance] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('compliance'));
    return saved && saved.length > 0 ? saved : initialCompliance;
  });

  // Persistence
  useEffect(() => { localStorage.setItem('vehicles', JSON.stringify(vehicles)); }, [vehicles]);
  useEffect(() => { localStorage.setItem('logs', JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem('schedule', JSON.stringify(schedule)); }, [schedule]);
  useEffect(() => { localStorage.setItem('drivers', JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem('compliance', JSON.stringify(compliance)); }, [compliance]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView vehicles={vehicles} logs={logs} schedule={schedule} drivers={drivers} globalSearch={globalSearch} setActiveView={setActiveView} setVehicleFilter={setVehicleFilter} setScheduleFilter={setScheduleFilter} />;
      case 'vehicles':
        return <VehiclesView vehicles={vehicles} setVehicles={setVehicles} statusFilter={vehicleFilter} setStatusFilter={setVehicleFilter} />;
      case 'maintenance':
        return <MaintenanceLogView logs={logs} setLogs={setLogs} globalSearch={globalSearch} />;
      case 'schedule':
        return <ScheduleView schedule={schedule} setSchedule={setSchedule} statusFilter={scheduleFilter} setStatusFilter={setScheduleFilter} />;
      case 'drivers':
        return <DriversView drivers={drivers} setDrivers={setDrivers} globalSearch={globalSearch} />;
      case 'compliance':
        return <ComplianceView compliance={compliance} setCompliance={setCompliance} globalSearch={globalSearch} />;
      default:
        return <div className="view-placeholder">Select a view</div>;
    }
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main-content">
        <Header globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} showSearch={activeView !== 'dashboard'} />
        <div className="content-area">
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default App
