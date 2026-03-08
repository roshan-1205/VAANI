import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const ServiceChart = () => {
  const data = [
    { name: 'Healthcare', value: 29, color: '#3b82f6' },
    { name: 'Welfare', value: 24, color: '#f59e0b' },
    { name: 'Education', value: 26, color: '#10b981' },
    { name: 'Legal Aid', value: 21, color: '#8b5cf6' }
  ];

  return (
    <motion.div
      className="bg-dark p-6 max-md:p-5 max-sm:p-4 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6 max-sm:mb-4">
        <h3 className="text-white text-lg max-sm:text-base font-semibold">Service Categories</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300} className="max-sm:h-[250px]">
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
            contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-3 max-sm:gap-2 mt-6 max-sm:mt-4 max-sm:grid-cols-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }}></span>
            <span className="text-white/70 text-[13px] max-sm:text-xs flex-1">{item.name}</span>
            <span className="text-white text-[13px] max-sm:text-xs font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceChart;
