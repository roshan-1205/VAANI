import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, User, Tag } from 'lucide-react';

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
        className="bg-[#01070f] rounded-3xl p-6 shadow-[0_4px_16px_rgba(1,7,15,0.1)] h-fit sticky top-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-poppins text-xl font-semibold text-white m-0 mb-5">Previous Issues</h3>
        
        <div className="flex gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <Search size={16} className="text-white/50" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-poppins text-[13px] placeholder:text-white/40"
            />
          </div>
          
          <select
            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-poppins text-[13px] cursor-pointer outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all" className="bg-[#01070f] text-white">All Status</option>
            <option value="Resolved" className="bg-[#01070f] text-white">Resolved</option>
            <option value="In Progress" className="bg-[#01070f] text-white">In Progress</option>
            <option value="Escalated" className="bg-[#01070f] text-white">Escalated</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded">
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:bg-white/8 hover:border-white/20"
              onClick={() => setSelectedIssue(issue)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start gap-3 mb-3">
                <h4 className="font-poppins text-sm font-semibold text-white m-0 flex-1">{issue.title}</h4>
                <span 
                  className="px-3 py-1 rounded-xl font-poppins text-[11px] font-semibold whitespace-nowrap"
                  style={{ backgroundColor: `${getStatusColor(issue.status)}20`, color: getStatusColor(issue.status) }}
                >
                  {issue.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-lg font-poppins text-[11px] font-medium">{issue.category}</span>
                <span className="font-poppins text-xs text-white/50">{new Date(issue.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            className="fixed inset-0 bg-[#01070f]/70 backdrop-blur-sm z-[1000] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              className="w-[500px] max-w-[90vw] bg-white shadow-[-4px_0_24px_rgba(1,7,15,0.2)] overflow-y-auto flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#01070f]/10 sticky top-0 bg-white z-10">
                <h2 className="font-poppins text-xl font-semibold text-[#01070f] m-0 flex-1 pr-4">{selectedIssue.title}</h2>
                <button className="bg-[#01070f]/5 border-none rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 text-[#01070f] hover:bg-[#01070f]/10" onClick={() => setSelectedIssue(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 flex-1">
                <div className="bg-[#01070f]/[0.03] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 py-2 text-[#01070f]">
                    <Tag size={16} className="text-[#01070f]/50" />
                    <span className="font-poppins text-[13px] font-semibold text-[#01070f]/70">Category:</span>
                    <span className="font-poppins text-[13px] text-[#01070f] ml-auto">{selectedIssue.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2 text-[#01070f]">
                    <User size={16} className="text-[#01070f]/50" />
                    <span className="font-poppins text-[13px] font-semibold text-[#01070f]/70">Department:</span>
                    <span className="font-poppins text-[13px] text-[#01070f] ml-auto">{selectedIssue.department}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2 text-[#01070f]">
                    <Calendar size={16} className="text-[#01070f]/50" />
                    <span className="font-poppins text-[13px] font-semibold text-[#01070f]/70">Date:</span>
                    <span className="font-poppins text-[13px] text-[#01070f] ml-auto">{new Date(selectedIssue.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-poppins text-base font-semibold text-[#01070f] m-0 mb-3">Description</h3>
                  <p className="font-poppins text-sm leading-relaxed text-[#01070f]/80 m-0">{selectedIssue.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-poppins text-base font-semibold text-[#01070f] m-0 mb-3">Response</h3>
                  <p className="font-poppins text-sm leading-relaxed text-[#01070f]/80 m-0">{selectedIssue.response}</p>
                </div>

                <div>
                  <h3 className="font-poppins text-base font-semibold text-[#01070f] m-0 mb-3">Timeline</h3>
                  <div className="flex flex-col gap-4">
                    {selectedIssue.timeline.map((item, index) => (
                      <div key={index} className="flex gap-3 relative">
                        {index !== selectedIssue.timeline.length - 1 && (
                          <div className="absolute left-[7px] top-6 bottom-[-16px] w-0.5 bg-[#01070f]/10"></div>
                        )}
                        <div className="w-4 h-4 rounded-full bg-[#8b5cf6] flex-shrink-0 mt-0.5"></div>
                        <div className="flex-1 flex flex-col gap-1">
                          <span className="font-poppins text-sm font-medium text-[#01070f]">{item.event}</span>
                          <span className="font-poppins text-xs text-[#01070f]/50">{item.date}</span>
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
