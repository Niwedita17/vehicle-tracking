import React from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const NotificationsView = () => {
  const notifications = [
    { id: 1, type: 'danger', title: 'Insurance Expired', message: 'Vehicle HR26AR7790 insurance has expired. Renew immediately to avoid fines.', time: '2 hours ago' },
    { id: 2, type: 'warning', title: 'PUC Expiring Soon', message: 'Vehicle KA02W14451 PUC will expire in 5 days.', time: '5 hours ago' },
    { id: 3, type: 'warning', title: 'Maintenance Overdue', message: 'Schedule SCH004 for Engine Check is overdue.', time: '1 day ago' },
    { id: 4, type: 'success', title: 'Service Completed', message: 'Vehicle GJ05CD4460 tire rotation completed successfully.', time: '2 days ago' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'danger': return <AlertTriangle size={20} color="#ef4444" />;
      case 'warning': return <Clock size={20} color="#f59e0b" />;
      case 'success': return <CheckCircle size={20} color="#10b981" />;
      default: return <Bell size={20} color="#3b82f6" />;
    }
  };

  return (
    <div className="view-container" style={{ padding: '2rem', background: '#0b0f19', minHeight: '100vh', color: '#fff' }}>
      <div className="view-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="view-title" style={{ fontSize: '2.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={32} color="#38bdf8" /> Notifications
          </h1>
          <p className="view-subtitle" style={{ color: '#6b7280' }}>Stay updated with your fleet activity</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map(notif => (
          <div key={notif.id} style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px',
            backdropFilter: 'blur(10px)',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              background: 'rgba(255,255,255,0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {getIcon(notif.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#fff' }}>{notif.title}</h3>
                <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{notif.time}</span>
              </div>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5' }}>{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
