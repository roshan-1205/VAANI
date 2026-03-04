import React from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
        <div className="bg-[#01070f]/95 border border-white/10 rounded-lg px-3 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <p className="font-poppins text-[13px] font-semibold text-white m-0 mb-1">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="font-poppins text-sm font-bold m-0" style={{ color: entry.color }}>
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
      className="bg-[#01070f] rounded-[20px] p-6 shadow-[0_4px_16px_rgba(1,7,15,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="font-poppins text-lg font-semibold text-white m-0 mb-5">Issue Trend</h3>
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
