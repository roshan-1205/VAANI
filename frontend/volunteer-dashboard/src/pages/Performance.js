import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Star } from 'lucide-react';
import './PageCommon.css';

const Performance = () => {
  const metrics = [
    { icon: TrendingUp, label: 'Tasks Completed', value: '142', color: '#10b981' },
    { icon: Award, label: 'Achievements', value: '8', color: '#f59e0b' },
    { icon: Target, label: 'Goals Met', value: '12/15', color: '#3b82f6' },
    { icon: Star, label: 'Average Rating', value: '4.8', color: '#8b5cf6' }
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Performance</h1>
          <p>Track your performance metrics and achievements</p>
        </div>
      </motion.div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="metric-icon" style={{ background: `${metric.color}20`, color: metric.color }}>
              <metric.icon size={24} />
            </div>
            <div className="metric-content">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value" style={{ color: metric.color }}>{metric.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
