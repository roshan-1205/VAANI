import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Signup with Email and Password
export const signupWithEmail = async (email, password, role) => {
  try {
    // Validate role
    if (!['user', 'volunteer'].includes(role)) {
      throw new Error('Invalid role. Only user and volunteer can signup.');
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role,
      createdAt: new Date().toISOString(),
      displayName: user.displayName || email.split('@')[0]
    });
    
    console.log('✅ User created with role:', role);
    
    return {
      success: true,
      user,
      role
    };
  } catch (error) {
    console.error('❌ Signup error:', error);
    throw new Error(error.message);
  }
};

// Login with Email and Password
export const loginWithEmail = async (email, password) => {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user role from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('User document not found in Firestore for UID:', user.uid);
      throw new Error('User data not found. Please contact administrator.');
    }
    
    const userData = userDoc.data();
    const role = userData.role;
    
    console.log('✅ Login successful. Role:', role);
    
    // Store in sessionStorage
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userEmail', user.email);
    sessionStorage.setItem('userId', user.uid);
    
    return {
      success: true,
      user,
      role
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    
    // User-friendly error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    } else if (error.code === 'unavailable' || error.message.includes('offline')) {
      throw new Error('Cannot connect to database. Please check your internet connection.');
    } else {
      throw new Error(error.message);
    }
  }
};

// Google Sign In
export const loginWithGoogle = async (role = null) => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user already exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      // Existing user - get their role
      const userData = userDoc.data();
      const existingRole = userData.role;
      
      console.log('✅ Existing user login. Role:', existingRole);
      
      // Store in sessionStorage
      sessionStorage.setItem('userRole', existingRole);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userId', user.uid);
      
      return {
        success: true,
        user,
        role: existingRole
      };
    } else {
      // New user - need to set role
      if (!role || !['user', 'volunteer'].includes(role)) {
        throw new Error('Please select a role (User or Volunteer) to continue.');
      }
      
      // Create new user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date().toISOString(),
        displayName: user.displayName || user.email.split('@')[0]
      });
      
      console.log('✅ New Google user created with role:', role);
      
      // Store in sessionStorage
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userId', user.uid);
      
      return {
        success: true,
        user,
        role
      };
    }
  } catch (error) {
    console.error('❌ Google login error:', error);
    throw new Error(error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    
    // Clear sessionStorage
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
    
    console.log('✅ Logout successful');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw new Error(error.message);
  }
};

// Get current user role
export const getCurrentUserRole = async () => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return null;
    }
    
    // Check sessionStorage first
    const cachedRole = sessionStorage.getItem('userRole');
    if (cachedRole) {
      return cachedRole;
    }
    
    // Get from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      sessionStorage.setItem('userRole', role);
      return role;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error getting user role:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Get Firebase ID token for API requests
export const getToken = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error('❌ Error getting token:', error);
    throw error;
  }
};

// Phone Authentication (Placeholder - Not fully implemented)
export const setupRecaptcha = (containerId) => {
  console.warn('Phone authentication not implemented in this version');
  return null;
};

export const sendOTP = async (phoneNumber) => {
  throw new Error('Phone authentication not implemented. Please use email signup.');
};

export const verifyOTP = async (otp, role = null) => {
  throw new Error('Phone authentication not implemented. Please use email login.');
};
