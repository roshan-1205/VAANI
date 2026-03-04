import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Download, Activity, Bell, User, X } from 'lucide-react';
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

  const handleLogout = () => {
    console.log('Logging out...');
    // Clear any stored user data
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to main frontend homepage (port 5173) and replace history
    window.location.replace('http://localhost:5173/');
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
                <div className="profile-menu-item logout" onClick={handleLogout}>
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

      <style jsx>{\
        .navbar {
  background: #01070f;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.navbar-left h1 {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.navbar-left p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-container {
  position: relative;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.nav-btn:active {
  transform: translateY(0);
}

.live-btn {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
  position: relative;
}

.live-btn.active {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.3);
}

.live-btn.inactive {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
}

.pulse {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.3;
    transform: scale(0.8);
  }
}

.icon-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.icon-btn:active {
  transform: translateY(0);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  animation: badgePulse 2s infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.profile-btn {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.2);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.profile-btn:active {
  transform: translateY(0);
}

/* Dropdown Menus */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #0a1628;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  min-width: 200px;
  z-index: 1000;
  animation: dropdownSlide 0.2s ease;
  overflow: hidden;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.dropdown-item.active {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  font-weight: 500;
}

/* Notifications Menu */
.notifications-menu {
  min-width: 320px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notifications-header {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications-header h3 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: rgba(59, 130, 246, 0.1);
}

.notifications-list {
  max-height: 320px;
  overflow-y: auto;
}

.notifications-list::-webkit-scrollbar {
  width: 6px;
}

.notifications-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.notifications-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.notification-item {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.notification-item.unread {
  background: rgba(59, 130, 246, 0.05);
}

.notification-content {
  flex: 1;
}

.notification-title {
  color: white;
  font-size: 13px;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.notification-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
}

.empty-notifications {
  padding: 40px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.empty-notifications svg {
  margin-bottom: 12px;
  opacity: 0.3;
}

.empty-notifications p {
  margin: 0;
  font-size: 14px;
}

/* Profile Menu */
.profile-menu {
  min-width: 240px;
}

.profile-header {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 12px;
  align-items: center;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  background: rgba(59, 130, 246, 0.2);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.profile-info h4 {
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.profile-info p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin: 0;
}

.profile-menu-items {
  padding: 8px 0;
}

.profile-menu-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.profile-menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.profile-menu-item.logout {
  color: #ef4444;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-menu-item.logout:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  .navbar-right {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-btn span {
    display: none;
  }
  
  .dropdown-menu {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .notifications-menu,
  .profile-menu {
    min-width: 280px;
  }
}

      \}</style>
    </div>
  );
};

export default Navbar;
