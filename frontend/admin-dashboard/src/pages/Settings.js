import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, Database, Save, ChevronDown, Mail, Lock, Key, Download, Trash2, Clock } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [settings, setSettings] = useState({
    // Profile
    fullName: 'Admin User',
    email: 'admin@dashboard.com',
    role: 'Administrator',
    
    // Notifications
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true,
    
    // Security
    twoFactorAuth: true,
    sessionTimeout: '30',
    loginAlerts: true,
    
    // Language & Region
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Appearance
    darkMode: true,
    compactView: false,
    animationsEnabled: true,
    
    // Data Management
    dataRetention: '90',
    autoBackup: true,
    exportFormat: 'json'
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const settingsSections = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information',
      color: '#3b82f6',
      content: (
        <div className="section-content">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={settings.role} onChange={(e) => handleChange('role', e.target.value)}>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <button className="btn-secondary">
            <User size={16} />
            Update Profile
          </button>
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
        <div className="section-content">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Push Notifications</span>
              <span className="setting-description">Receive real-time browser notifications</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Alerts</span>
              <span className="setting-description">Get important updates via email</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={() => handleToggle('emailAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">SMS Alerts</span>
              <span className="setting-description">Receive critical alerts via SMS</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={() => handleToggle('smsAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Weekly Reports</span>
              <span className="setting-description">Receive weekly summary reports</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={() => handleToggle('weeklyReports')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security',
      description: 'Security and privacy settings',
      color: '#ef4444',
      content: (
        <div className="section-content">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Two-Factor Authentication</span>
              <span className="setting-description">Add an extra layer of security</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="form-group">
            <label>Session Timeout (minutes)</label>
            <select value={settings.sessionTimeout} onChange={(e) => handleChange('sessionTimeout', e.target.value)}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Login Alerts</span>
              <span className="setting-description">Get notified of new login attempts</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={() => handleToggle('loginAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <button className="btn-secondary">
            <Key size={16} />
            Change Password
          </button>
        </div>
      )
    },
    {
      id: 'language',
      icon: Globe,
      title: 'Language & Region',
      description: 'Localization preferences',
      color: '#8b5cf6',
      content: (
        <div className="section-content">
          <div className="form-group">
            <label>Language</label>
            <select value={settings.language} onChange={(e) => handleChange('language', e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select value={settings.timezone} onChange={(e) => handleChange('timezone', e.target.value)}>
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
              <option value="IST">Indian Standard Time</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date Format</label>
            <select value={settings.dateFormat} onChange={(e) => handleChange('dateFormat', e.target.value)}>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      icon: Palette,
      title: 'Appearance',
      description: 'Customize dashboard appearance',
      color: '#f59e0b',
      content: (
        <div className="section-content">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-description">Use dark theme for the dashboard</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Compact View</span>
              <span className="setting-description">Reduce spacing for more content</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.compactView}
                onChange={() => handleToggle('compactView')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Animations</span>
              <span className="setting-description">Enable smooth transitions and effects</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={() => handleToggle('animationsEnabled')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'data',
      icon: Database,
      title: 'Data Management',
      description: 'Data retention and export',
      color: '#06b6d4',
      content: (
        <div className="section-content">
          <div className="form-group">
            <label>Data Retention Period (days)</label>
            <select value={settings.dataRetention} onChange={(e) => handleChange('dataRetention', e.target.value)}>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Auto Backup</span>
              <span className="setting-description">Automatically backup data daily</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={() => handleToggle('autoBackup')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="form-group">
            <label>Export Format</label>
            <select value={settings.exportFormat} onChange={(e) => handleChange('exportFormat', e.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>
          <div className="action-buttons">
            <button className="btn-secondary">
              <Download size={16} />
              Export Data
            </button>
            <button className="btn-danger">
              <Trash2 size={16} />
              Clear All Data
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="settings-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Settings</h1>
          <p>Configure your dashboard preferences</p>
        </div>
        <button 
          className={`btn-primary ${saveStatus}`}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
        >
          <Save size={18} />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
        </button>
      </motion.div>

      <div className="settings-grid">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`settings-card ${activeSection === section.id ? 'active' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          >
            <div className="settings-card-header">
              <div className="settings-icon" style={{ background: `${section.color}20`, color: section.color }}>
                <section.icon size={24} />
              </div>
              <div className="settings-card-info">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <motion.div
                className="expand-icon"
                animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="settings-card-content"
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
