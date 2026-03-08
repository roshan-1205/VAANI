// API Configuration
const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || 'https://vaani-ai-backend-production-8cab.up.railway.app';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // AI Backend endpoints
  AI_HEALTH: `${AI_BACKEND_URL}/health`,
  AI_CHAT: `${AI_BACKEND_URL}/chat`,
  AI_VOICE: `${AI_BACKEND_URL}/voice`,
  
  // FastAPI Backend endpoints (will be added later)
  HEALTH: `${API_BASE_URL}/health`,
  USERS: `${API_BASE_URL}/users`,
  COMPLAINTS: `${API_BASE_URL}/complaints`,
};

export { AI_BACKEND_URL };
export default API_BASE_URL;
