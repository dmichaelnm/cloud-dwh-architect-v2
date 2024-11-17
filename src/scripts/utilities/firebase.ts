import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'src/scripts/config/firebase';

// Initializes the Firebase app with the provided configuration.
const firebaseapp = initializeApp(firebaseConfig);

// Initialize Firebase authentication using the Firebase app instance.
export const firebaseAuth = getAuth(firebaseapp);

// Initialize Firebase Firestore using the Firebase app instance.
export const firebaseStore = getFirestore(firebaseapp);

/**
 * Gets the display name of the currently authenticated user.
 *
 * @return {string} The display name of the current user, or 'Unknown Account User' if the display name is not available.
 */
export function getCurrentAccountName(): string {
  return firebaseAuth.currentUser?.displayName ?? 'Unknown Account User';
}
