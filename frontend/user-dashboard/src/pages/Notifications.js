import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle, Info, Trash2, Check } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Application Approved',
      message: 'Your healthcare appointment has been confirmed for March 2, 2026',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Required',
      message: 'Please upload your ID proof to complete the verification process',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to improve your experience',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of ₹500 has been processed successfully',
      time: '1 day ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Reminder',
      message: 'You have an upcoming appointment on March 5, 2026',
      time: '2 days ago',
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={24} />;
      case 'warning': return <AlertCircle size={24} />;
      case 'info': return <Info size={24} />;
      default: return <Bell size={24} />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <motion.div
        className="notifications-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={markAllAsRead}>
            <Check size={18} />
            Mark all as read
          </button>
        )}
      </motion.div>

      <motion.div
        className="notifications-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </motion.div>

      <div className="notifications-list">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            className={`notification-item ${!notification.read ? 'unread' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <div
              className="notification-icon"
              style={{ backgroundColor: `${getColor(notification.type)}20`, color: getColor(notification.type) }}
            >
              {getIcon(notification.type)}
            </div>
            
            <div className="notification-content">
              <div className="notification-top">
                <h3>{notification.title}</h3>
                <span className="notification-time">{notification.time}</span>
              </div>
              <p>{notification.message}</p>
            </div>

            <div className="notification-actions">
              {!notification.read && (
                <button
                  className="action-icon-btn"
                  onClick={() => markAsRead(notification.id)}
                  title="Mark as read"
                >
                  <Check size={18} />
                </button>
              )}
              <button
                className="action-icon-btn delete"
                onClick={() => deleteNotification(notification.id)}
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
        
        {filteredNotifications.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bell size={64} />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
