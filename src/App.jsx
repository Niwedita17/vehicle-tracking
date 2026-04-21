import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardView from './views/DashboardView'
import VehiclesView from './views/VehiclesView'
import MaintenanceLogView from './views/MaintenanceLogView'
import ScheduleView from './views/ScheduleView'
import DriversView from './views/DriversView'
import ComplianceView from './views/ComplianceView'
import AuthView from './views/AuthView'
import AdminView from './views/AdminView'
import NotificationsView from './views/NotificationsView'
import ContactsView from './views/ContactsView'
import Footer from './components/Footer'
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
  { id: 'LOG001', vehicle: 'HR26AR7790', type: 'Routine', description: 'Oil Change', date: '2026-04-05', cost: 5000, performedBy: 'Auto Care' },
  { id: 'LOG002', vehicle: 'KA02W14451', type: 'Repair', description: 'Brake Repair', date: '2026-04-10', cost: 4500, performedBy: 'Speedy Garage' },
  { id: 'LOG003', vehicle: 'RJ14GP1137', type: 'Inspection', description: 'Routine Inspection', date: '2026-04-08', cost: 1500, performedBy: 'Safe Check' },
];

const initialSchedule = [
  { id: 'SCH001', vehicle: 'HR26AR7790', task: 'Oil Change', date: '2026-04-15', status: 'Pending' },
  { id: 'SCH002', vehicle: 'GJ05CD4460', task: 'Tire Rotation', date: '2026-04-18', status: 'Pending' },
  { id: 'SCH003', vehicle: 'KA02W14451', task: 'Brake Repair', date: '2026-04-10', status: 'Completed' },
  { id: 'SCH004', vehicle: 'TN18C7712', task: 'Engine Check', date: '2026-04-01', status: 'Overdue' },
];

const initialDrivers = [
  { id: 'DRV001', name: 'John Doe', license: 'DL-12345', contact: '+91 9876543210', status: 'Active', dlExpiry: '2028-01-01', hazmatValid: '2027-01-01', eyeTestDate: '2026-12-01' },
  { id: 'DRV002', name: 'Jane Smith', license: 'DL-67890', contact: '+91 8765432109', status: 'Inactive', dlExpiry: '2026-05-01', hazmatValid: 'Expired', eyeTestDate: '2025-12-01' },
  { id: 'DRV003', name: 'Mike Johnson', license: 'DL-54321', contact: '+91 7654321098', status: 'Active', dlExpiry: '2029-01-01', hazmatValid: '2026-10-01', eyeTestDate: '2026-06-01' },
];

const initialCompliance = [
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

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  // State
  const [globalSearch, setGlobalSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All Status');
  const [scheduleFilter, setScheduleFilter] = useState('All Status');
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [logs, setLogs] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('logs_v2'));
    return saved && saved.length > 0 ? saved : initialLogs;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [compliance, setCompliance] = useState(initialCompliance);

  useEffect(() => {
    if (!currentUser) return;

    const fetchEntity = (endpoint, setter, localKey) => {
      fetch(`http://localhost:5000/api/${endpoint}?company=${currentUser.company}`)
        .then(res => res.json())
        .then(data => {
          setter(data);
        })
        .catch(err => {
          console.log(`Failed to fetch ${endpoint}, using local storage fallback`);
          const saved = JSON.parse(localStorage.getItem(localKey));
          if (saved && saved.length > 0) setter(saved);
        });
    };

    fetchEntity('vehicles', setVehicles, 'vehicles');
    fetchEntity('drivers', setDrivers, 'drivers_v2');
    fetchEntity('schedule', setSchedule, 'schedule');
    fetchEntity('compliance', setCompliance, 'compliance_v3');
  }, [currentUser]);

  // Persistence
  useEffect(() => { localStorage.setItem('vehicles', JSON.stringify(vehicles)); }, [vehicles]);
  useEffect(() => { localStorage.setItem('logs_v2', JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem('schedule', JSON.stringify(schedule)); }, [schedule]);
  useEffect(() => { localStorage.setItem('drivers_v2', JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem('compliance_v3', JSON.stringify(compliance)); }, [compliance]);

  const handleComplianceChange = (newCompliance) => {
    setCompliance(newCompliance);
    if (newCompliance.length > compliance.length) {
      const newDoc = newCompliance[newCompliance.length - 1];
      fetch('http://localhost:5000/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDoc, company: currentUser.company })
      }).catch(err => console.log('Failed to save compliance to server'));
    }
  };

  const handleVehiclesChange = (newVehicles) => {
    setVehicles(newVehicles);
    if (newVehicles.length > vehicles.length) {
      fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVehicles[newVehicles.length - 1], company: currentUser.company })
      }).catch(err => console.log('Failed to save vehicle to server'));
    }
  };

  const handleDriversChange = (newDrivers) => {
    setDrivers(newDrivers);
    if (newDrivers.length > drivers.length) {
      fetch('http://localhost:5000/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDrivers[newDrivers.length - 1], company: currentUser.company })
      }).catch(err => console.log('Failed to save driver to server'));
    }
  };

  const handleScheduleChange = (newSchedule) => {
    setSchedule(newSchedule);
    if (newSchedule.length > schedule.length) {
      fetch('http://localhost:5000/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSchedule[newSchedule.length - 1], company: currentUser.company })
      }).catch(err => console.log('Failed to save schedule to server'));
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView vehicles={vehicles} logs={logs} schedule={schedule} drivers={drivers} compliance={compliance} globalSearch={globalSearch} setActiveView={setActiveView} setVehicleFilter={setVehicleFilter} setScheduleFilter={setScheduleFilter} />;
      case 'vehicles':
        return <VehiclesView vehicles={vehicles} setVehicles={handleVehiclesChange} statusFilter={vehicleFilter} setStatusFilter={setVehicleFilter} />;
      case 'maintenance':
        return <MaintenanceLogView logs={logs} setLogs={setLogs} globalSearch={globalSearch} />;
      case 'schedule':
        return <ScheduleView schedule={schedule} setSchedule={handleScheduleChange} statusFilter={scheduleFilter} setStatusFilter={setScheduleFilter} />;
      case 'drivers':
        return <DriversView drivers={drivers} setDrivers={handleDriversChange} globalSearch={globalSearch} />;
      case 'compliance':
        return <ComplianceView compliance={compliance} setCompliance={handleComplianceChange} globalSearch={globalSearch} />;
      case 'notifications':
        return <NotificationsView />;
      case 'contacts':
        return <ContactsView />;
      default:
        return <div className="view-placeholder">Select a view</div>;
    }
  }

  if (window.location.pathname === '/admin') {
    return <AdminView />;
  }

  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={(user) => {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={() => { setIsAuthenticated(false); setCurrentUser(null); }} />
      <div className="main-content">
        <Header globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} showSearch={activeView !== 'dashboard'} onLogout={() => { setIsAuthenticated(false); setCurrentUser(null); }} user={currentUser} setActiveView={setActiveView} />
        <div className="content-area">
          {renderView()}
        </div>
        <Footer setActiveView={setActiveView} />
      </div>
    </div>
  )
}

export default App
