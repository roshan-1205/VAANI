import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './ChartCard.css';

const StatusDistribution = () => {
  const data = [
    { name: 'Active', value: 40, color: '#8b5cf6' },
    { name: 'Inactive', value: 20, color: '#4b5563' },
    { name: 'Pending', value: 10, color: '#d4a574' },
    { name: 'Completed', value: 30, color: '#6b7280' }
  ];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3>Volunteer Status Distribution</h3>
      
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
            contentStyle={{ 
              background: '#01070f', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px',
              color: 'white'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="legend-grid">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span className="legend-dot" style={{ background: item.color }}></span>
            <span className="legend-label">{item.name}</span>
            <span className="legend-value">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatusDistribution;
