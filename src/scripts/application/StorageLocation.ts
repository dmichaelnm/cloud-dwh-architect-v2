import * as fd from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';
import { deleteDocument } from 'src/scripts/application/FirestoreDocument';
import { deleteFileObject } from 'src/scripts/application/FileObject';

/**
 * Represents a storage location data structure extending the base Firestore document data.
 * This interface defines the details of a storage location in an external application.
 *
 * Properties:
 * - `externalApp`: The ID of the external application associated with this storage location.
 * - `path`: The path indicating the location.
 * - `attributes`: A collection of custom attributes associated with this storage location.
 */
export interface IStorageLocationData extends fd.IFirestoreDocumentData {
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

/**
 * Loads storage locations for the specified project. This method retrieves
 * all relevant child documents of type `StorageLoc` from the Firestore and
 * initializes them as `StorageLocation` objects.
 *
 * @param {Project} project - The project for which storage locations are to be loaded.
 */
export async function loadStorageLocations(project: Project): Promise<void> {
  await loadChildDocuments(
    project,
    fd.EFirestoreDocumentType.StorageLoc,
    (document) => new StorageLocation({ obj: document }, project)
  );
}

/**
 * Deletes the specified storage location by removing its corresponding document.
 *
 * @param {StorageLocation} storageLocation - The storage location object to be deleted.
 */
export async function deleteStorageLocation(storageLocation: StorageLocation) {
  // Get project
  const project = storageLocation.project;
  // Get all file objects
  const fileObjects = project.getFileObjects();
  // Iterate over all file objects
  for (const fileObject of fileObjects) {
    // Check storage location
    if (fileObject.data.stoageLocation === storageLocation.id) {
      // Delete file object
      await deleteFileObject(fileObject);
    }
  }
  // Delete storage location document
  await deleteDocument(storageLocation);
  // Remove document from project
  project.removeDocument(storageLocation);
}
