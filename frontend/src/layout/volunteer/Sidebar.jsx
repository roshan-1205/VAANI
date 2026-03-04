import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Activity, BookOpen, TrendingUp, MessageSquare, Settings, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/volunteer-dashboard' },
    { icon: CheckSquare, label: 'My Tasks', path: '/volunteer-dashboard/my-tasks' },
    { icon: Activity, label: 'My Activity', path: '/volunteer-dashboard/my-activity' },
    { icon: BookOpen, label: 'Training', path: '/volunteer-dashboard/training' },
    { icon: TrendingUp, label: 'Performance', path: '/volunteer-dashboard/performance' },
    { icon: MessageSquare, label: 'Messages', path: '/volunteer-dashboard/messages' },
    { icon: Settings, label: 'Settings', path: '/volunteer-dashboard/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.div 
      className="fixed left-0 top-0 h-screen bg-[#01070f] py-6 z-[100] shadow-2xl max-lg:hidden overflow-hidden"
      initial={false}
      animate={{ 
        width: collapsed ? 80 : 260,
        paddingLeft: collapsed ? 12 : 16,
        paddingRight: collapsed ? 12 : 16
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="flex items-center justify-between mb-10 px-2 h-10">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-white text-xl font-bold tracking-wide m-0 whitespace-nowrap">Volunteer</h2>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          className="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 border-none flex-shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <ChevronLeft size={20} />
          </motion.div>
        </button>
      </div>
      
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              className={`flex items-center gap-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium border-none w-full text-left overflow-hidden ${
                isActive
                  ? 'bg-green-500/20 text-green-500' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center px-0' : 'px-4'}`}
              onClick={() => handleNavigation(item.path)}
              style={{
                paddingLeft: collapsed ? 0 : '16px',
                paddingRight: collapsed ? 0 : '16px',
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
            >
              <div className="flex-shrink-0">
                <item.icon size={20} />
              </div>
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    className="whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
