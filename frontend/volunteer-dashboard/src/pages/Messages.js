import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import './PageCommon.css';

const Messages = () => {
  const messages = [
    { id: 1, from: 'Admin Team', subject: 'New Training Available', time: '1 hour ago', unread: true },
    { id: 2, from: 'Coordinator', subject: 'Task Assignment Update', time: '3 hours ago', unread: true },
    { id: 3, from: 'Support', subject: 'Feedback Request', time: '1 day ago', unread: false },
    { id: 4, from: 'Team Lead', subject: 'Monthly Review', time: '2 days ago', unread: false }
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Messages</h1>
          <p>View and manage your messages</p>
        </div>
      </motion.div>

      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="messages-list">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`message-item ${message.unread ? 'unread' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="message-icon">
                <MessageSquare size={20} />
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-from">{message.from}</span>
                  <span className="message-time">{message.time}</span>
                </div>
                <p className="message-subject">{message.subject}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Messages;
