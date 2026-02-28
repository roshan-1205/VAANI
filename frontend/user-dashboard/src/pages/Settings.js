import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe, Moon, Shield, Mail, Phone } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    language: 'english',
    twoFactor: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: 'Aayush Kumar', type: 'text' },
        { label: 'Email', value: 'aayush@vaani.gov.in', type: 'text' },
        { label: 'Phone', value: '+91 98765 43210', type: 'text' },
        { label: 'Location', value: 'New Delhi, India', type: 'text' }
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
    <div className="settings-page">
      <motion.div
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </motion.div>

      <div className="settings-content">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
          >
            <div className="section-header">
              <div className="section-icon">
                <section.icon size={24} />
              </div>
              <h2>{section.title}</h2>
            </div>

            <div className="settings-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="setting-item">
                  <div className="setting-label">
                    <span>{item.label}</span>
                  </div>
                  
                  <div className="setting-control">
                    {item.type === 'text' && (
                      <input type="text" value={item.value} readOnly />
                    )}
                    
                    {item.type === 'toggle' && (
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={() => handleToggle(item.key)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    )}
                    
                    {item.type === 'select' && (
                      <select value={settings[item.key]} onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.value }))}>
                        {item.options.map((option, i) => (
                          <option key={i} value={option.toLowerCase()}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {item.type === 'button' && (
                      <button className="action-button">{item.label}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          className="danger-zone"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Danger Zone</h3>
          <div className="danger-actions">
            <button className="danger-btn">Deactivate Account</button>
            <button className="danger-btn">Delete Account</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
