import { capitalize } from 'src/scripts/utilities/common';
import { firebaseStore, getCurrentAccountName } from 'src/scripts/utilities/firebase';
import * as fs from 'firebase/firestore';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';

/**
 * An enumeration representing different Firestore document types.
 */
export enum EFirestoreDocumentType {
  /**
   * A Firestore document containing account information.
   */
  Account = 'account',
  /**
   * A Firestore document containing a project.
   */
  Project = 'project',
  /**
   * A Firestore document containing information about an external applicatin.
   */
  ExternalApp = 'externalApp',
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
        at: fs.Timestamp;
      };
      altered?: {
        /**
         * The name of the account that altered the document last time.
         */
        by: string;
        /**
         * The timestamp when the document was altered last time.
         */
        at: fs.Timestamp;
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
  reference?: fs.DocumentReference;

  /**
   * A Firestore document snapshot object.
   */
  document?: fs.DocumentSnapshot;

  /**
   * A Firestore document object.
   */
  obj?: FirestoreDocument<IFirestoreDocumentData>;
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

  /** Child documents of this document. */
  children: Map<
    EFirestoreDocumentType,
    Map<string, FirestoreDocument<IFirestoreDocumentData>>
  >;

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
    } else if (config.obj) {
      // Create object from another one
      this.path = config.obj.path;
      this.id = config.obj.id;
      this.data = config.obj.data as D;
    } else {
      // Invalid configuration object
      throw new Error('Invalid Firestore document configuration');
    }
    // Infer document type from path
    this.type = getTypeFromPath(this.path);
    // Init children
    this.children = new Map<
      EFirestoreDocumentType,
      Map<string, FirestoreDocument<IFirestoreDocumentData>>
    >();
  }

  /**
   * Adds a document to the Firestore collection.
   *
   * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document to be added.
   *
   * @return {void} This method does not return a value.
   */
  addDocument(document: FirestoreDocument<IFirestoreDocumentData>): void {
    // Get document type
    const type = document.type;
    // Get map for the document type
    let map = this.children.get(type);
    if (!map) {
      // Add new map
      map = new Map<string, FirestoreDocument<IFirestoreDocumentData>>();
      this.children.set(type, map);
    }
    // Add document to map
    map.set(document.id, document);
  }

  /**
   * Retrieves a document from the Firestore based on the specified type and ID.
   *
   * @param {EFirestoreDocumentType} type - The type of the document to retrieve.
   * @param {string} id - The ID of the document to retrieve.
   * @returns {R | undefined} The document of type R if found, otherwise undefined.
   *
   * @template D - The type of the specific data interface.
   * @template R - The type of the specific document class.
   */
  getDocument<D extends IFirestoreDocumentData, R extends FirestoreDocument<D>>(
    type: EFirestoreDocumentType,
    id: string
  ): R | undefined {
    // Get map for the specified type
    const map = this.children.get(type);
    if (map) {
      // Get document from the map for specified ID
      const document = map.get(id);
      // Return document
      return document as R;
    }
    // Not found
    return undefined;
  }

  /**
   * Retrieves documents of the specified Firestore document type.
   *
   * @param {EFirestoreDocumentType} type - The type of Firestore document to retrieve.
   * @return {R[]} An array of project documents of the specified type.
   *
   * @template D - The type of the specific data interface.
   * @template R - The type of the specific document class.
   */
  getDocuments<D extends IFirestoreDocumentData, R extends ProjectDocument<D>>(
    type: EFirestoreDocumentType
  ): R[] {
    // Create result array
    const result: R[] = [];
    // Get the documents map for the specified type
    const documents = this.children.get(type);
    if (documents) {
      for (const document of documents.values()) {
        result.push(document as R);
      }
    }
    // Nothing found
    return result;
  }

  /**
   * Removes the specified document from the internal map of documents.
   *
   * @param {FirestoreDocument<IFirestoreDocumentData>} document - The document to be removed.
   */
  removeDocument(document: FirestoreDocument<IFirestoreDocumentData>): void {
    // Get map for the specified type
    const map = this.children.get(document.type);
    if (map) {
      // Remove the document from the map
      map.delete(document.id);
    }
  }

  /**
   * Deletes all documents recursively, including their children documents.
   */
  async deleteAllDocuments(): Promise<void> {
    // Iterate over all document types
    for (const children of this.children.values()) {
      // Iterate over all documents
      for (const child of children.values()) {
        // Delete document of the child
        await child.deleteAllDocuments();
        // Delete the document itself
        await deleteDocument(child);
      }
    }
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
  parent?: FirestoreDocument<IFirestoreDocumentData>,
): Promise<R> {
  // Set meta information on data object, if not specified yet
  if (data.common.meta === undefined) {
    data.common.meta = {
      created: {
        at: fs.Timestamp.now(),
        by: getCurrentAccountName(),
      },
    };
  }
  // Create path
  const path = parent ? parent.path + '/' + parent.id + '/' + type : type;
  // Create document
  if (id) {
    // Create document reference for specified ID.
    const ref = fs.doc(firebaseStore, path, id);
    // Create document
    await fs.setDoc(ref, data);
  } else {
    // Create collection reference.
    const ref = fs.collection(firebaseStore, path);
    // Add document with generated ID.
    id = (await fs.addDoc(ref, data)).id;
  }

  // Return document object
  return new FirestoreDocument({ path: path, id: id, data: data }) as R;
}

