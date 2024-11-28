import {
  EFirestoreDocumentType,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';

export interface IExternalAppData extends IFirestoreDocumentData {}

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
