import React, { useState, useEffect } from 'react';
import { Shield, Truck, Users, Landmark, Search, ArrowLeft, Calendar, FileText } from 'lucide-react';

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users').then(res => res.json()).then(setUsers);
    fetch('http://localhost:5000/api/admin/vehicles').then(res => res.json()).then(setVehicles);
    fetch('http://localhost:5000/api/admin/drivers').then(res => res.json()).then(setDrivers);
    fetch('http://localhost:5000/api/admin/schedule').then(res => res.json()).then(setSchedule);
    fetch('http://localhost:5000/api/admin/compliance').then(res => res.json()).then(setCompliance);
  }, []);

  const filterData = (data, query) => {
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #0b0f19 0%, #111827 100%)', 
      minHeight: '100vh', 
      color: '#f3f4f6',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <a href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#6b7280', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = '#3b82f6'}
          onMouseOut={(e) => e.target.style.color = '#6b7280'}
          >
            <ArrowLeft size={16} /> Back to Portal
          </a>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: '800', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            margin: 0,
            background: 'linear-gradient(to right, #fff, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <Shield size={36} color="#ff4b4b" /> Super Admin Portal
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>Master view of all platform entries</p>
        </div>
        
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
          <input 
            type="text" 
            placeholder="Search master database..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%',
              padding: '12px 12px 12px 40px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s, background 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
        
        {/* Users Table */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Registered Users</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Total accounts: {users.length}</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <th style={tableHeaderStyle}>PHONE</th>
                  <th style={tableHeaderStyle}>NAME</th>
                  <th style={tableHeaderStyle}>COMPANY</th>
                </tr>
              </thead>
              <tbody>
                {filterData(users, searchTerm).map((user, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={tableCellStyle} className="font-mono">{user.phone}</td>
                    <td style={{ ...tableCellStyle, fontWeight: '500' }}>{user.name}</td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle('#38bdf8')}>{user.company}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicles Table */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
              <Truck size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>All Vehicles</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Total fleet size: {vehicles.length}</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <th style={tableHeaderStyle}>PLATE</th>
                  <th style={tableHeaderStyle}>MODEL</th>
                  <th style={tableHeaderStyle}>COMPANY</th>
                  <th style={tableHeaderStyle}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filterData(vehicles, searchTerm).map((v, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={tableCellStyle} className="font-mono">{v.plate}</td>
                    <td style={{ ...tableCellStyle, fontWeight: '500' }}>{v.name}</td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle('#38bdf8')}>{v.company}</span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle(v.status === 'Active' ? '#10b981' : '#ef4444')}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivers Table */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
              <Landmark size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>All Drivers</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Total drivers: {drivers.length}</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>NAME</th>
                  <th style={tableHeaderStyle}>COMPANY</th>
                  <th style={tableHeaderStyle}>LICENSE</th>
                </tr>
              </thead>
              <tbody>
                {filterData(drivers, searchTerm).map((d, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={tableCellStyle} className="font-mono">{d.id}</td>
                    <td style={{ ...tableCellStyle, fontWeight: '500' }}>{d.name}</td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle('#38bdf8')}>{d.company}</span>
                    </td>
                    <td style={tableCellStyle}>{d.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Table */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
              <Calendar size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Maintenance Schedule</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Total tasks: {schedule.length}</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>VEHICLE</th>
                  <th style={tableHeaderStyle}>TASK</th>
                  <th style={tableHeaderStyle}>COMPANY</th>
                  <th style={tableHeaderStyle}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filterData(schedule, searchTerm).map((s, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={tableCellStyle} className="font-mono">{s.id}</td>
                    <td>{s.vehicle}</td>
                    <td>{s.task}</td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle('#38bdf8')}>{s.company}</span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle(s.status === 'Completed' ? '#10b981' : s.status === 'Overdue' ? '#ef4444' : '#f59e0b')}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Table */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Compliance Documents</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Total documents: {compliance.length}</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>VEHICLE</th>
                  <th style={tableHeaderStyle}>TYPE</th>
                  <th style={tableHeaderStyle}>COMPANY</th>
                  <th style={tableHeaderStyle}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filterData(compliance, searchTerm).map((c, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={tableCellStyle} className="font-mono">{c.id}</td>
                    <td>{c.vehicle}</td>
                    <td>{c.type}</td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle('#38bdf8')}>{c.company}</span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={pillStyle(c.status === 'Valid' ? '#10b981' : '#ef4444')}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper styles
const tableHeaderStyle = {
  padding: '1rem 1.5rem',
  fontSize: '0.75rem',
  fontWeight: '700',
  color: '#6b7280',
  letterSpacing: '0.05em',
  textTransform: 'uppercase'
};

const tableCellStyle = {
  padding: '1.2rem 1.5rem',
  fontSize: '0.9rem',
  color: '#e5e7eb'
};

const pillStyle = (color) => ({
  display: 'inline-flex',
  padding: '4px 10px',
  fontSize: '0.75rem',
  fontWeight: '600',
  borderRadius: '6px',
  background: `${color}15`, // Adds 15% opacity to the hex color
  color: color,
  border: `1px solid ${color}30`
});

export default AdminView;
