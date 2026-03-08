import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, User, Settings, LogOut, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../../context/VolunteerContext';

// Import profile images
import boy1 from '../../assets/profiles/boy1.jpg';
import boy2 from '../../assets/profiles/boy2.jpg';
import boy3 from '../../assets/profiles/boy3.jpg';
import boy4 from '../../assets/profiles/boy4.jpg';
import girl1 from '../../assets/profiles/girl1.jpg';
import girl2 from '../../assets/profiles/girl2.jpg';
import girl3 from '../../assets/profiles/girl3.jpg';

const profileImages = [boy1, boy2, boy3, boy4, girl1, girl2, girl3];

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed, isMobile }) => {
  const navigate = useNavigate();
  const { volunteerData, isOnline, toggleStatus } = useVolunteer();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [profileImage, setProfileImage] = useState(null);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Get or assign profile image
  useEffect(() => {
    const storedImage = sessionStorage.getItem('volunteerProfileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    } else {
      // Assign random profile image based on email hash for consistency
      const email = volunteerData.email || sessionStorage.getItem('userEmail') || '';
      const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageIndex = hash % profileImages.length;
      const selectedImage = profileImages[imageIndex];
      sessionStorage.setItem('volunteerProfileImage', selectedImage);
      setProfileImage(selectedImage);
    }
  }, [volunteerData.email]);

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
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="bg-[#01070f] px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg relative z-50 gap-3 sm:gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <button
            className="lg:hidden w-10 h-10 bg-white/10 hover:bg-white/15 rounded-lg text-white flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu size={20} />
          </button>
        )}
        
        <div className="flex-1">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Volunteer Dashboard</h1>
          <div className="flex items-center gap-2 text-white/60 text-xs sm:text-[13px]">
            <Calendar size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{today}</span>
            <span className="sm:hidden">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-white/70 text-xs sm:text-[13px] font-medium hidden sm:inline">Availability:</span>
          <button 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
              isOnline ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
            }`}
            onClick={toggleStatus}
            title={`Click to go ${isOnline ? 'offline' : 'online'}`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
        
        <div className="relative" ref={notificationRef}>
          <button 
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/15 rounded-lg text-white flex items-center justify-center cursor-pointer relative transition-all duration-300 hover:-translate-y-0.5"
            onClick={handleNotificationClick}
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-bounce">
                {notificationCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute top-[calc(100%+12px)] right-0 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px] bg-[#01070f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
              <div className="flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10">
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-semibold text-white">Notifications</h3>
                <button 
                  className="text-green-500 font-['Poppins'] text-xs sm:text-[13px] font-medium hover:text-green-400 transition-colors"
                  onClick={() => { navigate('/volunteer-dashboard/messages'); setShowNotifications(false); }}
                >
                  View All
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div 
                  className="flex gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/volunteer-dashboard/messages'); setShowNotifications(false); }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">✓</div>
                  <div>
                    <p className="font-['Poppins'] text-xs sm:text-sm font-medium text-white mb-1">Task Completed</p>
                    <span className="font-['Poppins'] text-[10px] sm:text-xs text-white/50">10 minutes ago</span>
                  </div>
                </div>
                <div 
                  className="flex gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/volunteer-dashboard/messages'); setShowNotifications(false); }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">i</div>
                  <div>
                    <p className="font-['Poppins'] text-xs sm:text-sm font-medium text-white mb-1">New Training Available</p>
                    <span className="font-['Poppins'] text-[10px] sm:text-xs text-white/50">2 hours ago</span>
                  </div>
                </div>
                <div 
                  className="flex gap-3 px-4 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/volunteer-dashboard/messages'); setShowNotifications(false); }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">!</div>
                  <div>
                    <p className="font-['Poppins'] text-xs sm:text-sm font-medium text-white mb-1">Feedback Requested</p>
                    <span className="font-['Poppins'] text-[10px] sm:text-xs text-white/50">5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300"
            onClick={handleProfileClick}
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white text-xs sm:text-sm font-semibold">{volunteerData.name}</span>
              <span className="text-white/50 text-[10px] sm:text-xs">{volunteerData.role}</span>
            </div>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-green-500/30 cursor-pointer transition-all duration-300 hover:border-green-500/50"
              />
            ) : (
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 border-2 border-green-500/30 rounded-full text-green-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-green-500/30">
                <User size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}
            <ChevronDown 
              size={14} 
              className={`text-white/50 transition-transform duration-300 sm:w-4 sm:h-4 ${showProfileMenu ? 'rotate-180' : ''}`}
            />
          </div>
          
          {showProfileMenu && (
            <div className="absolute top-[calc(100%+12px)] right-0 w-[calc(100vw-2rem)] sm:w-70 max-w-[280px] bg-[#01070f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
              <div className="flex gap-3 px-4 sm:px-5 py-4 sm:py-5 bg-white/[0.03]">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-green-500/30 flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 border-2 border-green-500/30 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
                    <User size={20} className="sm:w-6 sm:h-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-['Poppins'] text-sm sm:text-[15px] font-semibold text-white mb-1 truncate">{volunteerData.name}</p>
                  <p className="font-['Poppins'] text-xs sm:text-[13px] text-white/50 truncate">{volunteerData.email}</p>
                </div>
              </div>
              <div className="h-px bg-white/10 my-2"></div>
              <button 
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-white font-['Poppins'] text-xs sm:text-sm font-medium text-left cursor-pointer transition-all hover:bg-white/5"
                onClick={() => { navigate('/volunteer-dashboard/settings'); setShowProfileMenu(false); }}
              >
                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                My Profile
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-white font-['Poppins'] text-xs sm:text-sm font-medium text-left cursor-pointer transition-all hover:bg-white/5"
                onClick={() => { navigate('/volunteer-dashboard/settings'); setShowProfileMenu(false); }}
              >
                <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
                Settings
              </button>
              <div className="h-px bg-white/10 my-2"></div>
              <button 
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-red-500 font-['Poppins'] text-xs sm:text-sm font-medium text-left cursor-pointer transition-all hover:bg-red-500/10"
                onClick={handleLogout}
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
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
