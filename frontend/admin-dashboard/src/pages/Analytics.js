import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Phone, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', calls: 4200, resolved: 3800, avgTime: 2.1 },
    { month: 'Feb', calls: 4800, resolved: 4400, avgTime: 1.9 },
    { month: 'Mar', calls: 5200, resolved: 4900, avgTime: 1.8 },
    { month: 'Apr', calls: 5800, resolved: 5500, avgTime: 1.7 },
    { month: 'May', calls: 6200, resolved: 5900, avgTime: 1.6 },
    { month: 'Jun', calls: 6800, resolved: 6500, avgTime: 1.5 }
  ];

  const categoryPerformance = [
    { category: 'Healthcare', satisfaction: 92, volume: 2400, growth: 12 },
    { category: 'Education', satisfaction: 88, volume: 2100, growth: 8 },
    { category: 'Legal Aid', satisfaction: 85, volume: 1800, growth: 15 },
    { category: 'Welfare', satisfaction: 90, volume: 2000, growth: 10 }
  ];

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    calls: Math.floor(Math.random() * 100) + 20
  }));

  const metrics = [
    { icon: TrendingUp, label: 'Growth Rate', value: '+24.5%', trend: 'up', color: '#10b981' },
    { icon: Users, label: 'Total Users', value: '12,847', trend: 'up', color: '#3b82f6' },
    { icon: Phone, label: 'Total Calls', value: '34,521', trend: 'up', color: '#8b5cf6' },
    { icon: Clock, label: 'Avg Resolution', value: '1.6s', trend: 'down', color: '#f59e0b' }
  ];

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
                {metric.trend === 'up' ? 'Increasing' : 'Improving'}
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
          <h3>Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
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
              <Tooltip contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="calls" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCalls)" />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="satisfaction" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="growth" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>24-Hour Activity Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" interval={3} />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
