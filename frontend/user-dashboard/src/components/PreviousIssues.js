import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, User, Tag } from 'lucide-react';
import './PreviousIssues.css';

const PreviousIssues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issues = [
    {
      id: 1,
      title: 'Healthcare Appointment Booking',
      status: 'Resolved',
      category: 'Healthcare',
      date: '2026-02-25',
      department: 'Health Services',
      description: 'Unable to book appointment through the portal',
      response: 'Issue resolved. Portal updated with new booking system.',
      timeline: [
        { date: '2026-02-25 10:30', event: 'Issue reported' },
        { date: '2026-02-25 14:15', event: 'Assigned to Health Services' },
        { date: '2026-02-26 09:00', event: 'Under investigation' },
        { date: '2026-02-27 16:45', event: 'Resolved' }
      ]
    },
    {
      id: 2,
      title: 'Legal Aid Document Submission',
      status: 'In Progress',
      category: 'Legal',
      date: '2026-02-26',
      department: 'Legal Aid Department',
      description: 'Document upload failing for legal aid application',
      response: 'Team is working on fixing the upload functionality.',
      timeline: [
        { date: '2026-02-26 11:20', event: 'Issue reported' },
        { date: '2026-02-26 15:30', event: 'Assigned to Legal Aid' },
        { date: '2026-02-27 10:00', event: 'Under investigation' }
      ]
    },
    {
      id: 3,
      title: 'Education Scholarship Query',
      status: 'Escalated',
      category: 'Education',
      date: '2026-02-24',
      department: 'Education Department',
      description: 'Scholarship application status not updating',
      response: 'Escalated to senior team for priority handling.',
      timeline: [
        { date: '2026-02-24 09:15', event: 'Issue reported' },
        { date: '2026-02-24 13:00', event: 'Assigned to Education' },
        { date: '2026-02-25 11:30', event: 'Escalated' }
      ]
    },
    {
      id: 4,
      title: 'Welfare Benefit Payment',
      status: 'Resolved',
      category: 'Welfare',
      date: '2026-02-23',
      department: 'Welfare Services',
      description: 'Delayed welfare benefit payment',
      response: 'Payment processed successfully.',
      timeline: [
        { date: '2026-02-23 08:45', event: 'Issue reported' },
        { date: '2026-02-23 12:00', event: 'Assigned to Welfare' },
        { date: '2026-02-24 16:00', event: 'Resolved' }
      ]
    }
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Escalated': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <motion.div
        className="previous-issues"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3>Previous Issues</h3>
        
        <div className="issues-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="filter-dropdown"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Resolved">Resolved</option>
            <option value="In Progress">In Progress</option>
            <option value="Escalated">Escalated</option>
          </select>
        </div>

        <div className="issues-list">
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              className="issue-card"
              onClick={() => setSelectedIssue(issue)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="issue-header">
                <h4>{issue.title}</h4>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: `${getStatusColor(issue.status)}20`, color: getStatusColor(issue.status) }}
                >
                  {issue.status}
                </span>
              </div>
              
              <div className="issue-meta">
                <span className="category-tag">{issue.category}</span>
                <span className="issue-date">{new Date(issue.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              className="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <h2>{selectedIssue.title}</h2>
                <button className="close-btn" onClick={() => setSelectedIssue(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="drawer-content">
                <div className="detail-section">
                  <div className="detail-row">
                    <Tag size={16} />
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedIssue.category}</span>
                  </div>
                  
                  <div className="detail-row">
                    <User size={16} />
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedIssue.department}</span>
                  </div>
                  
                  <div className="detail-row">
                    <Calendar size={16} />
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{new Date(selectedIssue.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="description-section">
                  <h3>Description</h3>
                  <p>{selectedIssue.description}</p>
                </div>

                <div className="response-section">
                  <h3>Response</h3>
                  <p>{selectedIssue.response}</p>
                </div>

                <div className="timeline-section">
                  <h3>Timeline</h3>
                  <div className="timeline">
                    {selectedIssue.timeline.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <span className="timeline-event">{item.event}</span>
                          <span className="timeline-date">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PreviousIssues;
