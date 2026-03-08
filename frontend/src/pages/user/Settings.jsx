import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe } from 'lucide-react';

const Settings = () => {
  // Get user data from sessionStorage
  const getUserData = () => {
    const storedEmail = sessionStorage.getItem('userEmail') || '';
    const storedName = sessionStorage.getItem('userName') || '';
    const displayName = storedName || (storedEmail ? storedEmail.split('@')[0] : 'User');
    
    return {
      fullName: displayName,
      email: storedEmail || 'user@vaani.gov.in',
      phone: '+91 98765 43210',
      location: 'India'
    };
  };
  
  const [userData, setUserData] = useState(getUserData());
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    language: 'english',
    twoFactor: false
  });
  
  // Update user data when sessionStorage changes
  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: userData.fullName, type: 'text' },
        { label: 'Email', value: userData.email, type: 'text' },
        { label: 'Phone', value: userData.phone, type: 'text' },
        { label: 'Location', value: userData.location, type: 'text' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', key: 'emailNotifications', type: 'toggle' },
        { label: 'SMS Notifications', key: 'smsNotifications', type: 'toggle' },
        { label: 'Push Notifications', key: 'pushNotifications', type: 'toggle' }
      ]
    },
    {
      title: 'Security',
      icon: Lock,
      items: [
        { label: 'Two-Factor Authentication', key: 'twoFactor', type: 'toggle' },
        { label: 'Change Password', type: 'button' },
        { label: 'Active Sessions', type: 'button' }
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      items: [
        { label: 'Language', key: 'language', type: 'select', options: ['English', 'Hindi', 'Tamil', 'Telugu'] },
        { label: 'Dark Mode', key: 'darkMode', type: 'toggle' }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen w-full pb-20 sm:pb-8">
      {/* Header */}
      <motion.div
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-poppins text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01070f] m-0 mb-1 sm:mb-2">Settings</h1>
        <p className="font-poppins text-xs sm:text-sm text-[#01070f]/60 m-0">Manage your account and preferences</p>
      </motion.div>

      {/* Settings Sections */}
      <div className="flex flex-col gap-4 sm:gap-6 max-w-[900px] mx-auto">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            className="bg-[#01070f] rounded-2xl sm:rounded-3xl p-5 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#8b5cf6]/20 rounded-[10px] flex items-center justify-center text-[#8b5cf6] flex-shrink-0">
                <section.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h2 className="font-poppins text-lg sm:text-xl font-semibold text-white m-0">{section.title}</h2>
            </div>

            {/* Section Items */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-white/10 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <span className="font-poppins text-sm sm:text-[15px] text-white font-medium">{item.label}</span>
                  </div>
                  
                  <div className="w-full sm:w-auto flex-shrink-0">
                    {item.type === 'text' && (
                      <input 
                        type="text" 
                        value={item.value} 
                        readOnly 
                        className="w-full sm:min-w-[250px] px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-[10px] text-white font-poppins text-xs sm:text-sm" 
                      />
                    )}
                    
                    {item.type === 'toggle' && (
                      <label className="relative inline-block w-[48px] h-6 sm:w-[52px] sm:h-7">
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={() => handleToggle(item.key)}
                          className="opacity-0 w-0 h-0"
                        />
                        <span className={`absolute cursor-pointer inset-0 ${settings[item.key] ? 'bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]' : 'bg-white/10'} transition-all duration-300 rounded-[28px] before:content-[''] before:absolute before:h-[18px] before:w-[18px] sm:before:h-5 sm:before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full ${settings[item.key] ? 'before:translate-x-[22px] sm:before:translate-x-6' : ''}`}></span>
                      </label>
                    )}
                    
                    {item.type === 'select' && (
                      <select 
                        value={settings[item.key]} 
                        onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.value }))} 
                        className="w-full sm:min-w-[150px] px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-[10px] text-white font-poppins text-xs sm:text-sm cursor-pointer"
                      >
                        {item.options.map((option, i) => (
                          <option key={i} value={option.toLowerCase()} className="bg-[#01070f] text-white">{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {item.type === 'button' && (
                      <button className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-[10px] text-[#8b5cf6] font-poppins text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-[#8b5cf6]/30 hover:-translate-y-0.5 active:scale-95">{item.label}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl sm:rounded-2xl p-5 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-poppins text-base sm:text-lg font-semibold text-[#ef4444] m-0 mb-3 sm:mb-4">Danger Zone</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-[10px] text-[#ef4444] font-poppins text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-[#ef4444]/30 hover:-translate-y-0.5 active:scale-95">Deactivate Account</button>
            <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-[10px] text-[#ef4444] font-poppins text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-[#ef4444]/30 hover:-translate-y-0.5 active:scale-95">Delete Account</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
