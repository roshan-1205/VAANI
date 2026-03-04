import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Phone, Clock, Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const performanceData = [
    { month: 'Jan', calls: 4200, resolved: 3800, avgTime: 2.1, users: 1200 },
    { month: 'Feb', calls: 4800, resolved: 4400, avgTime: 1.9, users: 1350 },
    { month: 'Mar', calls: 5200, resolved: 4900, avgTime: 1.8, users: 1480 },
    { month: 'Apr', calls: 5800, resolved: 5500, avgTime: 1.7, users: 1620 },
    { month: 'May', calls: 6200, resolved: 5900, avgTime: 1.6, users: 1780 },
    { month: 'Jun', calls: 6800, resolved: 6500, avgTime: 1.5, users: 1950 }
  ];

  const categoryPerformance = [
    { category: 'Healthcare', satisfaction: 92, volume: 2400, growth: 12 },
    { category: 'Education', satisfaction: 88, volume: 2100, growth: 8 },
    { category: 'Legal Aid', satisfaction: 85, volume: 1800, growth: 15 },
    { category: 'Welfare', satisfaction: 90, volume: 2000, growth: 10 }
  ];

  const languageDistribution = [
    { name: 'Hindi', value: 35, color: '#3b82f6' },
    { name: 'English', value: 25, color: '#10b981' },
    { name: 'Tamil', value: 15, color: '#8b5cf6' },
    { name: 'Telugu', value: 12, color: '#f59e0b' },
    { name: 'Bengali', value: 8, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#06b6d4' }
  ];

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    calls: Math.floor(Math.random() * 100) + 20
  }));

  const metrics = [
    { icon: TrendingUp, label: 'Growth Rate', value: '+24.5%', change: '+3.2%', trend: 'up', color: '#10b981' },
    { icon: Users, label: 'Total Users', value: '12,847', change: '+1,234', trend: 'up', color: '#3b82f6' },
    { icon: Phone, label: 'Total Calls', value: '34,521', change: '+2,456', trend: 'up', color: '#8b5cf6' },
    { icon: Clock, label: 'Avg Resolution', value: '1.6s', change: '-0.3s', trend: 'down', color: '#f59e0b' }
  ];

  const handleExport = (format) => {
    console.log(`Exporting analytics as ${format}`);
    setShowExportMenu(false);
  };

  return (
    <div className="analytics-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Analytics</h1>
          <p>Comprehensive performance metrics and insights</p>
        </div>
        <div className="header-actions">
          <div className="time-range-selector">
            <Calendar size={18} />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          <div className="export-dropdown">
            <button 
              className="btn-export"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download size={18} />
              Export
            </button>
            {showExportMenu && (
              <div className="export-menu">
                <button onClick={() => handleExport('pdf')}>Export as PDF</button>
                <button onClick={() => handleExport('csv')}>Export as CSV</button>
                <button onClick={() => handleExport('excel')}>Export as Excel</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="analytics-metrics">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="analytics-metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="metric-icon" style={{ background: `${metric.color}20`, color: metric.color }}>
              <metric.icon size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
              <span className={`metric-trend ${metric.trend}`}>
                {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="analytics-grid">
        <motion.div
          className="analytics-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Performance Trends</h3>
            <span className="card-subtitle">Monthly call volume and resolution rates</span>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: '#01070f', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="calls" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCalls)" name="Total Calls" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3>Category Performance</h3>
            <span className="card-subtitle">Satisfaction & growth by category</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: '#01070f', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Legend />
              <Bar dataKey="satisfaction" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Satisfaction %" />
              <Bar dataKey="growth" fill="#10b981" radius={[8, 8, 0, 0]} name="Growth %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h3>Language Distribution</h3>
            <span className="card-subtitle">User language preferences</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={languageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {languageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#01070f', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="card-header">
            <h3>24-Hour Activity Pattern</h3>
            <span className="card-subtitle">Call volume throughout the day</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" interval={3} />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: '#01070f', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Line type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} name="Calls" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;


// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
.analytics-page { padding: 32px; background: #0a1628; min-height: calc(100vh - 80px); }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
.page-header h1 { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 8px 0; }
.page-header p { font-family: 'Poppins', sans-serif; font-size: 14px; color: rgba(255, 255, 255, 0.6); margin: 0; }
.header-actions { display: flex; gap: 12px; align-items: center; }
.time-range-selector { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; }
.time-range-selector select { background: transparent; border: none; outline: none; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; cursor: pointer; }
.time-range-selector select option { background: #01070f; }
.export-dropdown { position: relative; }
.btn-export { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #10b981; border: none; border-radius: 10px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.btn-export:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3); }
.export-menu { position: absolute; top: calc(100% + 8px); right: 0; background: #01070f; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 8px; min-width: 180px; z-index: 100; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
.export-menu button { width: 100%; padding: 10px 12px; background: transparent; border: none; border-radius: 8px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; text-align: left; cursor: pointer; transition: all 0.2s ease; }
.export-menu button:hover { background: rgba(255, 255, 255, 0.05); }

.analytics-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
@media (max-width: 1200px) { .analytics-metrics { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .analytics-metrics { grid-template-columns: 1fr; } }
.analytics-metric-card { background: #01070f; padding: 24px; border-radius: 16px; display: flex; gap: 16px; align-items: flex-start; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
.analytics-metric-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); }
.metric-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.metric-info { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.metric-label { color: rgba(255, 255, 255, 0.6); font-size: 13px; font-family: 'Poppins', sans-serif; font-weight: 500; }
.metric-value { color: white; font-size: 28px; font-weight: 700; font-family: 'Montserrat', sans-serif; line-height: 1; }
.metric-trend { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; font-family: 'Poppins', sans-serif; }
.metric-trend.up { color: #10b981; }
.metric-trend.down { color: #10b981; }

.analytics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (max-width: 1024px) { .analytics-grid { grid-template-columns: 1fr; } }
.analytics-card { background: #01070f; padding: 28px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); }
.analytics-card.full-width { grid-column: 1 / -1; }
.card-header { margin-bottom: 24px; }
.card-header h3 { color: white; font-size: 20px; font-weight: 600; font-family: 'Montserrat', sans-serif; margin: 0 0 6px 0; }
.card-subtitle { color: rgba(255, 255, 255, 0.5); font-size: 13px; font-family: 'Poppins', sans-serif; }

@media (max-width: 768px) {
  .analytics-page { padding: 16px; }
  .page-header { flex-direction: column; align-items: flex-start; }
  .header-actions { width: 100%; flex-direction: column; }
  .time-range-selector, .btn-export { width: 100%; justify-content: center; }
}
`;
if (!document.getElementById('analytics-styles')) {
  styleSheet.id = 'analytics-styles';
  document.head.appendChild(styleSheet);
}
