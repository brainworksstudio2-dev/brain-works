'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that all required Firebase config values are present
const missingConfig = Object.entries(firebaseConfig).find(([key, value]) => !value);

if (missingConfig) {
    console.error(`Missing Firebase config: ${missingConfig[0]}`);
}

// Initialize Firebase for client-side
let app: FirebaseApp;
if (typeof window !== 'undefined' && !missingConfig) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

let auth: Auth;
let db: Firestore;

// Ensure Firebase services are only initialized on the client where the app has been initialized
if (typeof window !== 'undefined' && !getApps().length && !missingConfig) {
    initializeApp(firebaseConfig);
}
if (typeof window !== 'undefined') {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}


export { app, auth, db };
