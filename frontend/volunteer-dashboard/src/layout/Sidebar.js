import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Activity, BookOpen, TrendingUp, MessageSquare, Settings, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: CheckSquare, label: 'My Tasks', path: '/my-tasks' },
    { icon: Activity, label: 'My Activity', path: '/my-activity' },
    { icon: BookOpen, label: 'Training', path: '/training' },
    { icon: TrendingUp, label: 'Performance', path: '/performance' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
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
        ease: [0.4, 0, 0.2, 1]
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
              Volunteer
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
