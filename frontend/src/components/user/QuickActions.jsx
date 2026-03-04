import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: AlertCircle, label: 'Report New Issue', path: '/report-issue', color: '#8b5cf6' },
    { icon: Search, label: 'Track Existing Issue', path: '/my-activity', color: '#3b82f6' },
    { icon: Phone, label: 'Connect to Live Help', path: '/live-help', color: '#10b981' }
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          className="bg-[#01070f] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer font-poppins text-white text-sm font-medium hover:border-white/20 hover:shadow-[0_8px_24px_rgba(1,7,15,0.2)] transition-all duration-300"
          onClick={() => navigate(action.path)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${action.color}15` }}
          >
            <action.icon size={24} style={{ color: action.color }} />
          </div>
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
