// Volunteer Dashboard Authentication Guard
export const checkVolunteerAuth = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  console.log('🔒 Volunteer Dashboard - Checking auth. Role:', userRole);
  
  // Only 'volunteer' role can access volunteer dashboard
  if (userRole !== 'volunteer') {
    console.log('❌ Access denied. Redirecting to login...');
    window.location.href = 'http://localhost:5173/login';
    return false;
  }
  
  console.log('✅ Access granted');
  return true;
};
