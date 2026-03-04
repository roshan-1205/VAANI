import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const IssueCategoryChart = () => {
  const data = [
    { name: 'Healthcare', value: 35, color: '#8b5cf6' },
    { name: 'Legal', value: 25, color: '#3b82f6' },
    { name: 'Education', value: 20, color: '#10b981' },
    { name: 'Welfare', value: 20, color: '#f59e0b' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#01070f]/95 border border-white/10 rounded-lg px-3 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <p className="font-poppins text-[13px] font-semibold text-white m-0 mb-1">{payload[0].name}</p>
          <p className="font-poppins text-sm font-bold text-[#8b5cf6] m-0">{payload[0].value}%</p>
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
      transition={{ delay: 0.5 }}
    >
      <h3 className="font-poppins text-lg font-semibold text-white m-0 mb-5">Issue Category Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => <span style={{ color: '#01070f', fontSize: '13px' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default IssueCategoryChart;
