import * as fd from 'src/scripts/application/FirestoreDocument';
import { Project } from 'src/scripts/application/Project';

/**
 * Represents a project-specific Firestore document.
 */
export class ProjectDocument<
  D extends fd.IFirestoreDocumentData
> extends fd.FirestoreDocument<D> {
  /** The project containing this document */
  project: Project;

  /**
   * Constructs an instance of the class with the specified configuration and project.
   *
   * @param {TFirestoreDocumentConfig} config - The configuration for the Firestore document.
   * @param {Project} project - The project associated with the Firestore document.
   */
  constructor(config: fd.TFirestoreDocumentConfig, project: Project) {
    super(config);
    this.project = project;
  }
}
