import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, Filter, Download } from 'lucide-react';
import './MyActivity.css';

const MyActivity = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const activities = [
    {
      id: 1,
      title: 'Healthcare Appointment Booking',
      category: 'Healthcare',
      status: 'Completed',
      date: '2026-02-27',
      time: '16:45',
      description: 'Successfully booked appointment at City Hospital',
      duration: '2 days'
    },
    {
      id: 2,
      title: 'Legal Aid Document Submission',
      category: 'Legal',
      status: 'In Progress',
      date: '2026-02-27',
      time: '10:00',
      description: 'Document verification in progress',
      duration: '1 day'
    },
    {
      id: 3,
      title: 'Education Scholarship Application',
      category: 'Education',
      status: 'Pending',
      date: '2026-02-26',
      time: '14:30',
      description: 'Application submitted, awaiting review',
      duration: '2 days'
    },
    {
      id: 4,
      title: 'Welfare Benefit Inquiry',
      category: 'Welfare',
      status: 'Completed',
      date: '2026-02-25',
      time: '11:20',
      description: 'Query resolved successfully',
      duration: '1 day'
    },
    {
      id: 5,
      title: 'Property Tax Payment',
      category: 'Legal',
      status: 'Failed',
      date: '2026-02-24',
      time: '09:15',
      description: 'Payment gateway error - retry required',
      duration: '4 days'
    },
    {
      id: 6,
      title: 'Medical Records Request',
      category: 'Healthcare',
      status: 'Completed',
      date: '2026-02-23',
      time: '15:00',
      description: 'Records downloaded successfully',
      duration: '5 days'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle size={20} />;
      case 'In Progress': return <Clock size={20} />;
      case 'Pending': return <AlertCircle size={20} />;
      case 'Failed': return <XCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Pending': return '#f59e0b';
      case 'Failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Healthcare': return '#8b5cf6';
      case 'Legal': return '#3b82f6';
      case 'Education': return '#10b981';
      case 'Welfare': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || activity.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const stats = [
    { label: 'Total Activities', value: activities.length, color: '#8b5cf6' },
    { label: 'Completed', value: activities.filter(a => a.status === 'Completed').length, color: '#10b981' },
    { label: 'In Progress', value: activities.filter(a => a.status === 'In Progress').length, color: '#3b82f6' },
    { label: 'Pending', value: activities.filter(a => a.status === 'Pending').length, color: '#f59e0b' }
  ];

  return (
    <div className="my-activity-page">
      <motion.div
        className="activity-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>My Activity</h1>
          <p>Track all your interactions and service requests</p>
        </div>
        <button className="export-btn">
          <Download size={18} />
          Export Report
        </button>
      </motion.div>

      <div className="activity-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="activity-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Legal">Legal</option>
            <option value="Education">Education</option>
            <option value="Welfare">Welfare</option>
          </select>
        </div>
      </motion.div>

      <div className="activity-timeline">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <div className="activity-icon" style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}>
              {getStatusIcon(activity.status)}
            </div>
            
            <div className="activity-content">
              <div className="activity-top">
                <h3>{activity.title}</h3>
                <span className="activity-duration">{activity.duration} ago</span>
              </div>
              
              <p className="activity-description">{activity.description}</p>
              
              <div className="activity-meta">
                <span className="category-badge" style={{ backgroundColor: `${getCategoryColor(activity.category)}20`, color: getCategoryColor(activity.category) }}>
                  {activity.category}
                </span>
                <span className="status-badge" style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}>
                  {activity.status}
                </span>
                <span className="activity-time">
                  <Calendar size={14} />
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                <span className="activity-time">
                  <Clock size={14} />
                  {activity.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyActivity;
