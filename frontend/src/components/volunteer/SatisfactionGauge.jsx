import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, ThumbsUp, Award, Smile, Meh, Frown, Target } from 'lucide-react';

const SatisfactionGauge = () => {
  const [value, setValue] = useState(0);
  const targetValue = 87; // Target satisfaction percentage
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(targetValue);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getSatisfactionLevel = () => {
    if (value >= 80) return { label: 'Excellent', color: '#10b981', icon: Smile };
    if (value >= 60) return { label: 'Good', color: '#f59e0b', icon: Meh };
    return { label: 'Needs Improvement', color: '#ef4444', icon: Frown };
  };

  const satisfactionLevel = getSatisfactionLevel();
  const SatisfactionIcon = satisfactionLevel.icon;

  // Calculate circle properties
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const metrics = [
    { label: 'Response Rate', value: '94%', icon: ThumbsUp, color: '#10b981' },
    { label: 'Avg Rating', value: '4.7', icon: Star, color: '#f59e0b' },
    { label: 'Feedback Score', value: '92', icon: Award, color: '#3b82f6' }
  ];

  return (
    <motion.div
      className="bg-[#01070f] p-6 rounded-xl shadow-lg border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold font-['Montserrat']">Volunteer Satisfaction</h3>
          <p className="text-white/60 text-xs mt-1">Overall performance rating</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/15 px-3 py-1.5 rounded-lg">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-green-500 text-xs font-semibold">+5.2%</span>
        </div>
      </div>

      {/* Full Circle Gauge */}
      <div className="flex items-center justify-center py-8">
        <div className="relative w-[200px] h-[200px]">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            
            {/* Progress Circle with Gradient */}
            <defs>
              <linearGradient id="satisfactionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#satisfactionGradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-center"
            >
              <div className="text-white text-5xl font-bold font-['Montserrat'] mb-2">
                {value}%
              </div>
              <div 
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: `${satisfactionLevel.color}20`, color: satisfactionLevel.color }}
              >
                <SatisfactionIcon size={16} />
                {satisfactionLevel.label}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Target Info */}
      <div className="mb-6 p-4 bg-white/[0.03] rounded-lg border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Target size={20} className="text-purple-500" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Target Goal</div>
              <div className="text-white/60 text-xs">Maintain above 85%</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-lg font-bold font-['Montserrat']">85%</div>
            <div className="text-green-500 text-xs font-semibold">+2% above</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={index}
                className="text-center p-3 bg-white/[0.03] rounded-lg border border-white/5 hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div 
                  className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                  style={{ background: `${metric.color}20`, color: metric.color }}
                >
                  <Icon size={16} />
                </div>
                <div className="text-white text-lg font-bold font-['Montserrat'] mb-1">
                  {metric.value}
                </div>
                <div className="text-white/60 text-[10px] font-medium uppercase tracking-wide">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Last updated</span>
          <span className="text-white/80 font-semibold">2 hours ago</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SatisfactionGauge;
