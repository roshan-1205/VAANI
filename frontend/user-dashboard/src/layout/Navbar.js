import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, systemStatus, notifications, setNotifications } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false); // Close profile menu
    if (notifications > 0 && !showNotifications) {
      setNotifications(0);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false); // Close notifications
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>User Dashboard</h1>
      </div>
      
      <div className="navbar-right">
        <div className="status-indicators">
          <div className="status-pill online" title="System is online">
            <span className="status-dot"></span>
            Online
          </div>
          
          {systemStatus.pending > 0 && (
            <div 
              className="status-pill pending" 
              title={`${systemStatus.pending} pending items`}
              onClick={() => navigate('/my-activity')}
              style={{ cursor: 'pointer' }}
            >
              <span className="status-dot"></span>
              {systemStatus.pending} Pending
            </div>
          )}
          
          {systemStatus.critical > 0 && (
            <div 
              className="status-pill critical" 
              title={`${systemStatus.critical} critical items`}
              onClick={() => navigate('/notifications')}
              style={{ cursor: 'pointer' }}
            >
              <span className="status-dot"></span>
              {systemStatus.critical} Critical
            </div>
          )}
        </div>
        
        <div className="notification-container" ref={notificationRef}>
          <button className="notification-btn" onClick={handleNotificationClick}>
            <Bell size={20} />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>View All</button>
              </div>
              <div className="dropdown-content">
                <div className="notification-item-small" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>
                  <div className="notif-icon success">✓</div>
                  <div>
                    <p className="notif-title">Application Approved</p>
                    <span className="notif-time">5 minutes ago</span>
                  </div>
                </div>
                <div className="notification-item-small" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>
                  <div className="notif-icon warning">!</div>
                  <div>
                    <p className="notif-title">Document Required</p>
                    <span className="notif-time">1 hour ago</span>
                  </div>
                </div>
                <div className="notification-item-small" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>
                  <div className="notif-icon info">i</div>
                  <div>
                    <p className="notif-title">System Update</p>
                    <span className="notif-time">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-container" ref={profileRef}>
          <div className="profile-section" onClick={handleProfileClick}>
            <div className="profile-avatar">{userData.avatar}</div>
            <div className="profile-info">
              <span className="profile-name">{userData.name}</span>
              <span className="profile-role">{userData.role}</span>
            </div>
            <ChevronDown size={16} className={`chevron ${showProfileMenu ? 'rotated' : ''}`} />
          </div>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">{userData.avatar}</div>
                <div>
                  <p className="dropdown-name">{userData.name}</p>
                  <p className="dropdown-email">{userData.email}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}>
                <User size={18} />
                My Profile
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}>
                <Settings size={18} />
                Settings
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
