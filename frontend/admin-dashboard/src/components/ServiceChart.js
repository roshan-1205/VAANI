import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import './ChartCard.css';

const ServiceChart = () => {
  const data = [
    { name: 'Healthcare', value: 29, color: '#3b82f6' },
    { name: 'Welfare', value: 24, color: '#f59e0b' },
    { name: 'Education', value: 26, color: '#10b981' },
    { name: 'Legal Aid', value: 21, color: '#8b5cf6' }
  ];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="chart-header">
        <h3>Service Categories</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="legend-grid">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span className="legend-dot" style={{ background: item.color }}></span>
            <span className="legend-label">{item.name}</span>
            <span className="legend-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceChart;
