import React from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

const NotificationsView = () => {
  const notifications = [
    { id: 1, type: 'danger', title: 'Insurance Expired', message: 'Vehicle HR26AR7790 insurance has expired. Renew immediately to avoid fines.', time: '2 hours ago' },
    { id: 2, type: 'warning', title: 'PUC Expiring Soon', message: 'Vehicle KA02W14451 PUC will expire in 5 days.', time: '5 hours ago' },
    { id: 3, type: 'warning', title: 'Maintenance Overdue', message: 'Schedule SCH004 for Engine Check is overdue.', time: '1 day ago' },
    { id: 4, type: 'success', title: 'Service Completed', message: 'Vehicle GJ05CD4460 tire rotation completed successfully.', time: '2 days ago' },
  ];

  const getTheme = (type) => {
    switch (type) {
      case 'danger': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: <AlertTriangle size={20} /> };
      case 'warning': return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: <Clock size={20} /> };
      case 'success': return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <CheckCircle size={20} /> };
      default: return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: <Bell size={20} /> };
    }
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
            <ArrowLeft size={16} /> Back to Dashboard
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
            <Bell size={36} color="#38bdf8" /> Notifications
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>Stay updated with your fleet activity</p>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
        {notifications.map(notif => {
          const theme = getTheme(notif.type);
          return (
            <div key={notif.id} style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              backdropFilter: 'blur(20px)',
              transition: 'transform 0.2s, background 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '12px', 
                background: theme.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: theme.color,
                border: `1px solid ${theme.color}30`
              }}>
                {theme.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '600', color: '#fff' }}>{notif.title}</h3>
                  <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '500' }}>{notif.time}</span>
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>{notif.message}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    background: theme.bg, 
                    color: theme.color,
                    textTransform: 'uppercase'
                  }}>
                    {notif.type}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#4b5563', cursor: 'pointer' }}
                        onMouseOver={(e) => e.target.style.color = '#6b7280'}
                        onMouseOut={(e) => e.target.style.color = '#4b5563'}>Mark as read</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsView;
