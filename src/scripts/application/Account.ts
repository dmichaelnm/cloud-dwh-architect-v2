import {
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from 'src/scripts/utilities/firebase';

export interface IAccountData extends IFirestoreDocumentData {}

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
