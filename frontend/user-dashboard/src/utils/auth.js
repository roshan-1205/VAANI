// User Dashboard Authentication Guard
export const checkUserAuth = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  console.log('🔒 User Dashboard - Checking auth. Role:', userRole);
  
  // Only 'user' role can access user dashboard
  if (userRole !== 'user') {
    console.log('❌ Access denied. Redirecting to login...');
    window.location.href = 'http://localhost:5173/login';
    return false;
  }
  
  console.log('✅ Access granted');
  return true;
};
