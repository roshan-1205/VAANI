import React from 'react';
import KPICards from '../components/KPICards';
import ActivityChart from '../components/ActivityChart';
import ServiceChart from '../components/ServiceChart';
import LanguageChart from '../components/LanguageChart';
import RecentActivity from '../components/RecentActivity';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="grid-full">
          <KPICards />
        </div>
        
        <div className="grid-left">
          <ActivityChart />
        </div>
        
        <div className="grid-right">
          <ServiceChart />
        </div>
        
        <div className="grid-left">
          <LanguageChart />
        </div>
        
        <div className="grid-right">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
