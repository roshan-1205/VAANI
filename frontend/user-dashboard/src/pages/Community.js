import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, ThumbsUp, Eye, TrendingUp, Plus } from 'lucide-react';
import './Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const discussions = [
    {
      id: 1,
      title: 'How to apply for healthcare benefits?',
      author: 'Priya Sharma',
      avatar: 'PS',
      category: 'Healthcare',
      replies: 24,
      likes: 45,
      views: 320,
      time: '2 hours ago',
      trending: true
    },
    {
      id: 2,
      title: 'Legal aid for property disputes',
      author: 'Rajesh Kumar',
      avatar: 'RK',
      category: 'Legal',
      replies: 18,
      likes: 32,
      views: 256,
      time: '5 hours ago',
      trending: true
    },
    {
      id: 3,
      title: 'Education scholarship application tips',
      author: 'Anita Desai',
      avatar: 'AD',
      category: 'Education',
      replies: 31,
      likes: 67,
      views: 412,
      time: '1 day ago',
      trending: false
    },
    {
      id: 4,
      title: 'Welfare program eligibility criteria',
      author: 'Vikram Singh',
      avatar: 'VS',
      category: 'Welfare',
      replies: 15,
      likes: 28,
      views: 189,
      time: '1 day ago',
      trending: false
    },
    {
      id: 5,
      title: 'Document verification process explained',
      author: 'Meera Patel',
      avatar: 'MP',
      category: 'General',
      replies: 42,
      likes: 89,
      views: 567,
      time: '2 days ago',
      trending: true
    }
  ];

  const categories = [
    { name: 'Healthcare', count: 156, color: '#8b5cf6' },
    { name: 'Legal', count: 98, color: '#3b82f6' },
    { name: 'Education', count: 124, color: '#10b981' },
    { name: 'Welfare', count: 87, color: '#f59e0b' },
    { name: 'General', count: 203, color: '#6b7280' }
  ];

  const filteredDiscussions = activeTab === 'trending' 
    ? discussions.filter(d => d.trending)
    : discussions;

  return (
    <div className="community-page">
      <motion.div
        className="community-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Community Forums</h1>
          <p>Connect with other users and share experiences</p>
        </div>
        
        <button className="new-discussion-btn">
          <Plus size={18} />
          New Discussion
        </button>
      </motion.div>

      <div className="community-layout">
        <div className="community-main">
          <motion.div
            className="forum-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              <TrendingUp size={18} />
              Trending
            </button>
            <button
              className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <MessageCircle size={18} />
              Recent
            </button>
          </motion.div>

          <div className="discussions-list">
            {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                className="discussion-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className="discussion-avatar">{discussion.avatar}</div>
                
                <div className="discussion-content">
                  <div className="discussion-header">
                    <h3>{discussion.title}</h3>
                    {discussion.trending && (
                      <span className="trending-badge">
                        <TrendingUp size={14} />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <div className="discussion-meta">
                    <span className="author">by {discussion.author}</span>
                    <span className="category-tag" style={{ backgroundColor: getCategoryColor(discussion.category) }}>
                      {discussion.category}
                    </span>
                    <span className="time">{discussion.time}</span>
                  </div>
                  
                  <div className="discussion-stats">
                    <span>
                      <MessageCircle size={16} />
                      {discussion.replies} replies
                    </span>
                    <span>
                      <ThumbsUp size={16} />
                      {discussion.likes} likes
                    </span>
                    <span>
                      <Eye size={16} />
                      {discussion.views} views
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="community-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="sidebar-card">
            <h3>Categories</h3>
            <div className="categories-list">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <div className="category-dot" style={{ backgroundColor: category.color }}></div>
                    <span>{category.name}</span>
                  </div>
                  <span className="category-count">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Community Stats</h3>
            <div className="stats-list">
              <div className="stat-item">
                <Users size={20} />
                <div>
                  <div className="stat-value">2,456</div>
                  <div className="stat-label">Active Members</div>
                </div>
              </div>
              <div className="stat-item">
                <MessageCircle size={20} />
                <div>
                  <div className="stat-value">668</div>
                  <div className="stat-label">Discussions</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    'Healthcare': '#8b5cf6',
    'Legal': '#3b82f6',
    'Education': '#10b981',
    'Welfare': '#f59e0b',
    'General': '#6b7280'
  };
  return colors[category] || '#6b7280';
};

export default Community;
