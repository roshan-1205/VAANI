import React from 'react';
import KPICards from '../components/KPICards';
import ProgressBars from '../components/ProgressBars';
import StatusDistribution from '../components/StatusDistribution';
import SatisfactionGauge from '../components/SatisfactionGauge';
import './Overview.css';

const Overview = () => {
  return (
    <div className="overview-page">
      <KPICards />
      <ProgressBars />
      
      <div className="charts-grid">
        <StatusDistribution />
        <SatisfactionGauge />
      </div>
    </div>
  );
};

export default Overview;
