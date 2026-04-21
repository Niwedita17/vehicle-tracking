import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header = ({ onLogout, user }) => {
  return (
    <header className="header">
      <div></div> {/* Empty div to maintain flex space-between layout if needed */}
      <div className="header-actions">
        <button className="action-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">{user ? user.name : 'Admin User'}</span>
            <span className="user-role">{user ? user.company : 'Fleet Manager'}</span>
          </div>
        </div>
        <button className="action-btn" onClick={onLogout} title="Logout" style={{ marginLeft: '12px', color: 'var(--status-danger)' }}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
