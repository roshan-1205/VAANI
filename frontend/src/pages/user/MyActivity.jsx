import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, Filter, Download } from 'lucide-react';

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
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)] bg-white">
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex-1">
          <h1 className="font-poppins text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01070f] m-0 mb-2">My Activity</h1>
          <p className="font-poppins text-xs sm:text-sm text-[#01070f]/60 m-0">Track all your interactions and service requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#01070f] text-white border-none rounded-xl font-poppins text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(1,7,15,0.2)] w-full sm:w-auto justify-center">
          <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
          Export Report
        </button>
      </motion.div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="font-poppins text-3xl sm:text-4xl font-bold mb-1 sm:mb-2" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-poppins text-[11px] sm:text-[13px] text-white/70">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters - Responsive */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 bg-[#01070f] px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white flex-1 sm:flex-initial">
          <Filter size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent border-none text-white font-poppins text-xs sm:text-sm cursor-pointer outline-none flex-1 min-w-0">
            <option value="all" className="bg-[#01070f] text-white">All Status</option>
            <option value="Completed" className="bg-[#01070f] text-white">Completed</option>
            <option value="In Progress" className="bg-[#01070f] text-white">In Progress</option>
            <option value="Pending" className="bg-[#01070f] text-white">Pending</option>
            <option value="Failed" className="bg-[#01070f] text-white">Failed</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 bg-[#01070f] px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white flex-1 sm:flex-initial">
          <Filter size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-transparent border-none text-white font-poppins text-xs sm:text-sm cursor-pointer outline-none flex-1 min-w-0">
            <option value="all" className="bg-[#01070f] text-white">All Categories</option>
            <option value="Healthcare" className="bg-[#01070f] text-white">Healthcare</option>
            <option value="Legal" className="bg-[#01070f] text-white">Legal</option>
            <option value="Education" className="bg-[#01070f] text-white">Education</option>
            <option value="Welfare" className="bg-[#01070f] text-white">Welfare</option>
          </select>
        </div>
      </motion.div>

      {/* Activity List - Responsive */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:translate-x-1 hover:shadow-[0_8px_24px_rgba(1,7,15,0.15)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 self-start" style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}>
              {getStatusIcon(activity.status)}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-poppins text-base sm:text-lg font-semibold text-white m-0 break-words">{activity.title}</h3>
                <span className="font-poppins text-xs text-white/50 flex-shrink-0">{activity.duration} ago</span>
              </div>
              
              <p className="font-poppins text-xs sm:text-sm text-white/70 m-0 mb-3 sm:mb-4 leading-relaxed">{activity.description}</p>
              
              {/* Tags and Meta Info */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-poppins text-[10px] sm:text-xs font-semibold" style={{ backgroundColor: `${getCategoryColor(activity.category)}20`, color: getCategoryColor(activity.category) }}>
                  {activity.category}
                </span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-poppins text-[10px] sm:text-xs font-semibold" style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}>
                  {activity.status}
                </span>
                <span className="flex items-center gap-1 font-poppins text-[10px] sm:text-xs text-white/50">
                  <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                  <span className="hidden sm:inline">{new Date(activity.date).toLocaleDateString()}</span>
                  <span className="sm:hidden">{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </span>
                <span className="flex items-center gap-1 font-poppins text-[10px] sm:text-xs text-white/50">
                  <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
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
