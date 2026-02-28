import React from 'react';
import { motion } from 'framer-motion';
import './ProgressBars.css';

const ProgressBars = () => {
  const progressData = [
    { label: 'Training Completion Status', value: 52, color: '#8b5cf6' },
    { label: 'Volunteer Engagement Level', value: 52, color: '#3b82f6' }
  ];

  return (
    <div className="progress-bars-container">
      {progressData.map((item, index) => (
        <motion.div
          key={index}
          className="progress-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <h3>{item.label}</h3>
          <div className="progress-wrapper">
            <span className="progress-label">0%</span>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ background: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
              />
              <div className="progress-thumb" style={{ left: `${item.value}%`, background: item.color }}>
                <span className="progress-value">{item.value}%</span>
              </div>
            </div>
            <span className="progress-label">100%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBars;
