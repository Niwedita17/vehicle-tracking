import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '1.5rem 2rem', 
      background: 'rgba(11, 15, 25, 0.9)', 
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#6b7280',
      fontSize: '0.85rem',
      backdropFilter: 'blur(10px)'
    }}>
      <div>
        © 2026 FleetOps. All rights reserved.
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>About</a>
        <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Contact</a>
        <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Privacy Policy</a>
        <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
