import * as fd from 'src/scripts/application/FirestoreDocument';
import * as pc from 'src/scripts/provider/common';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { EExternalAppProvider } from 'src/scripts/provider/common';
import { deleteStorageLocation } from 'src/scripts/application/StorageLocation';
import { deleteDocument } from 'src/scripts/application/FirestoreDocument';

/**
 * Represents the external application data associated with a provider.
 */
export interface IExternalAppData extends fd.IFirestoreDocumentData {
  /** Location Type */
  locationType: pc.ELocationType;
  /** Provider */
  provider: EExternalAppProvider;
  /** Credentials */
  credentials: pc.TProviderCredentials;
  /** Custom Attributes */
  attributes: TCustomAttribute[];
}

/**
 * Represents an external application within the project environment.
 */
export class ExternalApp extends ProjectDocument<IExternalAppData> {}

/**
 * Loads external applications into the specified project.
 *
 * @param {Project} project - The project to which the external applications will be loaded.
 */
export async function loadExternalApps(project: Project): Promise<void> {
  await loadChildDocuments(
    project,
    fd.EFirestoreDocumentType.ExternalApp,
    (document) => new ExternalApp({ obj: document }, project)
  );
}

/**
 * Deletes an external application and associated storage locations from the system.
 *
 * @param {ExternalApp} externalApp - The external application to be deleted.
 * @return {Promise<void>} A promise that resolves when the external application and its related storage locations have been deleted.
 */
export async function deleteExternalApp(
  externalApp: ExternalApp
): Promise<void> {
  // Get project
  const project = externalApp.project;
  // Get all storage locations
  const storageLocations = project.getStorageLocations();
  // Iterate over all storage locations
  for (const storageLoc of storageLocations) {
    // Check if storage location is based on the specified external app
    if (storageLoc.data.externalApp === externalApp.id) {
      // Delete storage location
      await deleteStorageLocation(storageLoc);
    }
  }
  // Delete external app document
  await deleteDocument(externalApp);
  // Remove document from project
  project.removeDocument(externalApp);
}