/**
 * Loads a document from Firestore based on the specified type and ID.
 *
 * @param {EFirestoreDocumentType} type - The type of Firestore document to load.
 * @param {string} id - The ID of the document to load.
 * @param {FirestoreDocument<never>} [parent] - Optional parent document to create a nested path.
 * @return {Promise<R | undefined>} A promise that resolves to the loaded document object if it exists, or undefined if not found.
 *
 * @template D - The type of the specific data interface.
 * @template R - The type of the specific document class.
 * */
export async function loadDocument<
  D extends IFirestoreDocumentData,
  R extends FirestoreDocument<D>
>(
  type: EFirestoreDocumentType,
  id: string,
  parent?: FirestoreDocument<never>
): Promise<R | undefined> {
  // Create path
  const path = parent ? parent.path + '/' + parent.id + '/' + type : type;
  // Create document reference
  const ref = fs.doc(firebaseStore, path, id);
  // Load the document from Firebase
  const document = await fs.getDoc(ref);
  // Check if document exists
  if (document.exists()) {
    // Create and return the document object
    return new FirestoreDocument({ document: document }) as R;
  }
  // Return undefined because document was not found
  return undefined;
}

/**
 * Loads documents from a Firestore collection based on the specified type and constraints.
 *
 * @param type - The type of the Firestore document.
 * @param parent - The parent Firestore document.
 * @param constraints - The query constraints to filter the documents.
 * @return A promise that resolves to an array of FirestoreDocument instances.
 */
export async function loadDocuments<
  D extends IFirestoreDocumentData,
  R extends FirestoreDocument<D>
>(
  type: EFirestoreDocumentType,
  parent: FirestoreDocument<IFirestoreDocumentData> | null,
  ...constraints: fs.QueryConstraint[]
): Promise<R[]> {
  // Create path to the documents
  const path = parent ? parent.path + '/' + parent.id + '/' + type : type;
  // Create collection
  const coll = fs.collection(firebaseStore, path);
  // Create query
  const qry = fs.query(coll, ...constraints);
  // Execute the query
  const snapshot = await fs.getDocs(qry);
  // Create result array
  const documents: R[] = [];
  // Iterate over all documents
  for (const doc of snapshot.docs) {
    // Create document
    const document = new FirestoreDocument({ document: doc }) as R;
    // Add document to result array
    documents.push(document);
  }
  // Return the result array
  return documents;
}

/**
 * Updates an existing Firestore document with the provided data.
 *
 * @param {R} document - The Firestore document reference to update.
 * @param {boolean} [updateMeta=true] - Flag to indicate whether to update metadata (e.g., timestamp, account name).
 *
 * @template D - The type of the specific data interface.
 * @template R - The type of the specific document class.
 */
export async function updateDocument<
  D extends IFirestoreDocumentData,
  R extends FirestoreDocument<D>
>(
  document: R,
  updateMeta: boolean = true,
): Promise<void> {
  // Update metadata if necessary
  if (updateMeta && document.data.common.meta) {
    document.data.common.meta.altered = {
      at: fs.Timestamp.now(),
      by: getCurrentAccountName(),
    };
  }
  // Create document reference
  const ref = fs.doc(firebaseStore, document.path, document.id);
  // Update the Firestore document
  await fs.updateDoc(ref, document.data as fs.UpdateData<never>);
}

/**
 * Deletes a Firestore document.
 *
 * @param {FirestoreDocument} document - The Firestore document to be deleted.
 */
export async function deleteDocument<
  D extends IFirestoreDocumentData,
  R extends FirestoreDocument<D>
>(document: R): Promise<void> {
  // Create document reference
  const ref = fs.doc(firebaseStore, document.path, document.id);
  // Delete the Firestore document
  await fs.deleteDoc(ref);
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
function getPathFromReference(reference: fs.DocumentReference): string {
  // Splits the Firestore document path into segments
  const segments = reference.path.split('/');
  // Remove the last segments and rebuild the path from the remaining segments
  return segments.splice(0, segments.length - 1).join('/');
}
