import React from 'react';
import { Users, Phone, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './KPICards.css';

const KPICards = () => {
  const kpis = [
    { icon: Users, label: 'Active Users', value: 1284, trend: '+12.5%', color: '#3b82f6' },
    { icon: Phone, label: 'Calls Today', value: 534, trend: '+8.2%', color: '#8b5cf6' },
    { icon: Clock, label: 'Avg Response Time', value: '1.8s', trend: '-0.3s', color: '#06b6d4', isNegative: true },
    { icon: CheckCircle, label: 'Success Rate', value: '94.8%', trend: '+2.1%', color: '#10b981' }
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
          <div className="kpi-icon" style={{ background: `${kpi.color}20`, color: kpi.color }}>
            <kpi.icon size={24} />
          </div>
          
          <div className="kpi-content">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-trend ${kpi.isNegative ? 'positive' : ''}`}>
              {kpi.trend}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
