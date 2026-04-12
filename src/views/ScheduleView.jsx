import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const ScheduleView = ({ schedule = [], setSchedule, statusFilter = 'All Status', setStatusFilter }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    vehicle: '',
    task: '',
    date: '',
    status: 'Pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.vehicle) return;
    setSchedule([...schedule, formData]);
    setFormData({
      id: '',
      vehicle: '',
      task: '',
      date: '',
      status: 'Pending'
    });
    setShowForm(false);
  };

  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Schedule</h1>
          <p className="view-subtitle">Upcoming maintenance tasks</p>
        </div>
        <button 
          className="btn-primary btn-icon"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showForm ? 'Close' : 'Schedule Task'}</span>
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h3 className="card-title">Schedule Maintenance Task</h3>
          <form onSubmit={handleSubmit} className="inline-form">
            <div className="form-group">
              <label>Schedule ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="e.g. SCH004" required />
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <input type="text" name="vehicle" value={formData.vehicle} onChange={handleInputChange} placeholder="e.g. Truck 01" required />
            </div>
            <div className="form-group">
              <label>Task</label>
              <input type="text" name="task" value={formData.task} onChange={handleInputChange} placeholder="e.g. Oil Change" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Task</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>SCHEDULE ID</th>
              <th>VEHICLE</th>
              <th>TASK</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((item, index) => (
              <tr key={index}>
                <td className="font-mono">{item.id}</td>
                <td>{item.vehicle}</td>
                <td>{item.task}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
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

export default ScheduleView;
