// ─────────────────────────────────────────────────────────────
//  FIREBASE CONFIGURATION
//  After creating your free Firebase project at https://console.firebase.google.com
//  Replace the placeholder values below with your actual project config.
//  The config is safe to include in client-side code (Firebase uses security rules).
// ─────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PASTE_YOUR_API_KEY_HERE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "PASTE_YOUR_SENDER_ID_HERE",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "PASTE_YOUR_APP_ID_HERE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
