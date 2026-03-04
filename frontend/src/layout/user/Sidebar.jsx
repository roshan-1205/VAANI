import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, AlertCircle, Phone, Bell, Users, HelpCircle, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/user-dashboard' },
    { icon: Activity, label: 'My Activity', path: '/user-dashboard/my-activity' },
    { icon: AlertCircle, label: 'Report Issue', path: '/user-dashboard/report-issue' },
    { icon: Phone, label: 'Live Help', path: '/user-dashboard/live-help' },
    { icon: Bell, label: 'Notifications', path: '/user-dashboard/notifications' },
    { icon: Users, label: 'Community', path: '/user-dashboard/community' },
    { icon: HelpCircle, label: 'Support', path: '/user-dashboard/support' },
    { icon: Settings, label: 'Settings', path: '/user-dashboard/settings' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-[#01070f] py-6 px-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] z-[100] shadow-[4px_0_16px_rgba(0,0,0,0.3)] border-r border-white/5 ${collapsed ? 'w-20' : 'w-60'}`}>
      <div className="flex items-center justify-between mb-10 px-2">
        {!collapsed && (
          <div>
            <h2 className="text-white text-2xl font-bold tracking-wider m-0 font-poppins">Vaani</h2>
            <span className="text-white/50 text-xs block mt-1">Citizen Portal</span>
          </div>
        )}
        <button 
          className="w-8 h-8 bg-white/10 rounded-lg text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`relative flex items-center gap-4 px-4 py-3.5 text-white/70 bg-transparent border-none rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium text-left w-full hover:bg-white/10 hover:text-white hover:translate-x-1 ${
              location.pathname === item.path ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border-l-2 border-green-500' : ''
            } ${collapsed ? 'justify-center px-3.5' : ''}`}
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="absolute bottom-6 left-3 right-3 pt-4 text-center border-t border-white/10">
          <p className="text-white/50 text-xs m-0 mb-1">Â© 2026 Vaani</p>
          <p className="text-white/30 text-[11px] m-0">v1.0.0</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
