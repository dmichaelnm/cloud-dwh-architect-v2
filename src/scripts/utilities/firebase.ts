import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from 'src/scripts/config/firebase';

// Initializes the Firebase app with the provided configuration.
const firebaseapp = initializeApp(firebaseConfig);

// Initialize Firebase authentication using the Firebase app instance.
export const firebaseAuth = getAuth(firebaseapp);
