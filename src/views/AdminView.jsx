import React, { useState, useEffect } from 'react';
import { Shield, Truck, Users, Landmark, Search } from 'lucide-react';

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all data
    fetch('http://localhost:5000/api/admin/users').then(res => res.json()).then(setUsers);
    fetch('http://localhost:5000/api/admin/vehicles').then(res => res.json()).then(setVehicles);
    fetch('http://localhost:5000/api/admin/drivers').then(res => res.json()).then(setDrivers);
  }, []);

  const filterData = (data, query) => {
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="view-container admin-view" style={{ padding: '2rem', background: '#0a0f1d', minHeight: '100vh', color: '#fff' }}>
      <div className="view-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="view-title" style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={32} color="#ff4b4b" /> Super Admin Portal
          </h1>
          <p className="view-subtitle" style={{ color: '#8a99ad' }}>Master view of all platform entries</p>
        </div>
        
        <div className="search-box" style={{ width: '300px' }}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search master database..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: '#151c30', border: '1px solid #2a3554', color: '#fff' }}
          />
        </div>
      </div>

      <div className="lists-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Users Table */}
        <div className="card table-card" style={{ background: '#151c30', border: '1px solid #2a3554' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a3554', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#38bdf8" />
            <h3 className="card-title" style={{ color: '#fff', margin: 0 }}>Registered Users ({users.length})</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>PHONE</th>
                <th>NAME</th>
                <th>COMPANY</th>
              </tr>
            </thead>
            <tbody>
              {filterData(users, searchTerm).map((user, index) => (
                <tr key={index}>
                  <td className="font-mono">{user.phone}</td>
                  <td>{user.name}</td>
                  <td><span className="status-pill active">{user.company}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vehicles Table */}
        <div className="card table-card" style={{ background: '#151c30', border: '1px solid #2a3554' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a3554', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={20} color="#38bdf8" />
            <h3 className="card-title" style={{ color: '#fff', margin: 0 }}>All Vehicles ({vehicles.length})</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>PLATE</th>
                <th>MODEL</th>
                <th>COMPANY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filterData(vehicles, searchTerm).map((v, index) => (
                <tr key={index}>
                  <td className="font-mono">{v.plate}</td>
                  <td>{v.name}</td>
                  <td><span className="status-pill active">{v.company}</span></td>
                  <td>
                    <span className={`status-pill ${v.status.toLowerCase()}`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drivers Table */}
        <div className="card table-card" style={{ background: '#151c30', border: '1px solid #2a3554' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #2a3554', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Landmark size={20} color="#38bdf8" />
            <h3 className="card-title" style={{ color: '#fff', margin: 0 }}>All Drivers ({drivers.length})</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>COMPANY</th>
                <th>LICENSE</th>
              </tr>
            </thead>
            <tbody>
              {filterData(drivers, searchTerm).map((d, index) => (
                <tr key={index}>
                  <td className="font-mono">{d.id}</td>
                  <td>{d.name}</td>
                  <td><span className="status-pill active">{d.company}</span></td>
                  <td>{d.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminView;
