import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Aayush',
    email: 'aayush@vaani.gov.in',
    role: 'User',
    avatar: 'A'
  });

  const [systemStatus, setSystemStatus] = useState({
    online: true,
    pending: 2,
    critical: 0
  });

  const [notifications, setNotifications] = useState(3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setNotifications(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ 
      userData, 
      systemStatus, 
      notifications, 
      setNotifications,
      getGreeting 
    }}>
      {children}
    </UserContext.Provider>
  );
};
