import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Filter, Trash2, Archive, Star } from 'lucide-react';

const Messages = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .messages-container {
        padding: 16px;
        max-width: 1400px;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
      }

      @media (min-width: 640px) {
        .messages-container {
          padding: 24px;
        }
      }

      @media (min-width: 1024px) {
        .messages-container {
          padding: 32px;
        }
      }

      .messages-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      @media (min-width: 640px) {
        .messages-header {
          margin-bottom: 28px;
        }
      }

      @media (min-width: 1024px) {
        .messages-header {
          margin-bottom: 32px;
        }
      }

      .messages-header h1 {
        color: #01070f;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 4px;
        font-family: 'Montserrat', sans-serif;
      }

      @media (min-width: 640px) {
        .messages-header h1 {
          font-size: 28px;
          margin-bottom: 6px;
        }
      }

      @media (min-width: 1024px) {
        .messages-header h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }
      }

      .messages-header p {
        color: #6b7280;
        font-size: 12px;
      }

      @media (min-width: 640px) {
        .messages-header p {
          font-size: 13px;
        }
      }

      @media (min-width: 1024px) {
        .messages-header p {
          font-size: 14px;
        }
      }

      .messages-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 20px;
      }

      @media (min-width: 640px) {
        .messages-stats {
          gap: 16px;
          margin-bottom: 24px;
        }
      }

      @media (min-width: 768px) {
        .messages-stats {
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
      }

      @media (min-width: 1024px) {
        .messages-stats {
          gap: 24px;
          margin-bottom: 32px;
        }
      }

      .stat-card-msg {
        background: #01070f;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
      }

      @media (min-width: 640px) {
        .stat-card-msg {
          padding: 20px;
          border-radius: 14px;
        }
      }

      @media (min-width: 1024px) {
        .stat-card-msg {
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
      }

      .stat-card-msg:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
      }

      .stat-card-msg .stat-value {
        color: white;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 6px;
        font-family: 'Montserrat', sans-serif;
      }

      @media (min-width: 640px) {
        .stat-card-msg .stat-value {
          font-size: 32px;
          margin-bottom: 7px;
        }
      }

      @media (min-width: 1024px) {
        .stat-card-msg .stat-value {
          font-size: 36px;
          margin-bottom: 8px;
        }
      }

      .stat-card-msg .stat-label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      @media (min-width: 640px) {
        .stat-card-msg .stat-label {
          font-size: 12px;
        }
      }

      @media (min-width: 1024px) {
        .stat-card-msg .stat-label {
          font-size: 13px;
        }
      }

      .messages-controls {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        flex-direction: column;
        align-items: stretch;
      }

      @media (min-width: 640px) {
        .messages-controls {
          gap: 14px;
          margin-bottom: 22px;
        }
      }

      @media (min-width: 768px) {
        .messages-controls {
          flex-direction: row;
          align-items: center;
        }
      }

      @media (min-width: 1024px) {
        .messages-controls {
          gap: 16px;
          margin-bottom: 24px;
        }
      }

      .search-box {
        flex: 1;
        min-width: 100%;
        position: relative;
        display: flex;
        align-items: center;
      }

      @media (min-width: 768px) {
        .search-box {
          min-width: 300px;
        }
      }

      .search-icon {
        position: absolute;
        left: 14px;
        color: #9ca3af;
        pointer-events: none;
        z-index: 1;
      }

      @media (min-width: 640px) {
        .search-icon {
          left: 16px;
        }
      }

      .search-input {
        width: 100%;
        padding: 12px 14px 12px 42px;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        color: #01070f;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s ease;
        outline: none;
      }

      @media (min-width: 640px) {
        .search-input {
          padding: 13px 16px 13px 46px;
          border-radius: 11px;
        }
      }

      @media (min-width: 1024px) {
        .search-input {
          padding: 14px 16px 14px 48px;
          border-radius: 12px;
          font-size: 14px;
        }
      }

      .search-input::placeholder {
        color: #9ca3af;
      }

      .search-input:focus {
        border-color: #10b981;
        background: white;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
      }

      .filter-buttons-msg {
        display: flex;
        gap: 6px;
        background: #f9fafb;
        padding: 5px;
        border-radius: 10px;
        border: 2px solid #e5e7eb;
        flex-wrap: wrap;
        justify-content: center;
      }

      @media (min-width: 640px) {
        .filter-buttons-msg {
          gap: 7px;
          padding: 5.5px;
          border-radius: 11px;
        }
      }

      @media (min-width: 768px) {
        .filter-buttons-msg {
          flex-wrap: nowrap;
        }
      }

      @media (min-width: 1024px) {
        .filter-buttons-msg {
          gap: 8px;
          padding: 6px;
          border-radius: 12px;
        }
      }

      .filter-btn-msg {
        padding: 8px 16px;
        border-radius: 7px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        background: transparent;
        color: #6b7280;
        white-space: nowrap;
      }

      @media (min-width: 640px) {
        .filter-btn-msg {
          padding: 9px 18px;
          border-radius: 7.5px;
        }
      }

      @media (min-width: 1024px) {
        .filter-btn-msg {
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
        }
      }

      .filter-btn-msg.active {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        transform: translateY(-1px);
      }

      .filter-btn-msg:not(.active):hover {
        background: white;
        color: #01070f;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .messages-card {
        background: #01070f;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      @media (min-width: 640px) {
        .messages-card {
          border-radius: 14px;
          padding: 20px;
        }
      }

      @media (min-width: 1024px) {
        .messages-card {
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
      }

      .messages-list-new {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      @media (min-width: 640px) {
        .messages-list-new {
          gap: 11px;
        }
      }

      @media (min-width: 1024px) {
        .messages-list-new {
          gap: 12px;
        }
      }

      .message-item-new {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 10px;
        border-left: 3px solid #3b82f6;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      @media (min-width: 640px) {
        .message-item-new {
          gap: 14px;
          padding: 18px;
          border-radius: 11px;
        }
      }

      @media (min-width: 1024px) {
        .message-item-new {
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
        }
      }

      .message-item-new.unread {
        border-left-color: #10b981;
        background: rgba(16, 185, 129, 0.05);
      }

      .message-item-new:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateX(4px);
      }

      .message-icon-new {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      @media (min-width: 640px) {
        .message-icon-new {
          width: 44px;
          height: 44px;
          border-radius: 11px;
        }
      }

      @media (min-width: 1024px) {
        .message-icon-new {
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }
      }

      .message-content-new {
        flex: 1;
        min-width: 0;
      }

      .message-header-new {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 6px;
        gap: 8px;
      }

      @media (min-width: 640px) {
        .message-header-new {
          margin-bottom: 7px;
          align-items: center;
        }
      }

      @media (min-width: 1024px) {
        .message-header-new {
          margin-bottom: 8px;
        }
      }

      .message-from-new {
        color: white;
        font-size: 14px;
        font-weight: 600;
        word-break: break-word;
      }

      @media (min-width: 640px) {
        .message-from-new {
          font-size: 14.5px;
        }
      }

      @media (min-width: 1024px) {
        .message-from-new {
          font-size: 15px;
        }
      }

      .message-time-new {
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
        white-space: nowrap;
      }

      @media (min-width: 640px) {
        .message-time-new {
          font-size: 11.5px;
        }
      }

      @media (min-width: 1024px) {
        .message-time-new {
          font-size: 12px;
        }
      }

      .message-subject-new {
        color: rgba(255, 255, 255, 0.7);
        font-size: 13px;
        margin-bottom: 6px;
        word-break: break-word;
      }

      @media (min-width: 640px) {
        .message-subject-new {
          font-size: 13.5px;
          margin-bottom: 7px;
        }
      }

      @media (min-width: 1024px) {
        .message-subject-new {
          font-size: 14px;
          margin-bottom: 8px;
        }
      }

      .message-preview {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        line-height: 1.5;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @media (min-width: 640px) {
        .message-preview {
          font-size: 12.5px;
        }
      }

      @media (min-width: 1024px) {
        .message-preview {
          font-size: 13px;
          -webkit-line-clamp: 3;
        }
      }

      .message-actions {
        display: flex;
        gap: 6px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      @media (min-width: 640px) {
        .message-actions {
          gap: 7px;
          margin-top: 11px;
        }
      }

      @media (min-width: 1024px) {
        .message-actions {
          gap: 8px;
          margin-top: 12px;
        }
      }

      .action-btn {
        padding: 5px 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 7px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
      }

      @media (min-width: 640px) {
        .action-btn {
          padding: 5.5px 11px;
          border-radius: 7.5px;
          font-size: 11.5px;
          gap: 5.5px;
        }
      }

      @media (min-width: 1024px) {
        .action-btn {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          gap: 6px;
        }
      }

      .action-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const messages = [
    { id: 1, from: 'Admin Team', subject: 'New Training Available', preview: 'We have added a new training module on Healthcare Support. Please complete it by the end of this week.', time: '1 hour ago', unread: true },
    { id: 2, from: 'Coordinator', subject: 'Task Assignment Update', preview: 'Your task assignments have been updated. Please check your dashboard for new tasks.', time: '3 hours ago', unread: true },
    { id: 3, from: 'Support', subject: 'Feedback Request', preview: 'We would love to hear your feedback on the recent volunteer program. Please take a moment to share your thoughts.', time: '1 day ago', unread: false },
    { id: 4, from: 'Team Lead', subject: 'Monthly Review', preview: 'Your monthly performance review is ready. Great work this month! Keep it up.', time: '2 days ago', unread: false },
    { id: 5, from: 'Admin Team', subject: 'System Maintenance', preview: 'Scheduled maintenance will occur this weekend. The system will be unavailable for 2 hours.', time: '3 days ago', unread: false }
  ];

  const stats = [
    { label: 'Total Messages', value: '48' },
    { label: 'Unread', value: '12' },
    { label: 'Archived', value: '24' },
    { label: 'Starred', value: '8' }
  ];

  const filteredMessages = messages.filter(msg => {
    if (activeFilter === 'unread') return msg.unread;
    if (activeFilter === 'read') return !msg.unread;
    return true;
  });

  return (
    <div className="messages-container">
      <motion.div
        className="messages-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Messages</h1>
          <p>View and manage your messages</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="messages-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card-msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        className="messages-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-buttons-msg">
          <button 
            className={`filter-btn-msg ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn-msg ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button 
            className={`filter-btn-msg ${activeFilter === 'read' ? 'active' : ''}`}
            onClick={() => setActiveFilter('read')}
          >
            Read
          </button>
        </div>
      </motion.div>

      {/* Messages List */}
      <motion.div
        className="messages-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="messages-list-new">
          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`message-item-new ${message.unread ? 'unread' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
            >
              <div className="message-icon-new">
                <MessageSquare size={24} />
              </div>
              <div className="message-content-new">
                <div className="message-header-new">
                  <span className="message-from-new">{message.from}</span>
                  <span className="message-time-new">{message.time}</span>
                </div>
                <div className="message-subject-new">{message.subject}</div>
                <div className="message-preview">{message.preview}</div>
                <div className="message-actions">
                  <button className="action-btn">
                    <Archive size={14} />
                    Archive
                  </button>
                  <button className="action-btn">
                    <Star size={14} />
                    Star
                  </button>
                  <button className="action-btn">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Messages;
