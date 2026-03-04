import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useVolunteer } from '../../context/VolunteerContext';

const KPICards = () => {
  const { volunteerData } = useVolunteer();
  
  const kpis = [
    { label: 'Engagement Rate', value: `${volunteerData.engagementRate}%`, trend: '+5%', isPositive: true, color: '#10b981' },
    { label: 'Volunteer Retention', value: `${volunteerData.trainingCompletion}%`, trend: '-3%', isPositive: false, color: '#ef4444' },
    { label: 'Training Completion', value: `${volunteerData.taskCompletion}%`, trend: '+8%', isPositive: true, color: '#10b981' },
    { label: 'Feedback Score', value: volunteerData.feedbackScore, trend: '-0.2', isPositive: false, color: '#ef4444' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          className="bg-[#01070f] p-6 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/60 text-[13px] font-medium">{kpi.label}</span>
            <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {kpi.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {kpi.trend}
            </div>
          </div>
          <div className="text-4xl font-bold font-['Montserrat']" style={{ color: kpi.color }}>
            {kpi.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
