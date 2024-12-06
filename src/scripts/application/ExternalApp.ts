import * as fd from 'src/scripts/application/FirestoreDocument';
import * as pc from 'src/scripts/provider/common';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { EExternalAppProvider } from 'src/scripts/provider/common';

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
