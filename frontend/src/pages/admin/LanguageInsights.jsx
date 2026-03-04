import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, TrendingUp, Users, MessageCircle, Globe, Clock, Star, Activity } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const LanguageInsights = () => {
  // Inject CSS
  useEffect(() => {
    const styleId = 'language-insights-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .language-insights-page { padding: 32px; max-width: 1400px; margin: 0 auto; background: #0a1628; min-height: 100vh; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { color: white; font-size: 32px; font-weight: 700; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .page-header p { color: rgba(255, 255, 255, 0.6); font-size: 14px; }
        .overview-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .overview-card { background: #01070f; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
        .overview-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .overview-value { color: white; font-size: 28px; font-weight: 700; font-family: 'Montserrat', sans-serif; margin-bottom: 4px; }
        .overview-label { color: rgba(255, 255, 255, 0.6); font-size: 13px; }
        .language-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px; }
        .language-chart-card { background: #01070f; padding: 24px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
        .language-chart-card h3 { color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .language-chart-card p { color: rgba(255, 255, 255, 0.5); font-size: 13px; margin-bottom: 20px; }
        .language-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .language-card { background: #01070f; padding: 24px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .language-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
        .language-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .language-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .language-growth { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; }
        .language-card h4 { color: white; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: 'Montserrat', sans-serif; }
        .language-stats { display: flex; flex-direction: column; gap: 12px; }
        .language-stat { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.7); font-size: 14px; padding: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 6px; }
        .language-stat svg { color: rgba(255, 255, 255, 0.5); flex-shrink: 0; }
        .language-stat strong { color: white; font-weight: 600; margin-left: auto; }
        @media (max-width: 1200px) { 
          .overview-stats { grid-template-columns: repeat(2, 1fr); }
          .language-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .language-insights-page { padding: 16px; }
          .overview-stats { grid-template-columns: 1fr; }
          .language-grid { grid-template-columns: 1fr; }
          .language-cards-grid { grid-template-columns: 1fr; }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  const languages = [
    { name: 'Hindi', users: 3200, calls: 8500, growth: 12, satisfaction: 94, avgTime: '1.8s', color: '#3b82f6' },
    { name: 'Bengali', users: 2400, calls: 6200, growth: 8, satisfaction: 91, avgTime: '2.1s', color: '#10b981' },
    { name: 'Tamil', users: 1800, calls: 4800, growth: 15, satisfaction: 93, avgTime: '1.9s', color: '#8b5cf6' },
    { name: 'Telugu', users: 1600, calls: 4200, growth: 10, satisfaction: 90, avgTime: '2.0s', color: '#f59e0b' },
    { name: 'Marathi', users: 1200, calls: 3100, growth: 7, satisfaction: 89, avgTime: '2.2s', color: '#ef4444' },
    { name: 'Gujarati', users: 980, calls: 2600, growth: 9, satisfaction: 92, avgTime: '2.0s', color: '#06b6d4' }
  ];

  const pieData = languages.map(lang => ({ name: lang.name, value: lang.users, color: lang.color }));

  const totalUsers = languages.reduce((sum, lang) => sum + lang.users, 0);
  const totalCalls = languages.reduce((sum, lang) => sum + lang.calls, 0);
  const avgSatisfaction = Math.round(languages.reduce((sum, lang) => sum + lang.satisfaction, 0) / languages.length);
  const totalLanguages = languages.length;

  return (
    <div className="language-insights-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Language Insights</h1>
          <p>Multi-language support analytics and performance metrics</p>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
            <Globe size={24} />
          </div>
          <div>
            <div className="overview-value">{totalLanguages}</div>
            <div className="overview-label">Languages Supported</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="overview-value">{totalUsers.toLocaleString()}</div>
            <div className="overview-label">Total Users</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
            <MessageCircle size={24} />
          </div>
          <div>
            <div className="overview-value">{totalCalls.toLocaleString()}</div>
            <div className="overview-label">Total Calls</div>
          </div>
        </motion.div>

        <motion.div
          className="overview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overview-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
            <Star size={24} />
          </div>
          <div>
            <div className="overview-value">{avgSatisfaction}%</div>
            <div className="overview-label">Avg Satisfaction</div>
          </div>
        </motion.div>
      </div>

      <div className="language-grid">
        <motion.div
          className="language-chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Usage by Language</h3>
          <p>User count and call volume comparison</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languages}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
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
              <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Users" />
              <Bar dataKey="calls" fill="#10b981" radius={[8, 8, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="language-chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>User Distribution</h3>
          <p>Percentage of users by language preference</p>
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
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
      </div>

      <div className="language-cards-grid">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="language-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
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
                <span>Users</span>
                <strong>{lang.users.toLocaleString()}</strong>
              </div>
              <div className="language-stat">
                <MessageCircle size={16} />
                <span>Calls</span>
                <strong>{lang.calls.toLocaleString()}</strong>
              </div>
              <div className="language-stat">
                <Star size={16} />
                <span>Satisfaction</span>
                <strong>{lang.satisfaction}%</strong>
              </div>
              <div className="language-stat">
                <Clock size={16} />
                <span>Avg Response</span>
                <strong>{lang.avgTime}</strong>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LanguageInsights;
