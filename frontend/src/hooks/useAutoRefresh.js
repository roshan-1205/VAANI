import { useState, useEffect } from 'react';

export const useAutoRefresh = (callback, interval = 30000) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      callback();
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, callback, interval]);

  return [isActive, setIsActive];
};
