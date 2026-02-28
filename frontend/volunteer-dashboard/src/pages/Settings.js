import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Globe, ChevronDown, Save } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [settings, setSettings] = useState({
    // Profile Settings
    fullName: 'Priya Sharma',
    email: 'priya.sharma@vaani.gov.in',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    taskReminders: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showActivity: true,
    dataSharing: false,
    
    // Language Settings
    language: 'english',
    timezone: 'IST'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const settingsSections = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information',
      color: '#8b5cf6',
      content: (
        <div className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      color: '#10b981',
      content: (
        <div className="settings-toggles">
          <div className="toggle-item">
            <div>
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>SMS Notifications</h4>
              <p>Receive updates via SMS</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Push Notifications</h4>
              <p>Receive push notifications</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Task Reminders</h4>
              <p>Get reminders for upcoming tasks</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.taskReminders}
                onChange={() => handleToggle('taskReminders')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy',
      description: 'Privacy and security settings',
      color: '#3b82f6',
      content: (
        <div className="settings-toggles">
          <div className="toggle-item">
            <div>
              <h4>Profile Visibility</h4>
              <p>Control who can see your profile</p>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
              className="settings-select"
            >
              <option value="public">Public</option>
              <option value="volunteers">Volunteers Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Show Activity</h4>
              <p>Display your activity to others</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.showActivity}
                onChange={() => handleToggle('showActivity')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Data Sharing</h4>
              <p>Share analytics data for improvement</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.dataSharing}
                onChange={() => handleToggle('dataSharing')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'language',
      icon: Globe,
      title: 'Language',
      description: 'Language preferences',
      color: '#f59e0b',
      content: (
        <div className="settings-form">
          <div className="form-group">
            <label>Preferred Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="settings-select"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
              <option value="bengali">Bengali</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="settings-select"
            >
              <option value="IST">IST (Indian Standard Time)</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="settings-page">
      <motion.div
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Settings</h1>
          <p>Manage your preferences and account settings</p>
        </div>
        <button className="save-btn" onClick={handleSave}>
          <Save size={18} />
          Save Changes
        </button>
      </motion.div>

      <div className="settings-sections">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.id}
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-header-left">
                <div
                  className="section-icon"
                  style={{ backgroundColor: `${section.color}20`, color: section.color }}
                >
                  <section.icon size={24} />
                </div>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`chevron ${expandedSection === section.id ? 'rotated' : ''}`}
              />
            </div>

            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  className="section-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
