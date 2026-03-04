import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Globe, ChevronDown, Save } from 'lucide-react';

const Settings = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Get user data from sessionStorage
  const getUserData = () => {
    const storedEmail = sessionStorage.getItem('userEmail') || '';
    const storedName = sessionStorage.getItem('userName') || '';
    const displayName = storedName || (storedEmail ? storedEmail.split('@')[0] : 'Volunteer');
    
    return {
      fullName: displayName,
      email: storedEmail || 'volunteer@vaani.gov.in',
      phone: '+91 98765 43210',
      location: 'India'
    };
  };
  
  const [settings, setSettings] = useState({
    ...getUserData(),
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    taskReminders: true,
    profileVisibility: 'public',
    showActivity: true,
    dataSharing: false,
    language: 'english',
    timezone: 'IST'
  });
  
  // Update settings when sessionStorage changes
  useEffect(() => {
    const userData = getUserData();
    setSettings(prev => ({
      ...prev,
      fullName: userData.fullName,
      email: userData.email
    }));
  }, []);

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
            <input type="text" value={settings.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={settings.email} onChange={(e) => handleInputChange('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={settings.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={settings.location} onChange={(e) => handleInputChange('location', e.target.value)} />
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
              <input type="checkbox" checked={settings.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>SMS Notifications</h4>
              <p>Receive updates via SMS</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.smsNotifications} onChange={() => handleToggle('smsNotifications')} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Push Notifications</h4>
              <p>Receive push notifications</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.pushNotifications} onChange={() => handleToggle('pushNotifications')} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Task Reminders</h4>
              <p>Get reminders for upcoming tasks</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.taskReminders} onChange={() => handleToggle('taskReminders')} />
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
            <select value={settings.profileVisibility} onChange={(e) => handleInputChange('profileVisibility', e.target.value)} className="settings-select">
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
              <input type="checkbox" checked={settings.showActivity} onChange={() => handleToggle('showActivity')} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <div>
              <h4>Data Sharing</h4>
              <p>Share analytics data for improvement</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.dataSharing} onChange={() => handleToggle('dataSharing')} />
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
            <select value={settings.language} onChange={(e) => handleInputChange('language', e.target.value)} className="settings-select">
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
              <option value="bengali">Bengali</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select value={settings.timezone} onChange={(e) => handleInputChange('timezone', e.target.value)} className="settings-select">
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
      <motion.div className="settings-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
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
          <motion.div key={section.id} className="settings-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
            <div className="section-header" onClick={() => toggleSection(section.id)}>
              <div className="section-header-left">
                <div className="section-icon" style={{ backgroundColor: `${section.color}20`, color: section.color }}>
                  <section.icon size={24} />
                </div>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              </div>
              <ChevronDown size={20} className={`chevron ${expandedSection === section.id ? 'rotated' : ''}`} />
            </div>

            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div className="section-content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
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

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
.settings-page { padding: 24px; min-height: calc(100vh - 80px); max-width: 1000px; margin: 0 auto; background: white; }
.settings-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
.settings-header h1 { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 700; color: #01070f; margin: 0 0 8px 0; }
.settings-header p { font-family: 'Poppins', sans-serif; font-size: 14px; color: #6b7280; margin: 0; }
.save-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 12px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.save-btn:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3); }
.settings-sections { display: flex; flex-direction: column; gap: 16px; }
.settings-section { background: #01070f; border-radius: 16px; overflow: hidden; }
.section-header { display: flex; justify-content: space-between; align-items: center; padding: 24px; cursor: pointer; transition: all 0.3s ease; }
.section-header:hover { background: rgba(255, 255, 255, 0.03); }
.section-header-left { display: flex; align-items: center; gap: 16px; flex: 1; }
.section-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.section-header h3 { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 600; color: white; margin: 0 0 4px 0; }
.section-header p { font-family: 'Poppins', sans-serif; font-size: 13px; color: rgba(255, 255, 255, 0.6); margin: 0; }
.chevron { color: rgba(255, 255, 255, 0.5); transition: transform 0.3s ease; flex-shrink: 0; }
.chevron.rotated { transform: rotate(180deg); }
.section-content { padding: 0 24px 24px 24px; overflow: hidden; }
.settings-form { display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: white; }
.form-group input, .settings-select { padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; font-family: 'Poppins', sans-serif; font-size: 14px; transition: all 0.3s ease; }
.form-group input:focus, .settings-select:focus { outline: none; border-color: #10b981; background: rgba(255, 255, 255, 0.08); }
.settings-select { cursor: pointer; }
.settings-select option { background: #01070f; color: white; }
.settings-toggles { display: flex; flex-direction: column; gap: 20px; }
.toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; gap: 16px; }
.toggle-item h4 { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: white; margin: 0 0 4px 0; }
.toggle-item p { font-family: 'Poppins', sans-serif; font-size: 13px; color: rgba(255, 255, 255, 0.6); margin: 0; }
.toggle-switch { position: relative; display: inline-block; width: 52px; height: 28px; flex-shrink: 0; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255, 255, 255, 0.1); transition: 0.3s; border-radius: 28px; }
.toggle-slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: 0.3s; border-radius: 50%; }
.toggle-switch input:checked + .toggle-slider { background: #10b981; }
.toggle-switch input:checked + .toggle-slider:before { transform: translateX(24px); }
@media (max-width: 768px) { .settings-page { padding: 16px; } .settings-header { flex-direction: column; gap: 16px; } .save-btn { width: 100%; justify-content: center; } .section-header-left { flex-direction: column; align-items: flex-start; } .toggle-item { flex-direction: column; align-items: flex-start; } }
`;
if (!document.getElementById('settings-styles')) {
  styleSheet.id = 'settings-styles';
  document.head.appendChild(styleSheet);
}

export default Settings;
