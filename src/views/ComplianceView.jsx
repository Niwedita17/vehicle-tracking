import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const ComplianceView = ({ compliance = [], setCompliance }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [formData, setFormData] = useState({
    id: '',
    vehicle: '',
    type: 'Insurance',
    status: 'Valid',
    renewalDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.vehicle) return;
    setCompliance([...compliance, formData]);
    setFormData({
      id: '',
      vehicle: '',
      type: 'Insurance',
      status: 'Valid',
      renewalDate: ''
    });
    setShowForm(false);
  };

  const filteredCompliance = compliance.filter(item => {
    const matchesSearch = item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Compliance</h1>
          <p className="view-subtitle">Manage vehicle permits and renewals</p>
        </div>
        <button 
          className="btn-primary btn-icon"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Close' : 'Add Document'}</span>
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3 className="card-title">Add Compliance Document</h3>
          <form onSubmit={handleSubmit} className="inline-form">
            <div className="form-group">
              <label>Doc ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="e.g. CMP004" required />
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <input type="text" name="vehicle" value={formData.vehicle} onChange={handleInputChange} placeholder="e.g. Truck 01" required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="Insurance">Insurance</option>
                <option value="Pollution">Pollution</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Valid">Valid</option>
                <option value="Expired">Expired</option>
                <option value="Expiring Soon">Expiring Soon</option>
              </select>
            </div>
            <div className="form-group">
              <label>Renewal Date</label>
              <input type="date" name="renewalDate" value={formData.renewalDate} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Document</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search compliance..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Valid</option>
            <option>Expired</option>
            <option>Expiring Soon</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>DOC ID</th>
              <th>VEHICLE</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>RENEWAL DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompliance.map((item, index) => (
              <tr key={index}>
                <td className="font-mono">{item.id}</td>
                <td>{item.vehicle}</td>
                <td>{item.type}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.renewalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceView;
