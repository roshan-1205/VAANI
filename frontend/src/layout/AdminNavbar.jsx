import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Download, Activity, Bell, User, X, Menu } from 'lucide-react';

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
    <div className="bg-dark px-8 py-5 max-lg:px-6 max-md:px-4 max-md:pl-16 max-sm:px-3 max-sm:pl-16 max-md:py-4 flex justify-between items-center shadow-lg relative z-[100] max-md:flex-wrap" ref={navbarRef}>
      <div className="navbar-left max-md:w-full max-md:mb-3">
        <h1 className="text-white text-2xl max-lg:text-xl max-md:text-lg font-bold mb-1 max-sm:mb-0.5">Admin Dashboard</h1>
        <p className="text-white/60 text-[13px] max-sm:text-xs">Real-time monitoring and analytics</p>
      </div>
      
      <div className="flex items-center gap-3 max-lg:gap-2 max-md:w-full max-md:justify-between max-sm:flex-wrap max-sm:gap-2">
        {/* Date Range Selector */}
        <div className="relative z-[200] max-sm:flex-1">
          <button 
            className="flex items-center gap-2 px-4 py-2.5 max-lg:px-3 max-lg:py-2 max-sm:w-full max-sm:justify-center bg-white/10 border border-white/10 rounded-lg text-white text-[13px] max-sm:text-xs font-medium hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
            onClick={() => showDateMenu ? closeAllDropdowns() : toggleDateMenu()}
          >
            <Calendar size={18} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
            <span className="max-[380px]:hidden">{dateRange}</span>
            <span className="hidden max-[380px]:inline">Range</span>
          </button>
          
          {showDateMenu && (
            <div className="absolute top-[calc(100%+8px)] right-0 max-md:right-0 max-md:left-auto max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:rounded-t-xl max-sm:rounded-b-none bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[200px] max-sm:min-w-full max-sm:w-full z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden">
              {dateRanges.map((range) => (
                <div
                  key={range}
                  className={`px-4 py-3 max-sm:px-3 max-sm:py-2.5 text-white/80 text-sm max-sm:text-xs cursor-pointer transition-all border-b border-white/5 last:border-b-0 hover:bg-white/5 hover:text-white ${dateRange === range ? 'bg-primary/20 text-primary font-medium' : ''}`}
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
          className="flex items-center gap-2 px-4 py-2.5 max-lg:px-3 max-lg:py-2 max-sm:flex-1 max-sm:justify-center bg-white/10 border border-white/10 rounded-lg text-white text-[13px] max-sm:text-xs font-medium hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
          onClick={handleExportReport}
        >
          <Download size={18} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
          <span className="max-[380px]:hidden">Export Report</span>
          <span className="hidden max-[380px]:inline">Export</span>
        </button>
        
        {/* Live Monitor Toggle */}
        <button 
          className={`flex items-center gap-2 px-4 py-2.5 max-lg:px-3 max-lg:py-2 max-sm:w-full max-sm:justify-center rounded-lg text-white text-[13px] max-sm:text-xs font-medium relative transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap ${
            isLiveMonitoring 
              ? 'bg-success/20 border border-success/30' 
              : 'bg-danger/20 border border-danger/30'
          }`}
          onClick={toggleLiveMonitor}
        >
          <Activity size={18} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
          <span>{isLiveMonitoring ? 'Live Monitor' : 'Paused'}</span>
          {isLiveMonitoring && (
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          )}
        </button>
        
        {/* Notifications */}
        <div className="relative z-[200]">
          <button 
            className="w-10 h-10 max-sm:w-9 max-sm:h-9 bg-white/10 rounded-lg text-white flex items-center justify-center relative hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all flex-shrink-0"
            onClick={() => showNotifications ? closeAllDropdowns() : toggleNotifications()}
          >
            <Bell size={20} className="max-sm:w-[18px] max-sm:h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] max-sm:text-[9px] font-semibold px-1.5 py-0.5 max-sm:px-1 max-sm:py-0 rounded-full animate-pulse min-w-[18px] max-sm:min-w-[16px] text-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute top-[calc(100%+8px)] right-0 max-md:right-0 max-md:left-auto max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:rounded-t-xl max-sm:rounded-b-none bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[320px] max-sm:min-w-full max-sm:w-full max-h-[400px] max-sm:max-h-[70vh] z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden flex flex-col">
              <div className="px-4 py-4 max-sm:px-3 max-sm:py-3 border-b border-white/10 flex justify-between items-center sticky top-0 bg-dark-light z-10">
                <h3 className="text-white text-base max-sm:text-sm font-semibold m-0">Notifications</h3>
                {notifications.length > 0 && (
                  <button 
                    className="bg-transparent border-none text-primary text-xs max-sm:text-[11px] cursor-pointer px-2 py-1 rounded hover:bg-primary/10 transition-all"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="py-10 px-5 max-sm:py-8 text-center text-white/40">
                  <Bell size={32} className="mb-3 opacity-30 mx-auto max-sm:w-7 max-sm:h-7" />
                  <p className="m-0 text-sm max-sm:text-xs">No notifications</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 max-sm:px-3 max-sm:py-2.5 flex justify-between items-center cursor-pointer transition-all border-b border-white/5 last:border-b-0 hover:bg-white/5 active:bg-white/10 ${notif.read ? '' : 'bg-primary/5'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-white text-[13px] max-sm:text-xs m-0 mb-1 font-medium truncate">{notif.title}</p>
                        <span className="text-white/50 text-[11px] max-sm:text-[10px]">{notif.time}</span>
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
            className="w-10 h-10 max-sm:w-9 max-sm:h-9 bg-primary/20 border-2 border-primary/30 rounded-full text-primary flex items-center justify-center hover:bg-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex-shrink-0"
            onClick={() => showProfile ? closeAllDropdowns() : toggleProfile()}
          >
            <User size={20} className="max-sm:w-[18px] max-sm:h-[18px]" />
          </button>
          
          {showProfile && (
            <div className="absolute top-[calc(100%+8px)] right-0 max-md:right-0 max-md:left-auto max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:rounded-t-xl max-sm:rounded-b-none bg-dark-light border border-white/10 rounded-xl shadow-2xl min-w-[240px] max-sm:min-w-full max-sm:w-full z-[1000] animate-[dropdownSlide_0.2s_ease] overflow-hidden">
              <div className="px-4 py-4 max-sm:px-3 max-sm:py-3 border-b border-white/10 flex gap-3 items-center">
                <div className="w-12 h-12 max-sm:w-10 max-sm:h-10 bg-primary/20 border-2 border-primary/30 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <User size={24} className="max-sm:w-5 max-sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white text-sm max-sm:text-xs font-semibold m-0 mb-1 truncate">Admin User</h4>
                  <p className="text-white/50 text-xs max-sm:text-[11px] m-0 truncate">admin@dashboard.com</p>
                </div>
              </div>
              
              <div className="py-2">
                <div className="px-4 py-3 max-sm:px-3 max-sm:py-2.5 flex items-center gap-3 text-white/80 text-sm max-sm:text-xs cursor-pointer hover:bg-white/5 hover:text-white active:bg-white/10 transition-all">
                  <User size={16} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
                  <span>My Profile</span>
                </div>
                <div className="px-4 py-3 max-sm:px-3 max-sm:py-2.5 flex items-center gap-3 text-white/80 text-sm max-sm:text-xs cursor-pointer hover:bg-white/5 hover:text-white active:bg-white/10 transition-all">
                  <Activity size={16} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
                  <span>Activity Log</span>
                </div>
                <div 
                  className="px-4 py-3 max-sm:px-3 max-sm:py-2.5 flex items-center gap-3 text-danger text-sm max-sm:text-xs cursor-pointer border-t border-white/10 hover:bg-danger/10 active:bg-danger/20 transition-all"
                  onClick={handleLogout}
                >
                  <X size={16} className="max-sm:w-4 max-sm:h-4 flex-shrink-0" />
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
