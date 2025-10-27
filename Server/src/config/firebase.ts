import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref} from 'firebase/database'

const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app)
export const realtimeDB = getDatabase(app)

export const getRealtimeRef = (path: string) => ref(realtimeDB, path);
