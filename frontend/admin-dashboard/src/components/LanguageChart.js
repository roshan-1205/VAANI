import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import './ChartCard.css';

const LanguageChart = () => {
  const data = [
    { name: 'Hindi', value: 3200 },
    { name: 'Bengali', value: 2400 },
    { name: 'Tamil', value: 1800 },
    { name: 'Telugu', value: 1600 },
    { name: 'Marathi', value: 1200 }
  ];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="chart-header">
        <h3>Language Usage</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
          <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" width={80} />
          <Tooltip
            contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LanguageChart;
