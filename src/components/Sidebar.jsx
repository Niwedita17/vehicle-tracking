import React from 'react';
import { LayoutDashboard, Truck, ClipboardList, Calendar, Users, ShieldCheck, Phone, LogOut } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'vehicles', name: 'Vehicles', icon: <Truck size={20} /> },
    { id: 'maintenance', name: 'Maintenance Log', icon: <ClipboardList size={20} /> },
    { id: 'schedule', name: 'Schedule', icon: <Calendar size={20} /> },
    { id: 'drivers', name: 'Drivers', icon: <Users size={20} /> },
    { id: 'compliance', name: 'Compliance', icon: <ShieldCheck size={20} /> },
    { id: 'contacts', name: 'Contacts', icon: <Phone size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>FleetOps</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: '10px 20px' }}>
        <button
          className="nav-item"
          onClick={onLogout}
          style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', border: 'none', cursor: 'pointer' }}
        >
          <span className="nav-icon"><LogOut size={20} /></span>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
