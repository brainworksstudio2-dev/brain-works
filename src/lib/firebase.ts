
'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZwtsuYr4RsYduEZgrEd_CmH5yOCevVCE",
  authDomain: "brain-works-egf0a.firebaseapp.com",
  projectId: "brain-works-egf0a",
  storageBucket: "brain-works-egf0a.appspot.com",
  messagingSenderId: "99514749199",
  appId: "1:99514749199:web:9ffb83d923ec0ac1c56e7a"
};

// Initialize Firebase for client-side only when config is valid
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

// @ts-ignore
export { app, auth, db };
