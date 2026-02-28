import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import './PageCommon.css';

const MyActivity = () => {
  const activities = [
    { id: 1, title: 'Completed Healthcare Call', time: '2 hours ago', type: 'completed', icon: CheckCircle },
    { id: 2, title: 'Started Training Module', time: '4 hours ago', type: 'progress', icon: Clock },
    { id: 3, title: 'Submitted Feedback', time: '1 day ago', type: 'completed', icon: CheckCircle },
    { id: 4, title: 'Attended Team Meeting', time: '2 days ago', type: 'completed', icon: CheckCircle }
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>My Activity</h1>
          <p>Track your recent activities and contributions</p>
        </div>
      </motion.div>

      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="activity-list">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="activity-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`activity-icon ${activity.type}`}>
                <activity.icon size={20} />
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyActivity;
