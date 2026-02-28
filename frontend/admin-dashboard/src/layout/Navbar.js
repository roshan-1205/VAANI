import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Download, Activity, Bell, User, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registered', time: '2 min ago', read: false },
    { id: 2, title: 'System update available', time: '1 hour ago', read: false },
    { id: 3, title: 'Report generated successfully', time: '3 hours ago', read: false }
  ]);

  const navbarRef = useRef(null);

  const dateRanges = ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom Range'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeAllDropdowns = () => {
    setShowDateMenu(false);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const handleDateChange = (range) => {
    setDateRange(range);
    setShowDateMenu(false);
  };

  const toggleDateMenu = () => {
    closeAllDropdowns();
    setShowDateMenu(true);
  };

  const toggleNotifications = () => {
    closeAllDropdowns();
    setShowNotifications(true);
  };

  const toggleProfile = () => {
    closeAllDropdowns();
    setShowProfile(true);
  };

  const handleExportReport = () => {
    // Simulate report export
    const data = {
      exportDate: new Date().toISOString(),
      dateRange: dateRange,
      totalUsers: 12847,
      activeServices: 8,
      systemHealth: '98.5%'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleLiveMonitor = () => {
    setIsLiveMonitoring(!isLiveMonitoring);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="navbar-left">
        <h1>Admin Dashboard</h1>
        <p>Real-time monitoring and analytics</p>
      </div>
      
      <div className="navbar-right">
        {/* Date Range Selector */}
        <div className="dropdown-container">
          <button className="nav-btn" onClick={() => showDateMenu ? closeAllDropdowns() : toggleDateMenu()}>
            <Calendar size={18} />
            <span>{dateRange}</span>
          </button>
          
          {showDateMenu && (
            <div className="dropdown-menu">
              {dateRanges.map((range) => (
                <div
                  key={range}
                  className={`dropdown-item ${dateRange === range ? 'active' : ''}`}
                  onClick={() => handleDateChange(range)}
                >
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Export Report Button */}
        <button className="nav-btn" onClick={handleExportReport}>
          <Download size={18} />
          <span>Export Report</span>
        </button>
        
        {/* Live Monitor Toggle */}
        <button 
          className={`nav-btn live-btn ${isLiveMonitoring ? 'active' : 'inactive'}`}
          onClick={toggleLiveMonitor}
        >
          <Activity size={18} />
          <span>{isLiveMonitoring ? 'Live Monitor' : 'Paused'}</span>
          {isLiveMonitoring && <span className="pulse"></span>}
        </button>
        
        {/* Notifications */}
        <div className="dropdown-container">
          <button className="icon-btn" onClick={() => showNotifications ? closeAllDropdowns() : toggleNotifications()}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          
          {showNotifications && (
            <div className="dropdown-menu notifications-menu">
              <div className="notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="clear-btn" onClick={clearAllNotifications}>
                    Clear All
                  </button>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="empty-notifications">
                  <Bell size={32} />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="notification-content">
                        <p className="notification-title">{notif.title}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <span className="unread-dot"></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Profile Menu */}
        <div className="dropdown-container">
          <button className="profile-btn" onClick={() => showProfile ? closeAllDropdowns() : toggleProfile()}>
            <User size={20} />
          </button>
          
          {showProfile && (
            <div className="dropdown-menu profile-menu">
              <div className="profile-header">
                <div className="profile-avatar">
                  <User size={24} />
                </div>
                <div className="profile-info">
                  <h4>Admin User</h4>
                  <p>admin@dashboard.com</p>
                </div>
              </div>
              
              <div className="profile-menu-items">
                <div className="profile-menu-item">
                  <User size={16} />
                  <span>My Profile</span>
                </div>
                <div className="profile-menu-item">
                  <Activity size={16} />
                  <span>Activity Log</span>
                </div>
                <div className="profile-menu-item logout">
                  <X size={16} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
