import React from 'react';
import { Users, Phone, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const KPICards = () => {
  const kpis = [
    { icon: Users, label: 'Active Users', value: 1284, trend: '+12.5%', color: '#3b82f6' },
    { icon: Phone, label: 'Calls Today', value: 534, trend: '+8.2%', color: '#8b5cf6' },
    { icon: Clock, label: 'Avg Response Time', value: '1.8s', trend: '-0.3s', color: '#06b6d4', isNegative: true },
    { icon: CheckCircle, label: 'Success Rate', value: '94.8%', trend: '+2.1%', color: '#10b981' }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-xl:gap-5 max-md:gap-4 max-sm:grid-cols-1">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          className="bg-dark p-6 max-md:p-5 max-sm:p-4 rounded-xl flex gap-4 max-sm:gap-3 items-start shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div 
            className="w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{ background: `${kpi.color}20`, color: kpi.color }}
          >
            <kpi.icon size={24} className="max-sm:w-5 max-sm:h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-white/60 text-[13px] max-sm:text-xs font-medium mb-2 max-sm:mb-1">{kpi.label}</div>
            <div className="text-white text-[28px] max-md:text-2xl max-sm:text-xl font-bold font-display mb-1">{kpi.value}</div>
            <div className={`text-success text-xs max-sm:text-[11px] font-semibold ${kpi.isNegative ? 'text-success' : ''}`}>
              {kpi.trend}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
