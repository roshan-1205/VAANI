import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Briefcase, Languages, Settings, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Briefcase, label: 'Services', path: '/admin/services' },
    { icon: Languages, label: 'Language Insights', path: '/admin/language-insights' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-screen bg-dark px-4 py-6 z-[100] shadow-[4px_0_16px_rgba(0,0,0,0.1)] overflow-hidden max-md:-translate-x-full ${collapsed ? '' : ''}`}
      initial={false}
      animate={{ 
        width: collapsed ? 80 : 260 
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="flex items-center justify-between mb-10 px-2 min-h-[112px]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.h2
              className="text-white text-2xl font-bold tracking-wide whitespace-nowrap overflow-hidden"
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
          className="bg-white/10 border-none text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors flex-shrink-0"
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
      
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-4 px-4 py-3.5 text-white/70 bg-transparent rounded-xl cursor-pointer transition-all text-sm font-medium text-left w-full whitespace-nowrap overflow-hidden ${
              location.pathname === item.path 
                ? 'bg-success/15 text-success' 
                : 'hover:bg-white/10 hover:text-white'
            } ${collapsed ? 'justify-center px-3.5' : ''}`}
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
                  className="overflow-hidden text-ellipsis"
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
