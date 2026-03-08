import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const IssueCategoryChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: 'Healthcare', value: 35, color: '#8b5cf6', count: 8, trend: '+12%' },
    { name: 'Legal', value: 25, color: '#3b82f6', count: 6, trend: '+8%' },
    { name: 'Education', value: 20, color: '#10b981', count: 5, trend: '+5%' },
    { name: 'Welfare', value: 20, color: '#f59e0b', count: 5, trend: '+3%' }
  ];

  const totalIssues = data.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#01070f]/98 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          <p className="font-['Poppins'] text-sm font-semibold text-white m-0 mb-2">{data.name}</p>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-['Poppins'] text-xs text-white/60 m-0">Issues</p>
              <p className="font-['Poppins'] text-lg font-bold m-0" style={{ color: data.color }}>
                {data.count}
              </p>
            </div>
            <div>
              <p className="font-['Poppins'] text-xs text-white/60 m-0">Percentage</p>
              <p className="font-['Poppins'] text-lg font-bold text-white m-0">{data.value}%</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/10">
            <TrendingUp size={12} className="text-green-400" />
            <span className="font-['Poppins'] text-xs text-green-400">{data.trend} this month</span>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 4}
          outerRadius={innerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
        />
      </g>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => (
          <motion.div
            key={`legend-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-white/10 shadow-[0_2px_8px_rgba(255,255,255,0.1)]' 
                : 'hover:bg-white/5'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-['Poppins'] text-xs text-white/80 font-medium">
              {entry.value}
            </span>
            <span className="font-['Poppins'] text-xs text-white/50">
              ({data[index].count})
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="bg-[#01070f] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-['Poppins'] text-base sm:text-lg font-semibold text-white m-0 mb-1">
            Issue Categories
          </h3>
          <p className="font-['Poppins'] text-xs text-white/50 m-0">
            Distribution across {totalIssues} issues
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Activity size={20} className="text-purple-400" />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Sector
                key={`sector-${index}`}
                fill={entry.color}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-white/10">
        <div className="text-center">
          <p className="font-['Poppins'] text-xs text-white/50 m-0 mb-1">Most Common</p>
          <p className="font-['Poppins'] text-sm font-semibold text-purple-400 m-0">
            {data[0].name}
          </p>
        </div>
        <div className="text-center">
          <p className="font-['Poppins'] text-xs text-white/50 m-0 mb-1">Avg. Growth</p>
          <p className="font-['Poppins'] text-sm font-semibold text-green-400 m-0">
            +7% / month
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCategoryChart;
