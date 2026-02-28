import React from 'react';
import { motion } from 'framer-motion';
import { Languages, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LanguageInsights.css';

const LanguageInsights = () => {
  const languages = [
    { name: 'Hindi', users: 3200, calls: 8500, growth: 12, color: '#3b82f6' },
    { name: 'Bengali', users: 2400, calls: 6200, growth: 8, color: '#10b981' },
    { name: 'Tamil', users: 1800, calls: 4800, growth: 15, color: '#8b5cf6' },
    { name: 'Telugu', users: 1600, calls: 4200, growth: 10, color: '#f59e0b' },
    { name: 'Marathi', users: 1200, calls: 3100, growth: 7, color: '#ef4444' },
    { name: 'Gujarati', users: 980, calls: 2600, growth: 9, color: '#06b6d4' }
  ];

  const pieData = languages.map(lang => ({ name: lang.name, value: lang.users, color: lang.color }));

  return (
    <div className="language-insights-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Language Insights</h1>
          <p>Multi-language support analytics</p>
        </div>
      </motion.div>

      <div className="language-grid">
        <motion.div
          className="language-chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Usage by Language</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languages}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="calls" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="language-chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#01070f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="language-cards-grid">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="language-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="language-card-header">
              <div className="language-icon" style={{ background: `${lang.color}20`, color: lang.color }}>
                <Languages size={24} />
              </div>
              <div className="language-growth" style={{ color: lang.color }}>
                <TrendingUp size={14} />
                +{lang.growth}%
              </div>
            </div>
            
            <h4>{lang.name}</h4>
            
            <div className="language-stats">
              <div className="language-stat">
                <Users size={16} />
                <span>{lang.users.toLocaleString()} users</span>
              </div>
              <div className="language-stat">
                <MessageCircle size={16} />
                <span>{lang.calls.toLocaleString()} calls</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LanguageInsights;
