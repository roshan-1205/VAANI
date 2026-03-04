export const generateMockData = () => {
  return {
    kpis: {
      activeUsers: Math.floor(1200 + Math.random() * 200),
      callsToday: Math.floor(500 + Math.random() * 100),
      avgResponseTime: (1.5 + Math.random() * 0.5).toFixed(1),
      successRate: (93 + Math.random() * 3).toFixed(1)
    },
    activityData: Array.from({ length: 6 }, (_, i) => ({
      time: `${i * 4}:00`,
      calls: Math.floor(40 + Math.random() * 120),
      resolved: Math.floor(35 + Math.random() * 110)
    })),
    serviceData: [
      { name: 'Healthcare', value: 29, color: '#3b82f6' },
      { name: 'Welfare', value: 24, color: '#f59e0b' },
      { name: 'Education', value: 26, color: '#10b981' },
      { name: 'Legal Aid', value: 21, color: '#8b5cf6' }
    ],
    languageData: [
      { name: 'Hindi', value: 3200 },
      { name: 'Bengali', value: 2400 },
      { name: 'Tamil', value: 1800 },
      { name: 'Telugu', value: 1600 },
      { name: 'Marathi', value: 1200 }
    ]
  };
};

export const exportToCSV = (data, filename) => {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};
