// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Custom initialization for auth persistence
auth.useDeviceLanguage();

// Helper functions for common Firebase operations
// Auth helpers
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Firestore timestamp
export const timestamp = {
  now: () => new Date(),
  fromMillis: (millis) => new Date(millis),
  toMillis: (timestamp) => timestamp.getTime(),
  fromDate: (date) => date,
  toDate: (timestamp) => timestamp,
};

// Export initialized services
export { 
  app, 
  auth, 
  db, 
  storage, 
  analytics 
};

// Export Firebase configuration (for testing/debugging)
export const getFirebaseConfig = () => {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('Firebase configuration is not set or incomplete');
  }
  return firebaseConfig;
};
