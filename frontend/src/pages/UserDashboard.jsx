import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout, getToken } from '../services/authService';
import VoiceCommandAssistant from '../components/VoiceCommandAssistant';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || role !== 'user')) {
      navigate('/login');
    }

    // Listen for voice command events
    const handleVoiceLogout = () => {
      handleLogout();
    };

    window.addEventListener('voice-logout', handleVoiceLogout);

    return () => {
      window.removeEventListener('voice-logout', handleVoiceLogout);
    };
  }, [user, role, loading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:8000/api/user-dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          setError('Failed to load dashboard data');
        }
      } catch (err) {
        setError('Error connecting to server');
      }
    };

    if (user && role === 'user') {
      fetchDashboardData();
    }
  }, [user, role]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <h1 className="dashboard-title">User Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Card */}
        <div className="welcome-card">
          <h2 className="welcome-title">
            Welcome, <span className="welcome-email">{user?.email}</span>
          </h2>
          <div className="user-info-grid">
            <div className="user-info-row">
              <span className="user-info-label">UID:</span>
              <span className="user-info-value">{user?.uid}</span>
            </div>
            <div className="user-info-row">
              <span className="user-info-label">Role:</span>
              <span className="user-info-value" style={{ textTransform: 'capitalize' }}>{role}</span>
            </div>
            <div className="user-info-row">
              <span className="user-info-label">Email Verified:</span>
              <span className={`user-info-value ${user?.emailVerified ? 'verified-yes' : 'verified-no'}`}>
                {user?.emailVerified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Voice Command Assistant */}
        <div className="voice-assistant-wrapper">
          <VoiceCommandAssistant />
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-card">
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Dashboard Data */}
        {dashboardData && (
          <div className="dashboard-data-card">
            <h3 className="dashboard-data-title">{dashboardData.message}</h3>
            <div className="services-section">
              <h4 className="services-title">Available Services:</h4>
              <ul className="services-list">
                {dashboardData.data.services.map((service, index) => (
                  <li key={index} className="service-item">
                    <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="access-level-section">
              <p className="access-level-text">
                <span className="access-level-label">Access Level:</span> {dashboardData.data.access_level}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserDashboard;
