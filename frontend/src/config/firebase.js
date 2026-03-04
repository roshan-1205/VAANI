import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw",
  authDomain: "vanni-166b8.firebaseapp.com",
  projectId: "vanni-166b8",
  storageBucket: "vanni-166b8.firebasestorage.app",
  messagingSenderId: "961709941045",
  appId: "1:961709941045:web:455ea47df23189d9976c7c",
  measurementId: "G-595S3494MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
