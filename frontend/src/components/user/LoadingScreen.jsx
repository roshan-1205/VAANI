import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#01070f] to-[#0a1628] flex items-center justify-center z-[9999]">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-6 w-20 h-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#10b981" strokeWidth="4" opacity="0.2" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="283"
              animate={{
                strokeDashoffset: [283, 0, 283]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
        
        <motion.h2
          className="text-white text-4xl font-bold mb-2 tracking-[2px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Vaani
        </motion.h2>
        
        <motion.p
          className="text-white/60 text-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Loading your dashboard...
        </motion.p>
        
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
