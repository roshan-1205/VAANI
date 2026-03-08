import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

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
      className="bg-dark p-6 max-md:p-5 max-sm:p-4 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6 max-sm:mb-4">
        <h3 className="text-white text-lg max-sm:text-base font-semibold">Language Usage</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300} className="max-sm:h-[250px]">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
          <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" width={80} style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LanguageChart;
