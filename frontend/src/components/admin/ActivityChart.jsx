import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ActivityChart = () => {
  const data = [
    { time: '00:00', calls: 45, resolved: 42 },
    { time: '04:00', calls: 38, resolved: 35 },
    { time: '08:00', calls: 95, resolved: 88 },
    { time: '12:00', calls: 160, resolved: 152 },
    { time: '16:00', calls: 142, resolved: 135 },
    { time: '20:00', calls: 82, resolved: 78 }
  ];

  return (
    <motion.div
      className="bg-dark p-6 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-semibold">Real-time Activity</h3>
        <span className="flex items-center gap-2 text-success text-[13px] font-medium">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          Live
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            labelStyle={{ color: 'white' }}
          />
          <Legend />
          <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ActivityChart;
