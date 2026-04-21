import React, { useState } from 'react';
import { Search, Plus, Filter, X, QrCode, ExternalLink } from 'lucide-react';

const DriversView = ({ drivers = [], setDrivers }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeVaultDriver, setActiveVaultDriver] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    license: '',
    contact: '',
    status: 'Active',
    dlExpiry: '',
    hazmatValid: '',
    eyeTestDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return;
    setDrivers([...drivers, formData]);
    setFormData({
      id: '',
      name: '',
      license: '',
      contact: '',
      status: 'Active',
      dlExpiry: '',
      hazmatValid: '',
      eyeTestDate: ''
    });
    setShowForm(false);
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Drivers</h1>
          <p className="view-subtitle">Manage fleet drivers and compliance</p>
        </div>
        <button 
          className="btn-primary btn-icon"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Close' : 'Add Driver'}</span>
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3 className="card-title">Add New Driver</h3>
          <form onSubmit={handleSubmit} className="inline-form">
            <div className="form-group">
              <label>Driver ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="e.g. DRV004" required />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" required />
            </div>
            <div className="form-group">
              <label>License</label>
              <input type="text" name="license" value={formData.license} onChange={handleInputChange} placeholder="e.g. DL-12345" />
            </div>
            <div className="form-group">
              <label>DL Expiry</label>
              <input type="date" name="dlExpiry" value={formData.dlExpiry} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Hazmat Valid Till</label>
              <input type="date" name="hazmatValid" value={formData.hazmatValid} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Eye Test Date</label>
              <input type="date" name="eyeTestDate" value={formData.eyeTestDate} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Driver</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search drivers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>DRIVER ID</th>
              <th>NAME</th>
              <th>LICENSE</th>
              <th>DL EXPIRY</th>
              <th>HAZMAT</th>
              <th>EYE TEST</th>
              <th>STATUS</th>
              <th>VAULT</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr key={index}>
                <td className="font-mono">{driver.id}</td>
                <td className="font-medium">{driver.name}</td>
                <td>{driver.license}</td>
                <td>{driver.dlExpiry || '-'}</td>
                <td>
                  <span className={`status-pill ${driver.hazmatValid === 'Expired' ? 'status-danger' : 'status-success'}`}>
                    {driver.hazmatValid || '-'}
                  </span>
                </td>
                <td>{driver.eyeTestDate || '-'}</td>
                <td>
                  <span className={`status-pill ${driver.status.toLowerCase()}`}>
                    {driver.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-secondary btn-icon"
                    onClick={() => setActiveVaultDriver(driver)}
                  >
                    <QrCode size={16} />
                    <span>Vault</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Driver Vault Modal */}
      {activeVaultDriver && (
        <div className="modal-overlay" onClick={() => setActiveVaultDriver(null)} style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ 
            maxWidth: '450px', 
            textAlign: 'center',
            background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>Driver Vault</h3>
              <button onClick={() => setActiveVaultDriver(null)} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{activeVaultDriver.name}</h2>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Digital Identity & Documents</p>
              
              {/* Mock QR Code / Digital ID Card */}
              <div style={{ 
                width: '220px', 
                height: '220px', 
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                border: '2px dashed rgba(56, 189, 248, 0.3)',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ fontSize: '80px', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.3))' }}>🆔</div>
                <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginTop: '10px', textTransform: 'uppercase' }}>Secure Scan</span>
              </div>
              
              <div style={{ 
                width: '100%', 
                textAlign: 'left', 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '1.25rem', 
                borderRadius: '12px', 
                fontSize: '0.9rem' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#6b7280' }}>Driving License:</span>
                  <span style={{ color: '#fff', fontWeight: '600', fontFamily: 'monospace' }}>{activeVaultDriver.license}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#6b7280' }}>Hazmat Cert:</span>
                  <span style={{ 
                    color: activeVaultDriver.hazmatValid === 'Expired' ? '#ef4444' : '#10b981',
                    fontWeight: '600'
                  }}>{activeVaultDriver.hazmatValid}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Medical Eye Test:</span>
                  <span style={{ color: '#fff', fontWeight: '600' }}>{activeVaultDriver.eyeTestDate}</span>
                </div>
              </div>
              
              <button className="btn-primary" style={{ 
                width: '100%', 
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                <ExternalLink size={18} />
                <span>Generate Public Access Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversView;
