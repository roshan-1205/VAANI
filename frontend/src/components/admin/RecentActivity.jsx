import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const RecentActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const activities = [
    {
      id: 1,
      name: 'Lakshmi Devi',
      service: 'Pension inquiry',
      language: 'Hindi',
      status: 'Resolved',
      time: '2 min ago',
      avatar: 'L',
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Raju Kumar',
      service: 'Healthcare appointment',
      language: 'Bengali',
      status: 'In Progress',
      time: '5 min ago',
      avatar: 'R',
      color: '#8b5cf6'
    },
    {
      id: 3,
      name: 'Meena Patel',
      service: 'Education scheme',
      language: 'Gujarati',
      status: 'Resolved',
      time: '8 min ago',
      avatar: 'M',
      color: '#10b981'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      service: 'Legal aid request',
      language: 'Telugu',
      status: 'Resolved',
      time: '12 min ago',
      avatar: 'S',
      color: '#f59e0b'
    }
  ];

  return (
    <>
      <motion.div
        className="bg-dark p-6 max-md:p-5 max-sm:p-4 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6 max-sm:mb-4">
          <h3 className="text-white text-lg max-sm:text-base font-semibold">Recent Activity</h3>
        </div>
        
        <div className="flex flex-col gap-3 max-sm:gap-2">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center gap-4 max-sm:gap-3 p-4 max-sm:p-3 bg-white/5 rounded-lg cursor-pointer transition-all hover:bg-white/10 hover:translate-x-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="w-10 h-10 max-sm:w-9 max-sm:h-9 rounded-full flex items-center justify-center text-white font-semibold text-base max-sm:text-sm flex-shrink-0" style={{ background: activity.color }}>
                {activity.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm max-sm:text-xs font-semibold mb-1">{activity.name}</div>
                <div className="text-white/60 text-xs max-sm:text-[11px] truncate">{activity.service}</div>
              </div>
              
              <div className="flex flex-col items-end gap-1.5 max-sm:gap-1 flex-shrink-0 max-[480px]:hidden">
                <span className="px-2.5 py-1 max-sm:px-2 max-sm:py-0.5 bg-primary/20 text-primary rounded-xl text-[11px] max-sm:text-[10px] font-semibold">{activity.language}</span>
                <span className={`px-2.5 py-1 max-sm:px-2 max-sm:py-0.5 rounded-xl text-[11px] max-sm:text-[10px] font-semibold ${activity.status === 'Resolved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {activity.status}
                </span>
                <span className="text-white/50 text-[11px] max-sm:text-[10px]">{activity.time}</span>
              </div>
              
              <div className="hidden max-[480px]:flex flex-col gap-1">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${activity.status === 'Resolved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {activity.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[1000] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              className="w-[400px] h-screen bg-dark shadow-[-4px_0_24px_rgba(0,0,0,0.3)] max-sm:w-full overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 max-sm:p-4 border-b border-white/10 sticky top-0 bg-dark z-10">
                <h3 className="text-white text-lg max-sm:text-base font-semibold">Activity Details</h3>
                <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all" onClick={() => setSelectedActivity(null)}>
                  <X size={20} className="max-sm:w-5 max-sm:h-5" />
                </button>
              </div>
              
              <div className="p-8 max-sm:p-5 text-center">
                <div className="w-20 h-20 max-sm:w-16 max-sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-[32px] max-sm:text-2xl mx-auto mb-4" style={{ background: selectedActivity.color }}>
                  {selectedActivity.avatar}
                </div>
                <h4 className="text-white text-xl max-sm:text-lg font-semibold mb-2">{selectedActivity.name}</h4>
                <p className="text-white/60 text-sm max-sm:text-xs mb-8 max-sm:mb-6">{selectedActivity.service}</p>
                
                <div className="flex flex-col gap-4 max-sm:gap-3 text-left">
                  <div className="flex justify-between p-4 max-sm:p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px] max-sm:text-xs">Language</span>
                    <span className="text-white text-[13px] max-sm:text-xs font-semibold">{selectedActivity.language}</span>
                  </div>
                  <div className="flex justify-between p-4 max-sm:p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px] max-sm:text-xs">Status</span>
                    <span className="text-white text-[13px] max-sm:text-xs font-semibold">{selectedActivity.status}</span>
                  </div>
                  <div className="flex justify-between p-4 max-sm:p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px] max-sm:text-xs">Time</span>
                    <span className="text-white text-[13px] max-sm:text-xs font-semibold">{selectedActivity.time}</span>
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

export default RecentActivity;
