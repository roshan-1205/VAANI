import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Trash2, Check } from 'lucide-react';

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
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen w-full bg-white pb-20 sm:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="w-full sm:w-auto">
          <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01070f] m-0 mb-1 sm:mb-2">Notifications</h1>
          <p className="font-['Poppins'] text-xs sm:text-sm text-[#6b7280] m-0">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#01070f] text-white border-none rounded-xl font-['Poppins'] text-sm font-medium cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(1,7,15,0.2)] active:scale-95" 
            onClick={markAllAsRead}
          >
            <Check size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 sm:mb-6 bg-[#f9fafb] p-1.5 rounded-xl border-2 border-[#e5e7eb] w-full sm:w-fit overflow-x-auto">
        <button
          className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 ${filter === 'all' ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 'bg-transparent text-[#6b7280]'} border-none rounded-lg font-['Poppins'] text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 active:scale-95 whitespace-nowrap`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 ${filter === 'unread' ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 'bg-transparent text-[#6b7280]'} border-none rounded-lg font-['Poppins'] text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 active:scale-95 whitespace-nowrap`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 ${filter === 'read' ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 'bg-transparent text-[#6b7280]'} border-none rounded-lg font-['Poppins'] text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 active:scale-95 whitespace-nowrap`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5">
        <div className="flex flex-col gap-2 sm:gap-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/[0.03] rounded-xl p-4 sm:p-5 transition-all duration-300 cursor-pointer hover:bg-white/[0.08] sm:hover:translate-x-1 active:scale-[0.98] ${!notification.read ? 'border-l-[3px] border-[#10b981] bg-[#10b981]/5' : 'border-l-[3px] border-[#3b82f6]'}`}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getColor(notification.type)}33`, color: getColor(notification.type) }}
              >
                {React.cloneElement(getIcon(notification.type), { size: window.innerWidth < 640 ? 20 : 24 })}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-0 mb-2">
                  <h3 className="font-['Poppins'] text-sm sm:text-[15px] font-semibold text-white m-0 truncate pr-2">{notification.title}</h3>
                  <span className="font-['Poppins'] text-[10px] sm:text-xs text-white/50 whitespace-nowrap flex-shrink-0">{notification.time}</span>
                </div>
                <p className="font-['Poppins'] text-xs sm:text-sm text-white/70 m-0 leading-relaxed mb-3">{notification.message}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {!notification.read && (
                    <button
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-[10px] sm:text-xs flex items-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 font-['Poppins']"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>Mark as read</span>
                    </button>
                  )}
                  <button
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-[10px] sm:text-xs flex items-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-[#ef4444]/20 hover:text-[#ef4444] hover:border-[#ef4444]/30 active:scale-95 font-['Poppins']"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-5 text-center">
              <Bell size={48} className="sm:w-16 sm:h-16 text-white/20" />
              <h3 className="font-['Poppins'] text-lg sm:text-2xl font-semibold text-white/60 mt-3 sm:mt-4 mb-1 sm:mb-2 m-0">No notifications</h3>
              <p className="font-['Poppins'] text-xs sm:text-sm text-white/50 m-0">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
