import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyC17fRK2fM0SzFkS3GgHn3urp2WQUT7B2I",
  authDomain: "parcialfinal-c80f9.firebaseapp.com",
  projectId: "parcialfinal-c80f9",
  storageBucket: "parcialfinal-c80f9.firebasestorage.app",
  messagingSenderId: "246149039770",
  appId: "1:246149039770:web:79d25375710cd8b4714123"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app; 