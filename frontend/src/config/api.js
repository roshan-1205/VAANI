// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-vanni-166b8.cloudfunctions.net/api';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  CHAT: `${API_BASE_URL}/chat`,
  VOICE: `${API_BASE_URL}/voice`,
  USERS: `${API_BASE_URL}/users`,
  COMPLAINTS: `${API_BASE_URL}/complaints`,
};

export default API_BASE_URL;
