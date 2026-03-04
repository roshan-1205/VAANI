// User Dashboard Authentication Guard
export const checkUserAuth = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  console.log('🔒 User Dashboard - Checking auth. Role:', userRole);
  
  // TEMPORARY: Allow access for testing
  // TODO: Re-enable authentication check after testing
  if (!userRole) {
    console.log('⚠️ No role found, but allowing access for testing');
    // Set temporary user data for testing
    sessionStorage.setItem('userRole', 'user');
    sessionStorage.setItem('userName', 'Test User');
    sessionStorage.setItem('userEmail', 'test@vaani.gov.in');
    return true;
  }
  
  // Only 'user' role can access user dashboard
  if (userRole !== 'user') {
    console.log('❌ Access denied. Redirecting to login...');
    window.location.href = 'http://localhost:5173/login';
    return false;
  }
  
  console.log('✅ Access granted');
  return true;
};
