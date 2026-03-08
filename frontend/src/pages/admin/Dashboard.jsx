import React from 'react';
import KPICards from '../../components/admin/KPICards';
import ActivityChart from '../../components/admin/ActivityChart';
import ServiceChart from '../../components/admin/ServiceChart';
import LanguageChart from '../../components/admin/LanguageChart';
import RecentActivity from '../../components/admin/RecentActivity';

const Dashboard = () => {
  return (
    <div className="p-8 max-lg:p-6 max-md:p-4 max-sm:p-3">
      <div className="grid grid-cols-2 gap-6 max-lg:gap-5 max-md:gap-4 max-lg:grid-cols-1">
        <div className="col-span-2">
          <KPICards />
        </div>
        
        <div className="col-span-1 max-lg:col-span-1">
          <ActivityChart />
        </div>
        
        <div className="col-span-1 max-lg:col-span-1">
          <ServiceChart />
        </div>
        
        <div className="col-span-1 max-lg:col-span-1">
          <LanguageChart />
        </div>
        
        <div className="col-span-1 max-lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
