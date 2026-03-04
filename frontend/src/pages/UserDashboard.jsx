import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout, getToken } from '../services/authService';
import AIVoiceInteraction from '../../user-dashboard/src/components/AIVoiceInteraction';

function UserDashboard() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || role !== 'user')) {
      navigate('/login');
    }
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <div className="space-y-2">
            <p><span className="font-medium">UID:</span> {user?.uid}</p>
            <p><span className="font-medium">Role:</span> {role}</p>
            <p><span className="font-medium">Email Verified:</span> {user?.emailVerified ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Voice Assistant Component */}
        <div className="mb-6">
          <AIVoiceInteraction />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {dashboardData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">{dashboardData.message}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Available Services:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {dashboardData.data.services.map((service, index) => (
                    <li key={index} className="text-gray-600">{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Access Level: {dashboardData.data.access_level}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserDashboard;
