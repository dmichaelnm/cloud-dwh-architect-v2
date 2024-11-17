import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { Ref } from 'vue';

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
  // Password is too weak
  if (code === 'auth/weak-password' && passwordError) {
    passwordError.value = t('auth.error.passwordTooWeak');
    return true;
  }

  // Unexpected error
  return false;
}
