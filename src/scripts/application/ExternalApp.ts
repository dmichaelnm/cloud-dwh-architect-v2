import {
  EFirestoreDocumentType,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';
import { TProviderCredentials } from 'src/scripts/provider/common';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { EExternalAppProvider } from 'src/scripts/provider/common';

/**
 * Represents the external application data associated with a provider.
 */
export interface IExternalAppData extends IFirestoreDocumentData {
  /** Provider */
  provider: EExternalAppProvider;
  /** Credentials */
  credentials: TProviderCredentials;
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
    EFirestoreDocumentType.ExternalApp,
    (document) => new ExternalApp({ obj: document }, project)
  );
}
