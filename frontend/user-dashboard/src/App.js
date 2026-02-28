import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Dashboard from './pages/Dashboard';
import MyActivity from './pages/MyActivity';
import ReportIssue from './pages/ReportIssue';
import LiveHelp from './pages/LiveHelp';
import Notifications from './pages/Notifications';
import Community from './pages/Community';
import Support from './pages/Support';
import Settings from './pages/Settings';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
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
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
