import React, { createContext, useContext, useState } from 'react';

const VolunteerContext = createContext();

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within VolunteerProvider');
  }
  return context;
};

export const VolunteerProvider = ({ children }) => {
  const [volunteerData, setVolunteerData] = useState({
    name: 'Priya Sharma',
    role: 'Volunteer',
    status: 'online',
    engagementRate: 85,
    taskCompletion: 90,
    trainingCompletion: 75,
    feedbackScore: 4.5
  });

  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
    setVolunteerData(prev => ({
      ...prev,
      status: !isOnline ? 'online' : 'offline'
    }));
  };

  return (
    <VolunteerContext.Provider value={{ volunteerData, isOnline, toggleStatus }}>
      {children}
    </VolunteerContext.Provider>
  );
};
