import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './RecentActivity.css';

const RecentActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const activities = [
    {
      id: 1,
      name: 'Lakshmi Devi',
      service: 'Pension inquiry',
      language: 'Hindi',
      status: 'Resolved',
      time: '2 min ago',
      avatar: 'L',
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Raju Kumar',
      service: 'Healthcare appointment',
      language: 'Bengali',
      status: 'In Progress',
      time: '5 min ago',
      avatar: 'R',
      color: '#8b5cf6'
    },
    {
      id: 3,
      name: 'Meena Patel',
      service: 'Education scheme',
      language: 'Gujarati',
      status: 'Resolved',
      time: '8 min ago',
      avatar: 'M',
      color: '#10b981'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      service: 'Legal aid request',
      language: 'Telugu',
      status: 'Resolved',
      time: '12 min ago',
      avatar: 'S',
      color: '#f59e0b'
    }
  ];

  return (
    <>
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="chart-header">
          <h3>Recent Activity</h3>
        </div>
        
        <div className="activity-list">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="activity-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="activity-avatar" style={{ background: activity.color }}>
                {activity.avatar}
              </div>
              
              <div className="activity-content">
                <div className="activity-name">{activity.name}</div>
                <div className="activity-service">{activity.service}</div>
              </div>
              
              <div className="activity-meta">
                <span className="language-badge">{activity.language}</span>
                <span className={`status-badge ${activity.status === 'Resolved' ? 'resolved' : 'progress'}`}>
                  {activity.status}
                </span>
                <span className="activity-time">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <h3>Activity Details</h3>
                <button onClick={() => setSelectedActivity(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="drawer-content">
                <div className="detail-avatar" style={{ background: selectedActivity.color }}>
                  {selectedActivity.avatar}
                </div>
                <h4>{selectedActivity.name}</h4>
                <p className="detail-service">{selectedActivity.service}</p>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Language</span>
                    <span className="detail-value">{selectedActivity.language}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{selectedActivity.status}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time</span>
                    <span className="detail-value">{selectedActivity.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentActivity;
