import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header = ({ onLogout, user }) => {
  return (
    <header className="header">
      <div></div> {/* Empty div to maintain flex space-between layout if needed */}
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
        <button className="action-btn" onClick={() => alert('You have 3 new alerts:\n- Insurance expiring soon\n- Engine check overdue\n- PUC expiring soon')} style={{ color: '#ffffff', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} />
          <span className="badge" style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
        </button>
        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
          <div className="user-avatar" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} />
          </div>
          <div className="user-info" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="user-name" style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>{user ? user.name : 'Admin User'}</span>
            <span className="user-role" style={{ color: '#9ca3af', fontSize: '12px' }}>{user ? user.company : 'Fleet Manager'}</span>
          </div>
        </div>
        <button className="action-btn" onClick={onLogout} title="Logout" style={{ marginLeft: '15px', color: '#ef4444', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
