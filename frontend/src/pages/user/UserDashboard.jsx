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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UserProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div 
          className={`flex-1 transition-[margin-left] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${sidebarCollapsed ? 'ml-20' : 'ml-60'}`}
          style={{ marginLeft: sidebarCollapsed ? '80px' : '240px' }}
        >
          <Navbar />
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
