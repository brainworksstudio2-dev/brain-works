'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'brain-works-egf0a',
  appId: '1:99514749199:web:9ffb83d923ec0ac1c56e7a',
  storageBucket: 'brain-works-egf0a.firebasestorage.app',
  apiKey: 'AIzaSyBZwtsuYr4RsYduEZgrEd_CmH5yOCevVCE',
  authDomain: 'brain-works-egf0a.firebaseapp.com',
  messagingSenderId: '99514749199',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use initializeAuth to handle persistence in a way that is compatible with Next.js
const auth = typeof window !== 'undefined' ? 
  initializeAuth(app, {
    persistence: browserLocalPersistence,
  }) : 
  getAuth(app);


export { app, auth };
