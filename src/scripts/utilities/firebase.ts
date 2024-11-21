import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'src/scripts/config/firebase';
import { Ref } from 'vue';

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

/**
 * Retrieves the current account ID of the authenticated user.
 * If the user is not authenticated, it returns a placeholder value.
 *
 * @return {string} The account ID of the current user or a placeholder string if not authenticated.
 */
export function getCurrentAccountId(): string {
  return firebaseAuth.currentUser?.uid ?? '?';
}

/**
 * Processes Firebase authentication errors and sets appropriate error messages.
 *
 * @param {unknown} error - The error object received from Firebase.
 * @param {function} t - Function used for translating error message keys to actual messages.
 * @param {Ref<string>} emailError - A reactive reference for storing the email error message.
 * @param {Ref<string>} [passwordError] - A reactive reference for storing the password error message.
 * @return {boolean} - Returns true if the error was recognized and processed, otherwise false.
 */
export function processFirebaseError(
  error: unknown,
  t: (key: string) => string,
  emailError: Ref<string>,
  passwordError?: Ref<string>
): boolean {
  // Get firebase error code
  const code = (error as FirebaseError).code;

  // Invalid email address
  if (code === 'auth/invalid-email') {
    emailError.value = t('auth.error.invalidEmail');
    return true;
  }
  // Email already in use
  if (code === 'auth/email-already-in-use') {
    emailError.value = t('auth.error.emailInUse');
    return true;
  }
  // Invalid credentials
  if (code === 'auth/invalid-credential') {
    emailError.value = t('auth.error.invalidCredentials');
    return true;
  }
  // Too many failed requests
  if (code === 'auth/too-many-requests') {
    emailError.value = t('auth.error.tooManyRequests');
    return true;
  }
  // Account is locked
  if (code === 'auth/account-locked' || code === 'auth/user-disabled') {
    emailError.value = t('auth.error.accountLocked');
    return true;
  }
  // Password is too weak
  if (code === 'auth/weak-password' && passwordError) {
    passwordError.value = t('auth.error.passwordTooWeak');
    return true;
  }

  // Unexpected error
  return false;
}
