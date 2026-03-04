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
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-dark px-8 py-5 flex justify-between items-center shadow-lg relative z-[100] max-md:flex-col max-md:gap-4 max-md:px-4" ref={navbarRef}>
      <div className="navbar-left">
        <h1 className="text-white text-2xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-white/60 text-[13px]">Real-time monitoring and analytics</p>
      </div>
      
      <div className="flex items-center gap-3 max-md:flex-wrap max-md:justify-center">
        {/* Date Range Selector */}
        <div className="relative z-[200]">
          <button 
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white text-[13px] font-medium hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            onClick={() => showDateMenu ? closeAllDropdowns() : toggleDateMenu()}
          >
            <Calendar size={18} />
            <span>{dateRange}</span>
          </button>
          
          {showDateMenu && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[200px] z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden">
              {dateRanges.map((range) => (
                <div
                  key={range}
                  className={`px-4 py-3 text-white/80 text-sm cursor-pointer transition-all border-b border-white/5 last:border-b-0 hover:bg-white/5 hover:text-white ${dateRange === range ? 'bg-primary/20 text-primary font-medium' : ''}`}
                  onClick={() => handleDateChange(range)}
                >
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Export Report Button */}
        <button 
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white text-[13px] font-medium hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          onClick={handleExportReport}
        >
          <Download size={18} />
          <span>Export Report</span>
        </button>
        
        {/* Live Monitor Toggle */}
        <button 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-[13px] font-medium relative transition-all hover:-translate-y-0.5 active:translate-y-0 ${
            isLiveMonitoring 
              ? 'bg-success/20 border border-success/30' 
              : 'bg-danger/20 border border-danger/30'
          }`}
          onClick={toggleLiveMonitor}
        >
          <Activity size={18} />
          <span>{isLiveMonitoring ? 'Live Monitor' : 'Paused'}</span>
          {isLiveMonitoring && (
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          )}
        </button>
        
        {/* Notifications */}
        <div className="relative z-[200]">
          <button 
            className="w-10 h-10 bg-white/10 rounded-lg text-white flex items-center justify-center relative hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            onClick={() => showNotifications ? closeAllDropdowns() : toggleNotifications()}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[320px] max-h-[400px] z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden flex flex-col">
              <div className="px-4 py-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-white text-base font-semibold m-0">Notifications</h3>
                {notifications.length > 0 && (
                  <button 
                    className="bg-transparent border-none text-primary text-xs cursor-pointer px-2 py-1 rounded hover:bg-primary/10 transition-all"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="py-10 px-5 text-center text-white/40">
                  <Bell size={32} className="mb-3 opacity-30 mx-auto" />
                  <p className="m-0 text-sm">No notifications</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 flex justify-between items-center cursor-pointer transition-all border-b border-white/5 last:border-b-0 hover:bg-white/5 ${notif.read ? '' : 'bg-primary/5'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex-1">
                        <p className="text-white text-[13px] m-0 mb-1 font-medium">{notif.title}</p>
                        <span className="text-white/50 text-[11px]">{notif.time}</span>
                      </div>
                      {!notif.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Profile Menu */}
        <div className="relative z-[200]">
          <button 
            className="w-10 h-10 bg-primary/20 border-2 border-primary/30 rounded-full text-primary flex items-center justify-center hover:bg-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            onClick={() => showProfile ? closeAllDropdowns() : toggleProfile()}
          >
            <User size={20} />
          </button>
          
          {showProfile && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[240px] z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden">
              <div className="px-4 py-4 border-b border-white/10 flex gap-3 items-center">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary/30 rounded-full flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold m-0 mb-1">Admin User</h4>
                  <p className="text-white/50 text-xs m-0">admin@dashboard.com</p>
                </div>
              </div>
              
              <div className="py-2">
                <div className="px-4 py-3 flex items-center gap-3 text-white/80 text-sm cursor-pointer hover:bg-white/5 hover:text-white transition-all">
                  <User size={16} />
                  <span>My Profile</span>
                </div>
                <div className="px-4 py-3 flex items-center gap-3 text-white/80 text-sm cursor-pointer hover:bg-white/5 hover:text-white transition-all">
                  <Activity size={16} />
                  <span>Activity Log</span>
                </div>
                <div 
                  className="px-4 py-3 flex items-center gap-3 text-danger text-sm cursor-pointer border-t border-white/10 hover:bg-danger/10 transition-all"
                  onClick={handleLogout}
                >
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
