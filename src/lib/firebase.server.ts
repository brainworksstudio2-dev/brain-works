/**
 * @fileoverview This file should only be imported on the server.
 * It initializes a server-side instance of the Firebase Admin SDK.
 */
import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let db: Firestore;

try {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error("Firebase service account key is not set in environment variables.");
  }

  const serviceAccount = JSON.parse(serviceAccountKey);

  if (!serviceAccount.project_id) {
    throw new Error("Service account object must contain a string 'project_id' property.");
  }

  let app: App;
  if (!getApps().length) {
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    app = getApp();
  }

  db = getFirestore(app);

} catch (error) {
  console.error("Firebase Admin SDK initialization failed:", error);
  // Assign a mock or a limited-functionality object to db
  // to avoid crashing the parts of the app that import it.
  // @ts-ignore
  db = { 
    collection: () => ({ 
      addDoc: async () => Promise.reject("Firebase Admin not initialized"),
      doc: () => ({
        get: async () => Promise.reject("Firebase Admin not initialized"),
        set: async () => Promise.reject("Firebase Admin not initialized"),
      })
    }) 
  };
}

export { db };