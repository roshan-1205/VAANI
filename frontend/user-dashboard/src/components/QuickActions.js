import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: AlertCircle, label: 'Report New Issue', path: '/report-issue', color: '#8b5cf6' },
    { icon: Search, label: 'Track Existing Issue', path: '/my-activity', color: '#3b82f6' },
    { icon: Phone, label: 'Connect to Live Help', path: '/live-help', color: '#10b981' }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          className="action-btn"
          onClick={() => navigate(action.path)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <div className="action-icon" style={{ backgroundColor: `${action.color}15` }}>
            <action.icon size={24} style={{ color: action.color }} />
          </div>
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
