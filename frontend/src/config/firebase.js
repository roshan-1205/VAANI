import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDur574xFTz0Hr6e_lIceFEjlUttBk3nvI",
  authDomain: "vaani-43777.firebaseapp.com",
  projectId: "vaani-43777",
  storageBucket: "vaani-43777.firebasestorage.app",
  messagingSenderId: "866015998341",
  appId: "1:866015998341:web:81baf0f827d034978a14ec",
  measurementId: "G-TQVD7MPLYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence (optional but helpful)
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support offline persistence');
    }
  });
} catch (err) {
  console.warn('Persistence error:', err);
}

// Uncomment these lines if you want to use Firebase emulators for local development
// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;
