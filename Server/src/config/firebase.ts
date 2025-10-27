import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app)
const realtimeDB = getDatabase(app)

export default {firestoreDB, realtimeDB};
