import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const StatusDistribution = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = [
    { name: 'Active Volunteers', value: 156, color: '#10b981', icon: Users, trend: '+12%', description: 'Currently active' },
    { name: 'On Leave', value: 34, color: '#f59e0b', icon: Clock, trend: '-5%', description: 'Temporary leave' },
    { name: 'Training', value: 28, color: '#3b82f6', icon: CheckCircle, trend: '+8%', description: 'In training' },
    { name: 'Pending', value: 15, color: '#ef4444', icon: AlertCircle, trend: '+3%', description: 'Awaiting approval' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ background: item.color }}
            ></div>
            <p className="text-gray-900 font-semibold text-sm">{item.name}</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
          <p className="text-xs text-gray-600 mb-2">{item.description}</p>
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: item.color }}>
            <TrendingUp size={12} />
            {item.trend}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="bg-[#01070f] p-6 rounded-xl shadow-lg border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold font-['Montserrat']">Volunteer Status Distribution</h3>
          <p className="text-white/60 text-xs mt-1">Total: {total} volunteers</p>
        </div>
        <div className="bg-white/5 px-3 py-1.5 rounded-lg">
          <span className="text-white/70 text-xs font-semibold">Live Data</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                style={{ 
                  filter: hoveredIndex === index ? 'brightness(1.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-3 mt-6">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          const Icon = item.icon;
          return (
            <motion.div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/5 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/90 text-xs font-medium truncate">{item.name}</span>
                  <span className="text-white font-bold text-sm ml-2">{item.value}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-white/60 text-xs font-semibold">{percentage}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-white/60 text-xs mb-1">Active Rate</div>
            <div className="text-white text-lg font-bold font-['Montserrat']">
              {((data[0].value / total) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-white/60 text-xs mb-1">Avg Response</div>
            <div className="text-white text-lg font-bold font-['Montserrat']">4.2m</div>
          </div>
          <div className="text-center">
            <div className="text-white/60 text-xs mb-1">Satisfaction</div>
            <div className="text-white text-lg font-bold font-['Montserrat']">94%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusDistribution;
