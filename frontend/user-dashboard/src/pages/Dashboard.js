import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import AIVoiceInteraction from '../components/AIVoiceInteraction';
import IssueCategoryChart from '../components/IssueCategoryChart';
import IssueTrendChart from '../components/IssueTrendChart';
import PreviousIssues from '../components/PreviousIssues';
import './Dashboard.css';

const Dashboard = () => {
  const { userData, getGreeting } = useUser();

  return (
    <div className="dashboard-page">
      <motion.div
        className="greeting-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>{getGreeting()}, {userData.name}</h2>
        <p>Here's your activity summary</p>
      </motion.div>

      <div className="dashboard-grid">
        <div className="dashboard-left">
          <AIVoiceInteraction />
          
          <div className="analytics-section">
            <IssueCategoryChart />
            <IssueTrendChart />
          </div>
        </div>

        <div className="dashboard-right">
          <PreviousIssues />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
