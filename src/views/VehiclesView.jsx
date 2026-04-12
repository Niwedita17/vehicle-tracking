import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const VehiclesView = ({ vehicles = [], setVehicles, statusFilter = 'All Status', setStatusFilter }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    plate: '',
    name: '',
    year: '',
    status: 'Active',
    odometer: '',
    driver: '-',
    lastService: '-'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate || !formData.name) return;
    setVehicles([...vehicles, formData]);
    setFormData({
      plate: '',
      name: '',
      year: '',
      status: 'Active',
      odometer: '',
      driver: '-',
      lastService: '-'
    });
    setShowForm(false);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Vehicles</h1>
          <p className="view-subtitle">{vehicles.length} trucks in total</p>
        </div>
        <button 
          className="btn-primary btn-icon"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Close' : 'Add Vehicle'}</span>
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3 className="card-title">Add New Vehicle</h3>
          <form onSubmit={handleSubmit} className="inline-form">
            <div className="form-group">
              <label>Plate Number</label>
              <input type="text" name="plate" value={formData.plate} onChange={handleInputChange} placeholder="e.g. HR26AR7790" required />
            </div>
            <div className="form-group">
              <label>Vehicle Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Tata Prima" required />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="e.g. 2021" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Odometer</label>
              <input type="text" name="odometer" value={formData.odometer} onChange={handleInputChange} placeholder="e.g. 35,000 km" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Vehicle</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by plate, make, model..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>PLATE</th>
              <th>VEHICLE</th>
              <th>YEAR</th>
              <th>STATUS</th>
              <th>ODOMETER</th>
              <th>DRIVER</th>
              <th>LAST SERVICE</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td className="font-mono">{vehicle.plate}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.year}</td>
                <td>
                  <span className={`status-pill ${vehicle.status.toLowerCase()}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td>{vehicle.odometer}</td>
                <td>{vehicle.driver}</td>
                <td>{vehicle.lastService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesView;
