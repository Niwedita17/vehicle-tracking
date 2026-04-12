import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
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
            <span className="user-name">Admin User</span>
            <span className="user-role">Fleet Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
