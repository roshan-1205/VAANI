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
        className="bg-dark p-6 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
        </div>
        
        <div className="flex flex-col gap-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg cursor-pointer transition-all hover:bg-white/10 hover:translate-x-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0" style={{ background: activity.color }}>
                {activity.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold mb-1">{activity.name}</div>
                <div className="text-white/60 text-xs truncate">{activity.service}</div>
              </div>
              
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="px-2.5 py-1 bg-primary/20 text-primary rounded-xl text-[11px] font-semibold">{activity.language}</span>
                <span className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold ${activity.status === 'Resolved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {activity.status}
                </span>
                <span className="text-white/50 text-[11px]">{activity.time}</span>
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
              className="w-[400px] h-screen bg-dark shadow-[-4px_0_24px_rgba(0,0,0,0.3)] max-sm:w-full"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-white text-lg font-semibold">Activity Details</h3>
                <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all" onClick={() => setSelectedActivity(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-[32px] mx-auto mb-4" style={{ background: selectedActivity.color }}>
                  {selectedActivity.avatar}
                </div>
                <h4 className="text-white text-xl font-semibold mb-2">{selectedActivity.name}</h4>
                <p className="text-white/60 text-sm mb-8">{selectedActivity.service}</p>
                
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px]">Language</span>
                    <span className="text-white text-[13px] font-semibold">{selectedActivity.language}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px]">Status</span>
                    <span className="text-white text-[13px] font-semibold">{selectedActivity.status}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white/60 text-[13px]">Time</span>
                    <span className="text-white text-[13px] font-semibold">{selectedActivity.time}</span>
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
