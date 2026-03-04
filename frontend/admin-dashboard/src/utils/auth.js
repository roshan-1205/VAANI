// Admin Dashboard Authentication Guard
export const checkAdminAuth = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  console.log('🔒 Admin Dashboard - Checking auth. Role:', userRole);
  
  // Only 'admin' role can access admin dashboard
  if (userRole !== 'admin') {
    console.log('❌ Access denied. Redirecting to login...');
    window.location.href = 'http://localhost:5173/login';
    return false;
  }
  
  console.log('✅ Access granted');
  return true;
};
