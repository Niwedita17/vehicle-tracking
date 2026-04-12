import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const DriversView = ({ drivers = [], setDrivers }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    license: '',
    contact: '',
    status: 'Active'
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
      status: 'Active'
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
          <p className="view-subtitle">Manage fleet drivers</p>
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
              <label>Contact</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="e.g. +91 9876543210" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
              <th>CONTACT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr key={index}>
                <td className="font-mono">{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.license}</td>
                <td>{driver.contact}</td>
                <td>
                  <span className={`status-pill ${driver.status.toLowerCase()}`}>
                    {driver.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversView;
