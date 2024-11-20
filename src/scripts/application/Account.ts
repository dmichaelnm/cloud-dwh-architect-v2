import * as fd from 'src/scripts/application/FirestoreDocument';
import * as au from 'firebase/auth';
import * as fs from 'firebase/firestore';
import { firebaseAuth } from 'src/scripts/utilities/firebase';
import { FirebaseError } from 'firebase/app';

/**
 * Represents account data stored in the document.
 */
export interface IAccountData extends fd.IFirestoreDocumentData {
  /** Email address */
  email: string;
  /** Account preferences */
  preference: {
    /** Preferred dark mode */
    darkMode: boolean;
    /** Preferred language code */
    language: string;
  };
  /** State variables */
  state: {
    /** Lock state */
    lock: boolean;
    /** Timestamp of last login */
    lastLogin: fs.Timestamp | null;
  };
}

/**
 * This class represents a Firebase account.
 */
export class Account extends fd.FirestoreDocument<IAccountData> {}

/**
 * Monitors the account state changes and handles the account accordingly.
 *
 * @param handler - A callback function to handle the account state. It receives an Account object if authenticated
 *                  and valid, or null otherwise.
 */
export function onAccountStateChanged(
  handler: (account: Account | null) => void
): void {
  au.onAuthStateChanged(firebaseAuth, async (user) => {
    if (user === null) {
      // If the user is null then we don't have an authenticated Firebase user and
      // call the handler with null as account
      handler(null);
    } else {
      // Load account document
      const account = await fd.loadDocument<IAccountData, Account>(
        fd.EFirestoreDocumentType.Account,
        user.uid
      );
      // Check, if account document was found and the account is not locked
      if (account && !account.data.state.lock) {
        // Call the handler with the account object
        handler(account);
      } else {
        // No valid account, redirect to login page
        handler(null);
      }
    }
  });
}

/**
 * Creates a new account with the given information and returns the created account.
 *
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the account.
 * @param {boolean} darkMode - User preference for dark mode.
 * @param {string} language - User preference for language.
 * @return {Promise<Account>} A promise that resolves to the created account.
 */
export async function createAccount(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  darkMode: boolean,
  language: string
): Promise<Account> {
  // Create the firebase user
  const credentials = await au.createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  // Update the display name of the firebase user
  await au.updateProfile(credentials.user, {
    displayName: `${firstName} ${lastName}`,
  });
  // Create the account data
  const data: IAccountData = {
    common: {
      name: `${firstName} ${lastName}`,
      description: null,
      meta: {
        created: {
          at: fs.Timestamp.now(),
          by: 'System',
        },
      },
    },
    email: email,
    preference: {
      darkMode: darkMode,
      language: language,
    },
    state: {
      lock: true,
      lastLogin: null,
    },
  };
  // Create and return the account document
  return await fd.createDocument<IAccountData, Account>(
    fd.EFirestoreDocumentType.Account,
    data,
    credentials.user.uid
  );
}

/**
 * Initiates the process to reset a user's password by sending a reset link to the specified email address.
 *
 * @param {string} email - The email address linked to the user's account for which the password reset is requested.
 */
export async function resetPassword(email: string): Promise<void> {
  await au.sendPasswordResetEmail(firebaseAuth, email);
}

/**
 * Authenticates a user with the given email and password.
 *
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @return {Promise<Account>} A promise that resolves to the user's account if authentication is successful, and the account is not locked.
 * @throws {FirebaseError} If the account is locked or the account document is not found in Firestore.
 */
export async function login(email: string, password: string): Promise<Account> {
  // Sign in Firebase
  const credentials = await au.signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  // Load the account document
  const account = await fd.loadDocument<IAccountData, Account>(
    fd.EFirestoreDocumentType.Account,
    credentials.user.uid
  );
  // Check if account was found
  if (account) {
    // Check if account is not locked.
    if (!account.data.state.lock) {
      // Update last login timestamp
      account.data.state.lastLogin = fs.Timestamp.now();
      await fd.updateDocument(account, false);
      // Account is not locked
      return account;
    }
    // Sign out
    await logout();
    // Account is locked, throw Firebase error
    throw new FirebaseError(
      'auth/account-locked',
      'The account is locked. Please contact the administrator.'
    );
  }
  // Throw firebase error
  throw new FirebaseError(
    'auth/account-not-found',
    'The account document was not found in Firestore.'
  );
}

/**
 * Logs out the current user by signing them out of the Firebase authentication system.
 */
export async function logout(): Promise<void> {
  // Logout the current account
  await au.signOut(firebaseAuth);
}

/**
 * Finds and returns an account based on the provided email address.
 *
 * @param {string} email - The email address to search for the account.
 * @return {Promise<Account | null>} A promise that resolves to the account if found, otherwise null.
 */
export async function findAccount(email: string): Promise<Account | null> {
  // Find documents
  const documents = await fd.loadDocuments<IAccountData, Account>(
    fd.EFirestoreDocumentType.Account,
    null,
    fs.where('email', '==', email)
  );
  // Exactly one document is expected, if not return null
  return documents.length === 1 ? documents[0] : null;
}
