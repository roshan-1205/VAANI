import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Briefcase, Languages, Settings, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

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
};

export default Sidebar;
