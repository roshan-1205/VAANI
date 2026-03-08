import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { VolunteerProvider } from '../../context/VolunteerContext';
import Sidebar from '../../layout/volunteer/Sidebar';
import Navbar from '../../layout/volunteer/Navbar';
import Overview from './Overview';
import MyTasks from './MyTasks';
import MyActivity from './MyActivity';
import Training from './Training';
import Performance from './Performance';
import Messages from './Messages';
import Settings from './Settings';
import { checkVolunteerAuth } from '../../utils/volunteerAuth';

const VolunteerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication on mount
    const isAuthenticated = checkVolunteerAuth();
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Handle mobile detection and sidebar auto-collapse
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <VolunteerProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
        />
        
        {/* Main Content Area */}
        <div 
          className="flex-1 flex flex-col w-full lg:ml-0"
          style={{
            marginLeft: isMobile ? '0' : (sidebarCollapsed ? '80px' : '260px'),
            transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Navbar */}
          <Navbar 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            isMobile={isMobile}
          />
          
          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/my-tasks" element={<MyTasks />} />
                <Route path="/my-activity" element={<MyActivity />} />
                <Route path="/training" element={<Training />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </VolunteerProvider>
  );
};

export default VolunteerDashboard;
