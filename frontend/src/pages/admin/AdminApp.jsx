import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../../layout/AdminSidebar';
import AdminNavbar from '../../layout/AdminNavbar';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Users from './Users';
import Services from './Services';
import LanguageInsights from './LanguageInsights';
import Settings from './Settings';
import LoadingScreen from '../../components/admin/LoadingScreen';
import { checkAdminAuth } from '../../utils/adminAuth';

function AdminApp() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    const isAuthenticated = checkAdminAuth();
    
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-[#0a1628]">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-[260px]'} max-md:ml-0`}>
        <AdminNavbar />
        <div className="bg-[#0a1628]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/language-insights" element={<LanguageInsights />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;
