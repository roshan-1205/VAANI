import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';
import './KPICards.css';

const KPICards = () => {
  const { volunteerData } = useVolunteer();
  
  const kpis = [
    { 
      label: 'Engagement Rate', 
      value: `${volunteerData.engagementRate}%`, 
      trend: '+5%', 
      isPositive: true,
      color: '#10b981' 
    },
    { 
      label: 'Volunteer Retention', 
      value: `${volunteerData.trainingCompletion}%`, 
      trend: '-3%', 
      isPositive: false,
      color: '#ef4444' 
    },
    { 
      label: 'Training Completion', 
      value: `${volunteerData.taskCompletion}%`, 
      trend: '+8%', 
      isPositive: true,
      color: '#10b981' 
    },
    { 
      label: 'Feedback Score', 
      value: volunteerData.feedbackScore, 
      trend: '-0.2', 
      isPositive: false,
      color: '#ef4444' 
    }
  ];

  return (
    <div className="kpi-container">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="kpi-header">
            <span className="kpi-label">{kpi.label}</span>
            <div className={`kpi-trend ${kpi.isPositive ? 'positive' : 'negative'}`}>
              {kpi.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {kpi.trend}
            </div>
          </div>
          <div className="kpi-value" style={{ color: kpi.color }}>
            {kpi.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
