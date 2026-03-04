import React, { createContext, useContext, useState, useEffect } from 'react';

const VolunteerContext = createContext();

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within VolunteerProvider');
  }
  return context;
};

export const VolunteerProvider = ({ children }) => {
  // Get volunteer data from sessionStorage or localStorage
  const getStoredVolunteerData = () => {
    const storedEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    const storedName = sessionStorage.getItem('userName') || localStorage.getItem('userName');
    
    // Extract name from email if no userName is stored
    const displayName = storedName || (storedEmail ? storedEmail.split('@')[0] : 'Volunteer');
    
    return {
      name: displayName,
      role: 'Volunteer',
      status: 'online',
      engagementRate: 85,
      taskCompletion: 90,
      trainingCompletion: 75,
      feedbackScore: 4.5,
      email: storedEmail || 'volunteer@vaani.gov.in'
    };
  };

  const [volunteerData, setVolunteerData] = useState(getStoredVolunteerData());

  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
    setVolunteerData(prev => ({
      ...prev,
      status: !isOnline ? 'online' : 'offline'
    }));
  };

  const handleLogout = () => {
    // Clear any stored user data
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to main frontend homepage (port 5173) and replace history
    window.location.replace('http://localhost:5173/');
  };

  // Update volunteerData when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setVolunteerData(getStoredVolunteerData());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates on mount
    const updatedData = getStoredVolunteerData();
    if (updatedData.name !== volunteerData.name || updatedData.email !== volunteerData.email) {
      setVolunteerData(updatedData);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <VolunteerContext.Provider value={{ volunteerData, setVolunteerData, isOnline, toggleStatus, handleLogout }}>
      {children}
    </VolunteerContext.Provider>
  );
};
