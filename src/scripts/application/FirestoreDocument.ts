import firebase from 'firebase/compat';
import { capitalize } from 'src/scripts/utilities/common';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseStore, getCurrentAccountName } from 'src/scripts/utilities/firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import Timestamp = firebase.firestore.Timestamp;

/**
 * An enumeration representing different Firestore document types.
 */
export enum EFirestoreDocumentType {
  /**
   * A Firestore document containing account information.
   */
  Account = 'account',
}

/**
 * Interface representing Firestore document data.
 */
export interface IFirestoreDocumentData {
  /**
   * Common properties of each document.
   */
  common: {
    /**
     * Name of the document.
     */
    name: string;
    /**
     * An optional description of the document.
     */
    description: string | null;
    /**
     * Meta properties containing information about creating or altering a
     * document.
     */
    meta?: {
      /**
       * Information about creating the document.
       */
      created: {
        /**
         * The name of the account that created the document.
         */
        by: string;
        /**
         * The timestamp when the document was created.
         */
        at: Timestamp;
      };
      altered?: {
        /**
         * The name of the account that altered the document last time.
         */
        by: string;
        /**
         * The timestamp when the document was altered last time.
         */
        at: Timestamp;
      };
    };
  };
}

/**
 * Type of object containing the necessary information to create a new
 * Firestore document object. There are three kinds of configuration
 * possibilities.
 * - `path`, `id` and `data` are specified
 * - `reference` and `data` are specified
 * - `document` is specified
 */
export type TFirestoreDocumentConfig = {
  /**
   * The path to the document in the Firestore database. The path must not
   * contain the document ID.
   */
  path?: string;

  /**
   * The ID of the document in the Firestore database.
   */
  id?: string;

  /**
   * An object containing the content of the Firestore document.
   */
  data?: object;

  /**
   * A reference to the Firestore document.
   */
  reference?: DocumentReference;

  /**
   * A Firestore document snapshot object.
   */
  document?: DocumentSnapshot;
};

export class FirestoreDocument<D extends IFirestoreDocumentData> {
  /**
   * The path to the document in the Firestore database. The path does not
   * contain the document ID.
   */
  path: string;

  /**
   * The ID of the document in the Firestore database.
   */
  id: string;

  /**
   * The type of the Firestore document.
   */
  type: EFirestoreDocumentType;

  /**
   * The data object containing the Firestore document content.
   */
  data: D;

  /**
   * Creates an instance of a Firestore document using the given configuration.
   *
   * @param {TFirestoreDocumentConfig} config - Configuration object for the Firestore document.
   * @param {string} config.path - Path of the Firestore document.
   * @param {string} config.id - Document ID.
   * @param {D} config.data - Document data.
   * @param {FirebaseFirestore.DocumentReference} config.reference - Firestore document reference.
   * @param {FirebaseFirestore.DocumentSnapshot} config.document - Firestore document snapshot.
   * @throws {Error} Throws error if the configuration is invalid.
   */
  constructor(config: TFirestoreDocumentConfig) {
    if (config.path && config.id && config.data) {
      // Path, ID and data object are specified
      this.path = config.path;
      this.id = config.id;
      this.data = config.data as D;
    } else if (config.reference && config.data) {
      // Document reference and data object are specified
      this.path = getPathFromReference(config.reference);
      this.id = config.reference.id;
      this.data = config.data as D;
    } else if (config.document) {
      // Document object is specified
      this.path = getPathFromReference(config.document.ref);
      this.id = config.document.id;
      this.data = config.document.data() as D;
    } else {
      // Invalid configuration object
      throw new Error('Invalid Firestore document configuration');
    }
    // Infer document type from path
    this.type = getTypeFromPath(this.path);
  }

  /**
   * Returns a string representation of the object.
   *
   * @return The type of the object with its common name, formatted as "Type: Name".
   */
  toString(): string {
    return `${capitalize(this.type)}: ${this.data.common.name}`;
  }
}

/**
 * Creates a new document in Firestore.
 *
 * @param {EFirestoreDocumentType} type - The type of the Firestore document.
 * @param {D} data - The data to be stored in the document.
 * @param {string} [id] - Optional. The ID of the document. If not provided, an ID will be generated.
 * @param {FirestoreDocument<never>} [parent] - Optional. The parent document under which this document will be created.
 * @return {Promise<R>} A promise that resolves to the created document.
 *
 * @template D - The type of the specific data interface.
 * @template R - The type of the specific document class.
 */
export async function createDocument<
  D extends IFirestoreDocumentData,
  R extends FirestoreDocument<D>
>(
  type: EFirestoreDocumentType,
  data: D,
  id?: string,
  parent?: FirestoreDocument<never>
): Promise<R> {
  // Set meta information on data object, if not specified yet
  if (data.common.meta) {
    data.common.meta = {
      created: {
        at: Timestamp.now(),
        by: getCurrentAccountName(),
      },
    };
  }
  // Create path
  const path = parent ? parent.path + '/' + type : type;
  // Create document
  if (id) {
    // Create document reference for specified ID.
    const ref = doc(firebaseStore, path, id);
    // Create document
    await setDoc(ref, data);
  } else {
    // Create collection reference.
    const ref = collection(firebaseStore, path);
    // Add document with generated ID.
    id = (await addDoc(ref, data)).id;
  }

  // Return document object
  return new FirestoreDocument({ path: path, id: id, data: data }) as R;
}

/**
 * Determines the type of Firestore document based on its path.
 *
 * @param {string} path - The path of the Firestore document.
 * @return {EFirestoreDocumentType} The type of the Firestore document inferred from the path.
 */
function getTypeFromPath(path: string): EFirestoreDocumentType {
  // Splits the Firestore document path into segments
  const segments = path.split('/');
  // Infers the document type from the last segment.
  return segments[segments.length - 1] as EFirestoreDocumentType;
}

/**
 * Extracts the path from a Firestore DocumentReference, removing the document ID.
 *
 * @param reference - The Firestore DocumentReference object that contains the full path.
 * @return The path of the Firestore document minus the document ID.
 */
function getPathFromReference(reference: DocumentReference): string {
  // Splits the Firestore document path into segments
  const segments = reference.path.split('/');
  // Remove the last segments and rebuild the path from the remaining segments
  return segments.splice(0, segments.length - 1).join('/');
}