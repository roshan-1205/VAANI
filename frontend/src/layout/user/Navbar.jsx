import { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, User, Settings, LogOut, ChevronDown, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// Import profile images
import boy1 from '../../assets/profiles/boy1.jpg';
import boy2 from '../../assets/profiles/boy2.jpg';
import boy3 from '../../assets/profiles/boy3.jpg';
import boy4 from '../../assets/profiles/boy4.jpg';
import girl1 from '../../assets/profiles/girl1.jpg';
import girl2 from '../../assets/profiles/girl2.jpg';
import girl3 from '../../assets/profiles/girl3.jpg';

const profileImages = [boy1, boy2, boy3, boy4, girl1, girl2, girl3];

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
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
    const storedImage = sessionStorage.getItem('userProfileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    } else {
      // Assign random profile image based on email hash for consistency
      const email = userData.email || sessionStorage.getItem('userEmail') || '';
      const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageIndex = hash % profileImages.length;
      const selectedImage = profileImages[imageIndex];
      sessionStorage.setItem('userProfileImage', selectedImage);
      setProfileImage(selectedImage);
    }
  }, [userData.email]);

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
    console.log('ðŸšª Logging out...');
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleCallClick = () => {
    navigate('/user-dashboard/live-help');
  };

  return (
    <div className="bg-[#01070f] px-8 py-5 flex flex-col md:flex-row justify-between items-center shadow-lg relative z-50 gap-4">
      <div>
        <h1 className="text-white text-2xl font-bold mb-2">User Dashboard</h1>
        <div className="flex items-center gap-2 text-white/60 text-[13px]">
          <Calendar size={16} />
          <span>{today}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold bg-green-500/20 text-green-500 border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </div>
        </div>
        
        {/* Call Button */}
        <button 
          onClick={handleCallClick}
          className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-white flex items-center justify-center cursor-pointer relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group"
          title="Call Support"
        >
          <Phone size={20} className="group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="relative" ref={notificationRef}>
          <button 
            className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-lg text-white flex items-center justify-center cursor-pointer relative transition-all duration-300 hover:-translate-y-0.5"
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-bounce">
                {notificationCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute top-[calc(100%+12px)] right-0 w-[360px] bg-[#01070f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                <h3 className="font-poppins text-base font-semibold text-white">Notifications</h3>
                <button 
                  className="text-green-500 font-poppins text-[13px] font-medium hover:text-green-400 transition-colors"
                  onClick={() => { navigate('/user-dashboard/notifications'); setShowNotifications(false); }}
                >
                  View All
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div 
                  className="flex gap-3 px-5 py-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/user-dashboard/notifications'); setShowNotifications(false); }}
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center font-bold flex-shrink-0">âœ“</div>
                  <div>
                    <p className="font-poppins text-sm font-medium text-white mb-1">Application Approved</p>
                    <span className="font-poppins text-xs text-white/50">5 minutes ago</span>
                  </div>
                </div>
                <div 
                  className="flex gap-3 px-5 py-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/user-dashboard/notifications'); setShowNotifications(false); }}
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold flex-shrink-0">i</div>
                  <div>
                    <p className="font-poppins text-sm font-medium text-white mb-1">New Service Available</p>
                    <span className="font-poppins text-xs text-white/50">1 hour ago</span>
                  </div>
                </div>
                <div 
                  className="flex gap-3 px-5 py-4 cursor-pointer hover:bg-white/5 transition-all"
                  onClick={() => { navigate('/user-dashboard/notifications'); setShowNotifications(false); }}
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold flex-shrink-0">!</div>
                  <div>
                    <p className="font-poppins text-sm font-medium text-white mb-1">Document Required</p>
                    <span className="font-poppins text-xs text-white/50">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300"
            onClick={handleProfileClick}
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white text-sm font-semibold">{userData.name}</span>
              <span className="text-white/50 text-xs">{userData.role}</span>
            </div>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30 cursor-pointer transition-all duration-300 hover:border-blue-500/50"
              />
            ) : (
              <button className="w-10 h-10 bg-blue-500/20 border-2 border-blue-500/30 rounded-full text-blue-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500/30">
                <User size={20} />
              </button>
            )}
            <ChevronDown 
              size={16} 
              className={`text-white/50 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`}
            />
          </div>
          
          {showProfileMenu && (
            <div className="absolute top-[calc(100%+12px)] right-0 w-70 bg-[#01070f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">
              <div className="flex gap-3 px-5 py-5 bg-white/[0.03]">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500/30 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                    <User size={24} />
                  </div>
                )}
                <div>
                  <p className="font-poppins text-[15px] font-semibold text-white mb-1">{userData.name}</p>
                  <p className="font-poppins text-[13px] text-white/50">{userData.email}</p>
                </div>
              </div>
              <div className="h-px bg-white/10 my-2"></div>
              <button 
                className="w-full flex items-center gap-3 px-5 py-3 text-white font-poppins text-sm font-medium text-left cursor-pointer transition-all hover:bg-white/5"
                onClick={() => { navigate('/user-dashboard/settings'); setShowProfileMenu(false); }}
              >
                <User size={18} />
                My Profile
              </button>
              <button 
                className="w-full flex items-center gap-3 px-5 py-3 text-white font-poppins text-sm font-medium text-left cursor-pointer transition-all hover:bg-white/5"
                onClick={() => { navigate('/user-dashboard/settings'); setShowProfileMenu(false); }}
              >
                <Settings size={18} />
                Settings
              </button>
              <div className="h-px bg-white/10 my-2"></div>
              <button 
                className="w-full flex items-center gap-3 px-5 py-3 text-white font-poppins text-sm font-medium text-left cursor-pointer transition-all hover:bg-white/5"
                onClick={handleGoHome}
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Homepage
              </button>
              <button 
                className="w-full flex items-center gap-3 px-5 py-3 text-red-500 font-poppins text-sm font-medium text-left cursor-pointer transition-all hover:bg-red-500/10"
                onClick={handleLogout}
              >
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
