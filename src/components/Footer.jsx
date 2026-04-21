import React from 'react';

const Footer = ({ setActiveView }) => {
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
        <button onClick={() => setActiveView('contacts')} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 'inherit', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>About</button>
        <button onClick={() => setActiveView('contacts')} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 'inherit', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Contact</button>
        <button onClick={() => setActiveView('contacts')} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 'inherit', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Privacy Policy</button>
        <button onClick={() => setActiveView('contacts')} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 'inherit', transition: 'color 0.2s' }}
           onMouseOver={(e) => e.target.style.color = '#38bdf8'}
           onMouseOut={(e) => e.target.style.color = '#6b7280'}>Terms</button>
      </div>
    </footer>
  );
};

export default Footer;
