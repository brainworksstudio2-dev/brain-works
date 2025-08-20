/**
 * @fileoverview This file should only be imported on the server.
 * It initializes a server-side instance of the Firebase Admin SDK.
 */
import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// IMPORTANT: Replace with your actual service account key JSON content
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : {};

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount)
  });
} else {
  app = getApp();
}

const db: Firestore = getFirestore(app);

export { db };
