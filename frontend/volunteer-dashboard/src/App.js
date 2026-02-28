import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VolunteerProvider } from './context/VolunteerContext';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Overview from './pages/Overview';
import MyTasks from './pages/MyTasks';
import MyActivity from './pages/MyActivity';
import Training from './pages/Training';
import Performance from './pages/Performance';
import Messages from './pages/Messages';
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
    <VolunteerProvider>
      <Router>
        <div className="app">
          <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
            <Navbar />
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
        </div>
      </Router>
    </VolunteerProvider>
  );
}

export default App;
