import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
let authInstance;
try {
  const { getReactNativePersistence } = require('firebase/auth');
  authInstance = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
}
catch {
  authInstance = getAuth(app);
}

const firestoreDb = getFirestore(app);

if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('WebChannelConnection RPC')) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export const auth = authInstance;
export const db = firestoreDb;
