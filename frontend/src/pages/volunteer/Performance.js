import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Star, Calendar, BarChart3, Clock, CheckCircle } from 'lucide-react';

const Performance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .performance-container {
        padding: 32px;
        max-width: 1400px;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
      }

      .performance-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .performance-header h1 {
        color: #01070f;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      .performance-header p {
        color: #6b7280;
        font-size: 14px;
      }

      .period-selector {
        display: flex;
        gap: 8px;
        background: #01070f;
        padding: 6px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .period-btn {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }

      .period-btn.active {
        background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
        color: white;
      }

      .period-btn:not(.active) {
        background: transparent;
        color: rgba(255, 255, 255, 0.6);
      }

      .period-btn:not(.active):hover {
        color: white;
      }

      .metrics-grid-perf {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }

      .metric-card-perf {
        background: #01070f;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .metric-card-perf:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
      }

      .metric-icon-perf {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .metric-content-perf {
        flex: 1;
      }

      .metric-label-perf {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        margin-bottom: 8px;
      }

      .metric-value-perf {
        font-size: 32px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
      }

      .performance-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        margin-bottom: 24px;
      }

      .chart-card {
        background: #01070f;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .chart-card h2 {
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 24px;
        font-family: 'Montserrat', sans-serif;
      }

      .activity-timeline-perf {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .timeline-item {
        display: flex;
        gap: 16px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border-left: 3px solid;
        transition: all 0.3s ease;
      }

      .timeline-item:hover {
        background: rgba(255, 255, 255, 0.06);
        transform: translateX(4px);
      }

      .timeline-item.completed {
        border-left-color: #10b981;
      }

      .timeline-item.progress {
        border-left-color: #f59e0b;
      }

      .timeline-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .timeline-icon.completed {
        background: rgba(16, 185, 129, 0.15);
        color: #10b981;
      }

      .timeline-icon.progress {
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
      }

      .timeline-content {
        flex: 1;
      }

      .timeline-title {
        color: white;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .timeline-time {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }

      .achievements-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .achievement-card {
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
      }

      .achievement-card:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .achievement-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .achievement-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
        color: white;
      }

      .achievement-info h3 {
        color: white;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .achievement-info p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
      }

      .achievement-badge {
        padding: 4px 12px;
        background: rgba(16, 185, 129, 0.15);
        border-radius: 12px;
        color: #10b981;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      @media (max-width: 1200px) {
        .metrics-grid-perf {
          grid-template-columns: repeat(2, 1fr);
        }

        .performance-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .performance-container {
          padding: 16px;
        }

        .metrics-grid-perf {
          grid-template-columns: 1fr;
        }

        .performance-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const metrics = [
    { icon: TrendingUp, label: 'Tasks Completed', value: '142', color: '#10b981' },
    { icon: Award, label: 'Achievements', value: '8', color: '#f59e0b' },
    { icon: Target, label: 'Goals Met', value: '12/15', color: '#3b82f6' },
    { icon: Star, label: 'Average Rating', value: '4.8', color: '#8b5cf6' }
  ];

  const recentActivity = [
    { id: 1, title: 'Completed Healthcare Support Call', time: '2 hours ago', type: 'completed', icon: CheckCircle },
    { id: 2, title: 'Training Module in Progress', time: '5 hours ago', type: 'progress', icon: Clock },
    { id: 3, title: 'Submitted Monthly Report', time: '1 day ago', type: 'completed', icon: CheckCircle },
    { id: 4, title: 'Attended Team Meeting', time: '2 days ago', type: 'completed', icon: CheckCircle }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Completed 100+ tasks', status: 'Earned' },
    { title: 'Quick Responder', description: 'Average response time < 5 min', status: 'Earned' },
    { title: 'Team Player', description: 'Helped 50+ volunteers', status: 'In Progress' }
  ];

  return (
    <div className="performance-container">
      <motion.div
        className="performance-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Performance</h1>
          <p>Track your performance metrics and achievements</p>
        </div>
        <div className="period-selector">
          <button 
            className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('year')}
          >
            Year
          </button>
        </div>
      </motion.div>

      <div className="metrics-grid-perf">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="metric-card-perf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="metric-icon-perf" style={{ background: `${metric.color}20`, color: metric.color }}>
              <metric.icon size={28} />
            </div>
            <div className="metric-content-perf">
              <div className="metric-label-perf">{metric.label}</div>
              <div className="metric-value-perf" style={{ color: metric.color }}>{metric.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="performance-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Recent Activity</h2>
          <div className="activity-timeline-perf">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                className={`timeline-item ${activity.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={`timeline-icon ${activity.type}`}>
                  <activity.icon size={20} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">{activity.title}</div>
                  <div className="timeline-time">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="achievement-header">
                  <div className="achievement-icon">
                    <Award size={24} />
                  </div>
                  <div className="achievement-info" style={{ flex: 1 }}>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                  <div className="achievement-badge">{achievement.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Performance;
