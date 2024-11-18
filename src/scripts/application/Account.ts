import {
  createDocument,
  EFirestoreDocumentType,
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from 'src/scripts/utilities/firebase';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

/**
 * Represents account data stored in the document.
 */
export interface IAccountData extends IFirestoreDocumentData {
  /** Account preferences */
  preference: {
    /** Preferred dark mode */
    darkMode: boolean;
    /** Preferred language code */
    language: string;
  };
}

export class Account extends FirestoreDocument<IAccountData> {}

export function onAccountStateChanged(
  handler: (account: Account | null) => void
): void {
  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user === null) {
      // If the user is null then we don't have an authenticated Firebase user and
      // call the handler with null as account
      handler(null);
    }
  });
}

/**
 * Initiates the process to reset a user's password by sending a reset link to the specified email address.
 *
 * @param {string} email - The email address linked to the user's account for which the password reset is requested.
 */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(firebaseAuth, email);
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
  const credentials = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  // Update the display name of the firebase user
  await updateProfile(credentials.user, {
    displayName: `${firstName} ${lastName}`,
  });
  // Create the account data
  const data: IAccountData = {
    common: {
      name: `${firstName} ${lastName}`,
      description: null,
      meta: {
        created: {
          at: Timestamp.now(),
          by: 'System',
        },
      },
    },
    preference: {
      darkMode: darkMode,
      language: language,
    },
  };
  // Create and return the account document
  return await createDocument<IAccountData, Account>(
    EFirestoreDocumentType.Account,
    data,
    credentials.user.uid
  );
}
