// Volunteer Dashboard Authentication Guard
export const checkVolunteerAuth = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  console.log('🔒 Volunteer Dashboard - Checking auth. Role:', userRole);
  
  // FOR DEVELOPMENT: Temporarily bypass authentication
  // TODO: Remove this in production
  if (!userRole) {
    console.log('⚠️ DEV MODE: Setting volunteer role for testing');
    sessionStorage.setItem('userRole', 'volunteer');
    sessionStorage.setItem('userName', 'Test Volunteer');
    sessionStorage.setItem('userEmail', 'volunteer@test.com');
    return true;
  }
  
  // Only 'volunteer' role can access volunteer dashboard
  if (userRole !== 'volunteer') {
    console.log('❌ Access denied. Redirecting to login...');
    window.location.href = '/login';
    return false;
  }
  
  console.log('✅ Access granted');
  return true;
};
