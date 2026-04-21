import React, { useState } from 'react';
import { Search, Plus, Filter, X, RefreshCw, CreditCard } from 'lucide-react';

const ComplianceView = ({ compliance = [], setCompliance }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isFetching, setIsFetching] = useState(false);
  const [activeRenewalDoc, setActiveRenewalDoc] = useState(null);
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

  const handleVahanFetch = () => {
    setIsFetching(true);
    // Simulate API call
    setTimeout(() => {
      setIsFetching(false);
      alert('Successfully fetched latest dates from Parivahan portal!');
    }, 2000);
  };

  const handleRenewal = () => {
    // Simulate renewal
    alert(`Processing renewal for ${activeRenewalDoc.vehicle} Insurance. Commission earned: ₹3,500!`);
    
    // Update status in state
    const updatedCompliance = compliance.map(item => {
      if (item.vehicle === activeRenewalDoc.vehicle && item.type === 'Insurance') {
        return { ...item, status: 'Valid', renewalDate: '2027-04-12' }; // Next year
      }
      return item;
    });
    setCompliance(updatedCompliance);
    setActiveRenewalDoc(null);
  };

  // Get unique vehicles
  const uniqueVehicles = [...new Set(compliance.map(item => item.vehicle))];

  // Document types we care about
  const docTypes = ['RC', 'Insurance', 'PUC', 'Fitness', 'Road Tax', 'Permits'];

  // Filter compliance items based on search and status
  const filteredVehicles = uniqueVehicles.filter(vehicle => {
    const matchesSearch = vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const vehicleDocs = compliance.filter(item => item.vehicle === vehicle);
    const matchesStatus = statusFilter === 'All Status' || vehicleDocs.some(doc => doc.status === statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  const getDocStatus = (vehicle, type) => {
    const doc = compliance.find(item => item.vehicle === vehicle && item.type === type);
    return doc ? doc.status : 'Missing';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'status-success';
      case 'Expiring Soon': return 'status-warning';
      case 'Expired': return 'status-danger';
      case 'Missing': return 'status-muted';
      default: return '';
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Compliance Matrix</h1>
          <p className="view-subtitle">Mandatory documents status per vehicle</p>
        </div>
        <div className="view-actions">
          <button 
            className={`btn-secondary btn-icon ${isFetching ? 'anim-spin' : ''}`}
            onClick={handleVahanFetch}
            disabled={isFetching}
          >
            <RefreshCw size={18} className={isFetching ? 'spin' : ''} />
            <span>{isFetching ? 'Fetching...' : 'Fetch from Vahan'}</span>
          </button>
          <button 
            className="btn-primary btn-icon"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            <span>{showForm ? 'Close' : 'Add Document'}</span>
          </button>
        </div>
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
                {docTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
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
            placeholder="Search by vehicle..." 
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
            <option>Missing</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>VEHICLE</th>
              {docTypes.map(type => (
                <th key={type}>{type}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td className="font-medium">{vehicle}</td>
                {docTypes.map(type => {
                  const status = getDocStatus(vehicle, type);
                  return (
                    <td key={type}>
                      <div className="flex items-center gap-2">
                        <span className={`status-pill ${getStatusColor(status)}`}>
                          {status}
                        </span>
                        {type === 'Insurance' && status !== 'Valid' && status !== 'Missing' && (
                          <button 
                            onClick={() => setActiveRenewalDoc({ vehicle, type, status })}
                            style={{ 
                              padding: '2px 6px', 
                              fontSize: '12px', 
                              color: '#38bdf8', 
                              background: 'transparent', 
                              border: 'none', 
                              textDecoration: 'underline', 
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            Renew
                          </button>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insurance Renewal Modal */}
      {activeRenewalDoc && (
        <div className="modal-overlay" onClick={() => setActiveRenewalDoc(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div className="modal-header flex justify-between items-center mb-4">
              <h3 className="card-title m-0">Instant Renewal</h3>
              <button onClick={() => setActiveRenewalDoc(null)}><X size={20} /></button>
            </div>
            <div className="modal-body p-6 flex flex-col items-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h2 className="text-lg font-bold mb-2">{activeRenewalDoc.vehicle} Insurance</h2>
              <p className="text-sm text-muted mb-4">
                Your truck's insurance is {activeRenewalDoc.status.toLowerCase()}. Renew it instantly to avoid fines and protect your claims.
              </p>
              
              <div className="pricing-box bg-tertiary p-4 rounded-lg w-full text-left mb-4">
                <div className="flex justify-between mb-1">
                  <span>Premium:</span>
                  <span className="font-bold">₹35,000</span>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>Processing Fee:</span>
                  <span>₹500</span>
                </div>
              </div>
              
              <button className="btn-primary btn-icon w-full" onClick={handleRenewal}>
                <CreditCard size={16} />
                <span>Pay & Renew Instantly</span>
              </button>
              
              <p className="text-xs text-muted mt-2">Powered by FleetOps Insurtech</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceView;
