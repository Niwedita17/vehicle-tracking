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
        <div className="modal-overlay" onClick={() => setActiveVaultDriver(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div className="modal-header flex justify-between items-center mb-4">
              <h3 className="card-title m-0">Driver Vault</h3>
              <button onClick={() => setActiveVaultDriver(null)}><X size={20} /></button>
            </div>
            <div className="vault-body p-6 flex flex-col items-center">
              <h2 className="text-lg font-bold mb-2">{activeVaultDriver.name}</h2>
              <p className="text-sm text-muted mb-4">Scan QR to view live documents</p>
              
              {/* Mock QR Code */}
              <div className="qr-code-box border-2 border-dashed border-gray-300 p-6 mb-4 bg-white rounded-lg" style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '100px', color: 'var(--accent-primary)' }}>🏁</div>
              </div>
              
              <div className="vault-docs w-full text-left bg-tertiary p-4 rounded-lg text-sm">
                <div className="flex justify-between mb-1">
                  <span>DL:</span>
                  <span className="font-mono">{activeVaultDriver.license}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Hazmat:</span>
                  <span>{activeVaultDriver.hazmatValid}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eye Test:</span>
                  <span>{activeVaultDriver.eyeTestDate}</span>
                </div>
              </div>
              
              <button className="btn-primary btn-icon w-full mt-4">
                <ExternalLink size={16} />
                <span>Generate Public Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversView;
