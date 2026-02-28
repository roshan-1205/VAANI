import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../context/VolunteerContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { volunteerData, isOnline, toggleStatus } = useVolunteer();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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
    setShowProfileMenu(false);
    if (notificationCount > 0 && !showNotifications) {
      setNotificationCount(0);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>Volunteer Dashboard</h1>
        <div className="navbar-date">
          <Calendar size={16} />
          <span>{today}</span>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="availability-toggle">
          <span className="toggle-label">Availability:</span>
          <button 
            className={`status-btn ${isOnline ? 'online' : 'offline'}`}
            onClick={toggleStatus}
            title={`Click to go ${isOnline ? 'offline' : 'online'}`}
          >
            <span className="status-dot"></span>
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
        
        <div className="notification-container" ref={notificationRef}>
          <button className="icon-btn" onClick={handleNotificationClick}>
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="badge">{notificationCount}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button onClick={() => { navigate('/messages'); setShowNotifications(false); }}>View All</button>
              </div>
              <div className="dropdown-content">
                <div className="notification-item-small" onClick={() => { navigate('/messages'); setShowNotifications(false); }}>
                  <div className="notif-icon success">✓</div>
                  <div>
                    <p className="notif-title">Task Completed</p>
                    <span className="notif-time">10 minutes ago</span>
                  </div>
                </div>
                <div className="notification-item-small" onClick={() => { navigate('/messages'); setShowNotifications(false); }}>
                  <div className="notif-icon info">i</div>
                  <div>
                    <p className="notif-title">New Training Available</p>
                    <span className="notif-time">2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item-small" onClick={() => { navigate('/messages'); setShowNotifications(false); }}>
                  <div className="notif-icon warning">!</div>
                  <div>
                    <p className="notif-title">Feedback Requested</p>
                    <span className="notif-time">5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-container" ref={profileRef}>
          <div className="profile-section" onClick={handleProfileClick}>
            <div className="profile-info">
              <span className="profile-name">{volunteerData.name}</span>
              <span className="profile-role">{volunteerData.role}</span>
            </div>
            <button className="profile-btn">
              <User size={20} />
            </button>
            <ChevronDown size={16} className={`chevron ${showProfileMenu ? 'rotated' : ''}`} />
          </div>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">
                  <User size={24} />
                </div>
                <div>
                  <p className="dropdown-name">{volunteerData.name}</p>
                  <p className="dropdown-email">{volunteerData.email}</p>
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
