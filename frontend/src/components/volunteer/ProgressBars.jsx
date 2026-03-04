import React from 'react';
import { motion } from 'framer-motion';

const ProgressBars = () => {
  const progressData = [
    { label: 'Training Completion Status', value: 52, color: '#8b5cf6' },
    { label: 'Volunteer Engagement Level', value: 52, color: '#3b82f6' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {progressData.map((item, index) => (
        <motion.div
          key={index}
          className="bg-[#01070f] p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <h3 className="text-white text-base font-semibold mb-8 text-center">{item.label}</h3>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-[13px] font-semibold min-w-[35px]">0%</span>
            <div className="flex-1 h-3 bg-white/10 rounded-md relative overflow-visible">
              <motion.div
                className="h-full rounded-md transition-all duration-[1500ms]"
                style={{ background: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
              />
              <div 
                className="absolute  flex items-center justify-center"
                style={{ left: `${item.value}%`, background: item.color, transform: 'translate(-50%, -50%)' }}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white text-sm font-bold whitespace-nowrap">
                  {item.value}%
                </span>
              </div>
            </div>
            <span className="text-white/50 text-[13px] font-semibold min-w-[35px]">100%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBars;
