import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Briefcase, Languages, Settings, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Briefcase, label: 'Services', path: '/services' },
    { icon: Languages, label: 'Language Insights', path: '/language-insights' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.div 
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={false}
      animate={{ 
        width: collapsed ? 80 : 260 
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smooth easing
      }}
    >
      <div className="sidebar-header">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              Admin
            </motion.h2>
          )}
        </AnimatePresence>
        
        <motion.button 
          className="collapse-btn" 
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft />
          </motion.div>
        </motion.button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: collapsed ? 1.1 : 1 
              }}
              transition={{ duration: 0.3 }}
            >
              <item.icon size={20} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );

      <style jsx>{\
        .sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: #01070f;
  padding: 24px 16px;
  z-index: 100;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.sidebar.collapsed {
  /* Width is now controlled by framer-motion */
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 8px;
  min-height: 112px;
}

.sidebar-header h2 {
  color: white;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-logo {
  width: 112px;
  height: 112px;
  object-fit: contain;
}

.collapse-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.nav-item span {
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 14px;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}

      \}</style>
    </motion.div>
  );
};

export default Sidebar;
