import { useUser } from '../../context/UserContext';
import { Activity, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import AIVoiceInteraction from '../../components/user/AIVoiceInteraction';
import IssueCategoryChart from '../../components/user/IssueCategoryChart';
import IssueTrendChart from '../../components/user/IssueTrendChart';
import PreviousIssues from '../../components/user/PreviousIssues';

const Dashboard = () => {
  const { userData, getGreeting } = useUser();

  const stats = [
    { 
      label: 'Total Issues', 
      value: '24', 
      icon: Activity, 
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    { 
      label: 'Resolved', 
      value: '18', 
      icon: CheckCircle, 
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    { 
      label: 'In Progress', 
      value: '4', 
      icon: Clock, 
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    { 
      label: 'Success Rate', 
      value: '75%', 
      icon: TrendingUp, 
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="font-['Poppins'] text-[32px] font-bold text-[#01070f] mb-2">
          {getGreeting()}, {userData.name}!
        </h2>
        <p className="font-['Poppins'] text-sm text-[#6b7280]">
          Welcome to your Vaani dashboard. Here's your activity summary.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-[#01070f] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: stat.bgColor }}
            >
              <stat.icon size={24} style={{ color: stat.color }} />
            </div>
            <div className="text-white font-['Poppins'] text-[32px] font-bold mb-1">
              {stat.value}
            </div>
            <div className="text-white/60 font-['Poppins'] text-[13px] uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_400px] gap-6">
        <div className="flex flex-col gap-6">
          <AIVoiceInteraction />
          
          <div className="grid grid-cols-2 gap-6">
            <IssueCategoryChart />
            <IssueTrendChart />
          </div>
        </div>

        <div className="flex flex-col">
          <PreviousIssues />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
