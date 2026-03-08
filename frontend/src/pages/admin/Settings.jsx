import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, Database, Save, ChevronDown, Mail, Lock, Key, Download, Trash2, Clock } from 'lucide-react';

const Settings = () => {
  // Inject CSS
  useEffect(() => {
    const styleId = 'settings-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .settings-page { padding: 32px; max-width: 1400px; margin: 0 auto; background: #e2e2e2; min-height: 100vh; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .page-header h1 { color: black; font-size: 32px; font-weight: 700; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .page-header p { color: rgba(0, 0, 0, 0.6); font-size: 14px; }
        .btn-primary { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-primary.saved { background: #10b981; }
        .settings-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .settings-card { background: #01070f; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); cursor: pointer; transition: all 0.3s ease; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05); }
        .settings-card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
        .settings-card.active { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3); border-color: rgba(59, 130, 246, 0.3); }
        .settings-card-header { display: flex; gap: 16px; align-items: center; padding: 24px; position: relative; }
        .settings-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .settings-card-info { flex: 1; }
        .settings-card h3 { color: white; font-size: 18px; font-weight: 600; margin-bottom: 4px; font-family: 'Montserrat', sans-serif; }
        .settings-card p { color: rgba(255, 255, 255, 0.6); font-size: 13px; }
        .expand-icon { color: rgba(255, 255, 255, 0.5); transition: color 0.3s ease; }
        .settings-card:hover .expand-icon { color: rgba(255, 255, 255, 0.8); }
        .settings-card-content { border-top: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; }
        .section-content { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { color: white; font-size: 14px; font-weight: 600; }
        .form-group input, .form-group select { padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 14px; transition: all 0.3s ease; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #3b82f6; background: rgba(255, 255, 255, 0.08); }
        .form-group select { cursor: pointer; }
        .form-group input::placeholder { color: rgba(255, 255, 255, 0.4); }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; transition: background 0.3s ease; }
        .setting-item:hover { background: rgba(255, 255, 255, 0.08); }
        .setting-info { display: flex; flex-direction: column; gap: 4px; }
        .setting-label { color: white; font-size: 14px; font-weight: 600; }
        .setting-description { color: rgba(255, 255, 255, 0.5); font-size: 12px; }
        .toggle { position: relative; display: inline-block; width: 48px; height: 24px; flex-shrink: 0; }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255, 255, 255, 0.2); transition: 0.4s; border-radius: 24px; }
        .toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: 0.4s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); }
        .toggle input:checked + .toggle-slider { background-color: #3b82f6; }
        .toggle input:checked + .toggle-slider:before { transform: translateX(24px); }
        .toggle:hover .toggle-slider { background-color: rgba(255, 255, 255, 0.3); }
        .toggle input:checked:hover + .toggle-slider { background-color: #2563eb; }
        .btn-secondary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; align-self: flex-start; }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
        .btn-danger { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; align-self: flex-start; }
        .btn-danger:hover { background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); transform: translateY(-2px); }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .settings-page { padding: 16px; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .btn-primary { width: 100%; justify-content: center; }
          .settings-card-header { padding: 20px; }
          .section-content { padding: 20px; }
          .action-buttons { flex-direction: column; }
          .btn-secondary, .btn-danger { width: 100%; justify-content: center; }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

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
