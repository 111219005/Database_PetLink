// src/api/firebaseConfig.js
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

window.firebase = firebase;
// 初始化 app（只能一次）
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 初始化功能
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
