import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, ThumbsUp, Eye, TrendingUp, Plus } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const discussions = [
    {
      id: 1,
      title: 'How to apply for healthcare benefits?',
      author: 'Priya Sharma',
      avatar: 'PS',
      category: 'Healthcare',
      replies: 24,
      likes: 45,
      views: 320,
      time: '2 hours ago',
      trending: true
    },
    {
      id: 2,
      title: 'Legal aid for property disputes',
      author: 'Rajesh Kumar',
      avatar: 'RK',
      category: 'Legal',
      replies: 18,
      likes: 32,
      views: 256,
      time: '5 hours ago',
      trending: true
    },
    {
      id: 3,
      title: 'Education scholarship application tips',
      author: 'Anita Desai',
      avatar: 'AD',
      category: 'Education',
      replies: 31,
      likes: 67,
      views: 412,
      time: '1 day ago',
      trending: false
    },
    {
      id: 4,
      title: 'Welfare program eligibility criteria',
      author: 'Vikram Singh',
      avatar: 'VS',
      category: 'Welfare',
      replies: 15,
      likes: 28,
      views: 189,
      time: '1 day ago',
      trending: false
    },
    {
      id: 5,
      title: 'Document verification process explained',
      author: 'Meera Patel',
      avatar: 'MP',
      category: 'General',
      replies: 42,
      likes: 89,
      views: 567,
      time: '2 days ago',
      trending: true
    }
  ];

  const categories = [
    { name: 'Healthcare', count: 156, color: '#8b5cf6' },
    { name: 'Legal', count: 98, color: '#3b82f6' },
    { name: 'Education', count: 124, color: '#10b981' },
    { name: 'Welfare', count: 87, color: '#f59e0b' },
    { name: 'General', count: 203, color: '#6b7280' }
  ];

  const filteredDiscussions = activeTab === 'trending' 
    ? discussions.filter(d => d.trending)
    : discussions;

  return (
    <div className="p-4 sm:p-6 min-h-screen w-full pb-20 sm:pb-8">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full sm:w-auto">
          <h1 className="font-poppins text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01070f] mb-1 sm:mb-2">Community Forums</h1>
          <p className="font-poppins text-xs sm:text-sm text-[#01070f]/60">Connect with other users and share experiences</p>
        </div>
        
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#01070f] text-[#e2e2e2] rounded-xl font-poppins text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(1,7,15,0.4)] hover:bg-[#0a0f1a] active:scale-95 transition-all duration-300">
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>New Discussion</span>
        </button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 sm:gap-6">
        {/* Discussions Section */}
        <div className="order-2 xl:order-1">
          {/* Tab Buttons */}
          <motion.div
            className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-poppins text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeTab === 'trending'
                  ? 'bg-[#01070f] text-white border border-[#01070f]'
                  : 'bg-[#01070f]/5 text-[#01070f]/70 border border-[#01070f]/10 hover:bg-[#01070f]/8 hover:border-[#01070f]/20'
              }`}
              onClick={() => setActiveTab('trending')}
            >
              <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Trending</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-poppins text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeTab === 'recent'
                  ? 'bg-[#01070f] text-white border border-[#01070f]'
                  : 'bg-[#01070f]/5 text-[#01070f]/70 border border-[#01070f]/10 hover:bg-[#01070f]/8 hover:border-[#01070f]/20'
              }`}
              onClick={() => setActiveTab('recent')}
            >
              <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Recent</span>
            </button>
          </motion.div>

          {/* Discussion Cards */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-5 cursor-pointer hover:translate-x-0 sm:hover:translate-x-1 hover:shadow-[0_8px_24px_rgba(1,7,15,0.15)] active:scale-[0.98] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-poppins text-sm sm:text-base font-bold flex-shrink-0">
                  {discussion.avatar}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="font-poppins text-base sm:text-lg font-semibold text-white flex-1 pr-2">{discussion.title}</h3>
                    {discussion.trending && (
                      <span className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-red-500/20 text-red-500 rounded-lg font-poppins text-[10px] sm:text-[11px] font-semibold whitespace-nowrap">
                        <TrendingUp size={12} className="sm:w-[14px] sm:h-[14px]" />
                        <span>Trending</span>
                      </span>
                    )}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-2 sm:mb-3">
                    <span className="font-poppins text-[11px] sm:text-[13px] text-white/60 truncate">by {discussion.author}</span>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-poppins text-[10px] sm:text-[11px] font-semibold text-white" style={{ backgroundColor: getCategoryColor(discussion.category) }}>
                      {discussion.category}
                    </span>
                    <span className="font-poppins text-[10px] sm:text-xs text-white/50">{discussion.time}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-3 sm:gap-5 flex-wrap">
                    <span className="flex items-center gap-1 sm:gap-1.5 font-poppins text-[11px] sm:text-[13px] text-white/60">
                      <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                      <span>{discussion.replies}</span>
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 font-poppins text-[11px] sm:text-[13px] text-white/60">
                      <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
                      <span>{discussion.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 font-poppins text-[11px] sm:text-[13px] text-white/60">
                      <Eye size={14} className="sm:w-4 sm:h-4" />
                      <span>{discussion.views}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          className="flex flex-col gap-4 sm:gap-6 order-1 xl:order-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Categories */}
          <div className="bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="font-poppins text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Categories</h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center p-2.5 sm:p-3 bg-white/5 rounded-[10px] cursor-pointer hover:bg-white/8 active:scale-95 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }}></div>
                    <span className="font-poppins text-xs sm:text-sm text-white truncate">{category.name}</span>
                  </div>
                  <span className="font-poppins text-[11px] sm:text-[13px] font-semibold text-white/50 flex-shrink-0 ml-2">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-[#01070f] rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="font-poppins text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Community Stats</h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 text-purple-500">
                <Users size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-poppins text-xl sm:text-2xl font-bold text-white">2,456</div>
                  <div className="font-poppins text-[11px] sm:text-[13px] text-white/60">Active Members</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-purple-500">
                <MessageCircle size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-poppins text-xl sm:text-2xl font-bold text-white">668</div>
                  <div className="font-poppins text-[11px] sm:text-[13px] text-white/60">Discussions</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    'Healthcare': '#8b5cf6',
    'Legal': '#3b82f6',
    'Education': '#10b981',
    'Welfare': '#f59e0b',
    'General': '#6b7280'
  };
  return colors[category] || '#6b7280';
};

export default Community;
