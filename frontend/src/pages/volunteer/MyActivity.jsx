import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Phone, MessageSquare, Users, TrendingUp, Award, Target } from 'lucide-react';

const MyActivity = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    { label: 'Total Calls', value: '156', trend: '+12%', icon: Phone, color: 'bg-blue-500/20 text-blue-500' },
    { label: 'Tasks Completed', value: '89', trend: '+8%', icon: CheckCircle, color: 'bg-green-500/20 text-green-500' },
    { label: 'Messages Sent', value: '234', trend: '+15%', icon: MessageSquare, color: 'bg-purple-500/20 text-purple-500' },
    { label: 'People Helped', value: '142', trend: '+10%', icon: Users, color: 'bg-amber-500/20 text-amber-500' }
  ];

  const activities = [
    { id: 1, type: 'completed', icon: CheckCircle, title: 'Healthcare Support Call', description: 'Assisted patient with medical consultation', time: '2 hours ago', category: 'Healthcare', borderColor: 'border-l-green-500', iconBg: 'bg-green-500/15 text-green-500' },
    { id: 2, type: 'call', icon: Phone, title: 'Education Inquiry Call', description: 'Helped student with scholarship information', time: '4 hours ago', category: 'Education', borderColor: 'border-l-blue-500', iconBg: 'bg-blue-500/15 text-blue-500' },
    { id: 3, type: 'completed', icon: CheckCircle, title: 'Legal Aid Documentation', description: 'Completed document verification', time: '6 hours ago', category: 'Legal Aid', borderColor: 'border-l-green-500', iconBg: 'bg-green-500/15 text-green-500' },
    { id: 4, type: 'progress', icon: Clock, title: 'Welfare Program Registration', description: 'In progress - pension scheme application', time: '8 hours ago', category: 'Welfare', borderColor: 'border-l-amber-500', iconBg: 'bg-amber-500/15 text-amber-500' },
    { id: 5, type: 'call', icon: Phone, title: 'Healthcare Emergency Call', description: 'Provided emergency medical guidance', time: '1 day ago', category: 'Healthcare', borderColor: 'border-l-blue-500', iconBg: 'bg-blue-500/15 text-blue-500' },
    { id: 6, type: 'completed', icon: CheckCircle, title: 'Training Module Completed', description: 'Finished Communication Skills training', time: '1 day ago', category: 'Training', borderColor: 'border-l-green-500', iconBg: 'bg-green-500/15 text-green-500' },
    { id: 7, type: 'call', icon: Phone, title: 'Legal Consultation Call', description: 'Assisted with legal document queries', time: '2 days ago', category: 'Legal Aid', borderColor: 'border-l-blue-500', iconBg: 'bg-blue-500/15 text-blue-500' },
    { id: 8, type: 'completed', icon: CheckCircle, title: 'Community Outreach', description: 'Participated in community awareness program', time: '2 days ago', category: 'Community', borderColor: 'border-l-green-500', iconBg: 'bg-green-500/15 text-green-500' }
  ];

  const achievements = [
    { title: 'First 100 Calls', description: 'Complete 100 support calls', current: 156, target: 100, completed: true },
    { title: 'Master Communicator', description: 'Send 200 messages', current: 234, target: 200, completed: true },
    { title: 'Helper Hero', description: 'Help 150 people', current: 142, target: 150, completed: false },
    { title: 'Training Champion', description: 'Complete 5 training modules', current: 3, target: 5, completed: false }
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeFilter);

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-white min-h-screen">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-[#01070f] text-[32px] font-bold mb-2 font-['Montserrat']">My Activity</h1>
          <p className="text-gray-600 text-sm">Track your volunteer activities and achievements</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-[#01070f] p-6 rounded-xl shadow-lg border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-xl bg-green-500/15 text-green-500">
                <TrendingUp size={14} />
                {stat.trend}
              </div>
            </div>
            <div className="text-white text-4xl font-bold mb-2 font-['Montserrat']">{stat.value}</div>
            <div className="text-white/60 text-[13px] uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-[2fr_1fr] xl:grid-cols-1 gap-6 mb-6">
        {/* Activity Timeline */}
        <motion.div
          className="bg-[#01070f] rounded-xl p-6 shadow-lg border border-white/5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          
        >
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-white text-xl font-bold font-['Montserrat']">Recent Activity</h2>
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
              <button 
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold  whitespace-nowrap ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap ${
                  activeFilter === 'completed' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveFilter('completed')}
              >
                Completed
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap ${
                  activeFilter === 'call' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveFilter('call')}
              >
                Calls
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold  whitespace-nowrap ${
                  activeFilter === 'progress' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveFilter('progress')}
              >
                In Progress
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5">
            <AnimatePresence mode="wait">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  className={`flex gap-4 p-4 bg-white/[0.03] rounded-lg border-l-[3px] ${activity.borderColor} transition-all duration-300 hover:bg-white/[0.06] hover:translate-x-1`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
                    <activity.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[15px] font-semibold mb-1">{activity.title}</div>
                    <div className="text-white/60 text-[13px] mb-2">{activity.description}</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-white/50 text-xs">
                        <Clock size={12} />
                        {activity.time}
                      </div>
                      <div className="px-2.5 py-1 bg-white/10 rounded-xl text-white/70 text-[11px] font-semibold">
                        {activity.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Achievements */}
        <div>
          <div className="bg-[#01070f] rounded-xl p-6 shadow-lg border border-white/5">
            <h2 className="text-white text-xl font-bold mb-5 font-['Montserrat']">Achievements</h2>
            <div className="flex flex-col gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/[0.03] rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-red-500">
                      {achievement.completed ? <Award size={24} className="text-white" /> : <Target size={24} className="text-white" />}
                    </div>
                    <div>
                      <h3 className="text-white text-[15px] font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-white/60 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min((achievement.current / achievement.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-white/60 text-[11px]">
                      <span>{achievement.current} / {achievement.target}</span>
                      <span>{Math.round((achievement.current / achievement.target) * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-[#01070f] rounded-xl p-6 shadow-lg border border-white/5 mt-6">
            <h2 className="text-white text-xl font-bold mb-5 font-['Montserrat']">This Week</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                <div className="text-white/60 text-xs mb-2 uppercase tracking-wider">Calls Made</div>
                <div className="text-white text-2xl font-bold font-['Montserrat']">24</div>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                <div className="text-white/60 text-xs mb-2 uppercase tracking-wider">Avg Duration</div>
                <div className="text-white text-2xl font-bold font-['Montserrat']">8m</div>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                <div className="text-white/60 text-xs mb-2 uppercase tracking-wider">Tasks Done</div>
                <div className="text-white text-2xl font-bold font-['Montserrat']">12</div>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                <div className="text-white/60 text-xs mb-2 uppercase tracking-wider">Rating</div>
                <div className="text-white text-2xl font-bold font-['Montserrat']">4.8★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
