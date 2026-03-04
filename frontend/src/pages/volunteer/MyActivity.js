import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Phone, MessageSquare, Users, TrendingUp, Award, Target } from 'lucide-react';

const MyActivity = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .my-activity-container {
        padding: 32px;
        max-width: 1400px;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
      }

      .my-activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .my-activity-header h1 {
        color: #01070f;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      .my-activity-header p {
        color: #6b7280;
        font-size: 14px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }

      .stat-card {
        background: #01070f;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
      }

      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
      }

      .stat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon.blue {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
      }

      .stat-icon.green {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }

      .stat-icon.purple {
        background: rgba(168, 85, 247, 0.2);
        color: #a855f7;
      }

      .stat-icon.amber {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
      }

      .stat-trend {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 12px;
        background: rgba(16, 185, 129, 0.15);
        color: #10b981;
      }

      .stat-value {
        color: white;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      .stat-label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        margin-bottom: 24px;
      }

      .activity-timeline {
        background: #01070f;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .timeline-header h2 {
        color: white;
        font-size: 20px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
      }

      .filter-buttons {
        display: flex;
        gap: 8px;
      }

      .filter-btn {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .filter-btn.active {
        background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
        color: white;
        border-color: transparent;
      }

      .filter-btn:not(.active) {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.6);
      }

      .filter-btn:not(.active):hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-height: 600px;
        overflow-y: auto;
        padding-right: 8px;
      }

      .activity-list::-webkit-scrollbar {
        width: 6px;
      }

      .activity-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
      }

      .activity-list::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }

      .activity-item {
        display: flex;
        gap: 16px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border-left: 3px solid;
        transition: all 0.3s ease;
      }

      .activity-item:hover {
        background: rgba(255, 255, 255, 0.06);
        transform: translateX(4px);
      }

      .activity-item.completed {
        border-left-color: #10b981;
      }

      .activity-item.call {
        border-left-color: #3b82f6;
      }

      .activity-item.progress {
        border-left-color: #f59e0b;
      }

      .activity-icon-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .activity-icon-wrapper.completed {
        background: rgba(16, 185, 129, 0.15);
        color: #10b981;
      }

      .activity-icon-wrapper.call {
        background: rgba(59, 130, 246, 0.15);
        color: #3b82f6;
      }

      .activity-icon-wrapper.progress {
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
      }

      .activity-details {
        flex: 1;
      }

      .activity-title {
        color: white;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .activity-description {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        margin-bottom: 8px;
      }

      .activity-meta {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .activity-time {
        display: flex;
        align-items: center;
        gap: 4px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }

      .activity-category {
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 11px;
        font-weight: 600;
      }

      .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .achievements-card {
        background: #01070f;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .achievements-card h2 {
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
        font-family: 'Montserrat', sans-serif;
      }

      .achievement-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .achievement-item {
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
      }

      .achievement-item:hover {
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

      .achievement-progress {
        margin-top: 12px;
      }

      .progress-bar {
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%);
        border-radius: 3px;
        transition: width 0.5s ease;
      }

      .progress-text {
        display: flex;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
      }

      .performance-card {
        background: #01070f;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .performance-card h2 {
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
        font-family: 'Montserrat', sans-serif;
      }

      .performance-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .performance-item {
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .performance-label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }

      .performance-value {
        color: white;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
      }

      @media (max-width: 1200px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .content-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .my-activity-container {
          padding: 16px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }

        .filter-buttons {
          flex-wrap: wrap;
        }

        .performance-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const stats = [
    { label: 'Total Calls', value: '156', trend: '+12%', icon: Phone, color: 'blue' },
    { label: 'Tasks Completed', value: '89', trend: '+8%', icon: CheckCircle, color: 'green' },
    { label: 'Messages Sent', value: '234', trend: '+15%', icon: MessageSquare, color: 'purple' },
    { label: 'People Helped', value: '142', trend: '+10%', icon: Users, color: 'amber' }
  ];

  const activities = [
    { id: 1, type: 'completed', icon: CheckCircle, title: 'Healthcare Support Call', description: 'Assisted patient with medical consultation', time: '2 hours ago', category: 'Healthcare' },
    { id: 2, type: 'call', icon: Phone, title: 'Education Inquiry Call', description: 'Helped student with scholarship information', time: '4 hours ago', category: 'Education' },
    { id: 3, type: 'completed', icon: CheckCircle, title: 'Legal Aid Documentation', description: 'Completed document verification', time: '6 hours ago', category: 'Legal Aid' },
    { id: 4, type: 'progress', icon: Clock, title: 'Welfare Program Registration', description: 'In progress - pension scheme application', time: '8 hours ago', category: 'Welfare' },
    { id: 5, type: 'call', icon: Phone, title: 'Healthcare Emergency Call', description: 'Provided emergency medical guidance', time: '1 day ago', category: 'Healthcare' },
    { id: 6, type: 'completed', icon: CheckCircle, title: 'Training Module Completed', description: 'Finished Communication Skills training', time: '1 day ago', category: 'Training' },
    { id: 7, type: 'call', icon: Phone, title: 'Legal Consultation Call', description: 'Assisted with legal document queries', time: '2 days ago', category: 'Legal Aid' },
    { id: 8, type: 'completed', icon: CheckCircle, title: 'Community Outreach', description: 'Participated in community awareness program', time: '2 days ago', category: 'Community' }
  ];

  const achievements = [
    { title: 'First 100 Calls', description: 'Complete 100 support calls', current: 156, target: 100, completed: true },
    { title: 'Master Communicator', description: 'Send 200 messages', current: 234, target: 200, completed: true },
    { title: 'Helper Hero', description: 'Help 150 people', current: 142, target: 150, completed: false },
    { title: 'Training Champion', description: 'Complete 5 training modules', current: 3, target: 5, completed: false }
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeFilter);

  return (
    <div className="my-activity-container">
      <div className="my-activity-header">
        <div>
          <h1>My Activity</h1>
          <p>Track your volunteer activities and achievements</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
          >
            <div className="stat-card-header">
              <div className={`stat-icon ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="stat-trend">
                <TrendingUp size={14} />
                {stat.trend}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Activity Timeline */}
        <div className="activity-timeline">
          <div className="timeline-header">
            <h2>Recent Activity</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveFilter('completed')}
              >
                Completed
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'call' ? 'active' : ''}`}
                onClick={() => setActiveFilter('call')}
              >
                Calls
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'progress' ? 'active' : ''}`}
                onClick={() => setActiveFilter('progress')}
              >
                In Progress
              </button>
            </div>
          </div>

          <div className="activity-list">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`activity-item ${activity.type}`}
              >
                <div className={`activity-icon-wrapper ${activity.type}`}>
                  <activity.icon size={20} />
                </div>
                <div className="activity-details">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
                  <div className="activity-meta">
                    <div className="activity-time">
                      <Clock size={12} />
                      {activity.time}
                    </div>
                    <div className="activity-category">{activity.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-section">
          {/* Achievements */}
          <div className="achievements-card">
            <h2>Achievements</h2>
            <div className="achievement-list">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="achievement-item"
                >
                  <div className="achievement-header">
                    <div className="achievement-icon">
                      {achievement.completed ? <Award size={24} /> : <Target size={24} />}
                    </div>
                    <div className="achievement-info">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min((achievement.current / achievement.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      <span>{achievement.current} / {achievement.target}</span>
                      <span>{Math.round((achievement.current / achievement.target) * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="performance-card">
            <h2>This Week</h2>
            <div className="performance-grid">
              <div className="performance-item">
                <div className="performance-label">Calls Made</div>
                <div className="performance-value">24</div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Avg Duration</div>
                <div className="performance-value">8m</div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Tasks Done</div>
                <div className="performance-value">12</div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Rating</div>
                <div className="performance-value">4.8★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
