import React from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './ChartCard.css';

const IssueTrendChart = () => {
  const data = [
    { month: 'Jan', reported: 45, resolved: 38 },
    { month: 'Feb', reported: 52, resolved: 45 },
    { month: 'Mar', reported: 48, resolved: 42 },
    { month: 'Apr', reported: 61, resolved: 55 },
    { month: 'May', reported: 58, resolved: 52 },
    { month: 'Jun', reported: 67, resolved: 61 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3>Issue Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(1,7,15,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#01070f"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#01070f"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => <span style={{ color: '#01070f', fontSize: '13px' }}>{value}</span>}
          />
          <Bar dataKey="reported" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default IssueTrendChart;
