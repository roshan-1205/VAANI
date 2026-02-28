import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, AlertCircle, Phone, Bell, Users, HelpCircle, Settings, ChevronLeft } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Activity, label: 'My Activity', path: '/my-activity' },
    { icon: AlertCircle, label: 'Report an Issue', path: '/report-issue' },
    { icon: Phone, label: 'Live Help', path: '/live-help' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Users, label: 'Community Forums', path: '/community' },
    { icon: HelpCircle, label: 'Help & Support', path: '/support' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Vaani</h2>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
            {location.pathname === item.path && <div className="active-indicator" />}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
