import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { TCustomAttribute } from 'src/scripts/utilities/common';

/**
 * Represents a storage location data structure extending the base Firestore document data.
 * This interface defines the details of a storage location in an external application.
 *
 * Properties:
 * - `externalApp`: The ID of the external application associated with this storage location.
 * - `path`: The path indicating the location.
 * - `attributes`: A collection of custom attributes associated with this storage location.
 */
export interface IStorageLocationData extends IFirestoreDocumentData {
  /** ID of the external application */
  externalApp: string;
  /** Path to the location */
  path: string;
  /** Custom attributes */
  attributes: TCustomAttribute[];
}

/**
 * Represents the storage location within a project.
 * This class extends the ProjectDocument and is designed to handle
 * operations and data associated with storage locations.
 *
 * The StorageLocation class provides methods and properties inherited
 * from the ProjectDocument to manage and manipulate storage location
 * data defined by the IStorageLocationData interface.
 *
 * Typically used for maintaining and interacting with storage location
 * data in a system or application, while leveraging the functionality
 * provided by the ProjectDocument base class.
 */
export class StorageLocation extends ProjectDocument<IStorageLocationData> {}
