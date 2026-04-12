import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const MaintenanceLogView = ({ logs = [], setLogs }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [formData, setFormData] = useState({
    id: '',
    vehicle: '',
    type: 'Routine',
    description: '',
    date: '',
    cost: '',
    performedBy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.vehicle) return;
    
    const newLog = {
      ...formData,
      cost: parseFloat(formData.cost.toString().replace('₹', '').replace(',', '')) || 0
    };
    
    setLogs([...logs, newLog]);
    setFormData({
      id: '',
      vehicle: '',
      type: 'Routine',
      description: '',
      date: '',
      cost: '',
      performedBy: ''
    });
    setShowForm(false);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.performedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All Types' || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Maintenance Log</h1>
          <p className="view-subtitle">Past maintenance records</p>
        </div>
        <button 
          className="btn-primary btn-icon"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Close' : 'Add Record'}</span>
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3 className="card-title">Add Maintenance Record</h3>
          <form onSubmit={handleSubmit} className="inline-form">
            <div className="form-group">
              <label>Log ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="e.g. LOG004" required />
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <input type="text" name="vehicle" value={formData.vehicle} onChange={handleInputChange} placeholder="e.g. Truck 01" required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="Routine">Routine</option>
                <option value="Repair">Repair</option>
                <option value="Inspection">Inspection</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="e.g. Oil Change" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Cost (₹)</label>
              <input type="text" name="cost" value={formData.cost} onChange={handleInputChange} placeholder="e.g. 5000" />
            </div>
            <div className="form-group">
              <label>Performed By</label>
              <input type="text" name="performedBy" value={formData.performedBy} onChange={handleInputChange} placeholder="e.g. Auto Care" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Record</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>All Types</option>
            <option>Routine</option>
            <option>Repair</option>
            <option>Inspection</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>LOG ID</th>
              <th>VEHICLE</th>
              <th>TYPE</th>
              <th>DESCRIPTION</th>
              <th>DATE</th>
              <th>COST</th>
              <th>PERFORMED BY</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr key={index}>
                <td className="font-mono">{log.id}</td>
                <td>{log.vehicle}</td>
                <td>
                  <span className={`status-pill ${log.type.toLowerCase()}`}>
                    {log.type}
                  </span>
                </td>
                <td>{log.description}</td>
                <td>{log.date}</td>
                <td>₹{log.cost.toLocaleString()}</td>
                <td>{log.performedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceLogView;
