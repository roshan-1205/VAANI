import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Sidebar from '../../layout/user/Sidebar';
import Navbar from '../../layout/user/Navbar';
import Dashboard from './Dashboard';
import MyActivity from './MyActivity';
import ReportIssue from './ReportIssue';
import LiveHelp from './LiveHelp';
import Notifications from './Notifications';
import Community from './Community';
import Support from './Support';
import Settings from './Settings';
import LoadingScreen from '../../components/user/LoadingScreen';

const UserDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(e.target) && !e.target.closest('.hamburger-btn')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UserProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed}
          mobileOpen={sidebarOpen}
          setMobileOpen={setSidebarOpen}
        />
        <div 
          className={`flex-1 transition-[margin-left] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:ml-60 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}
        >
          <Navbar 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-activity" element={<MyActivity />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/live-help" element={<LiveHelp />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/community" element={<Community />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/user-dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

export default UserDashboard;
