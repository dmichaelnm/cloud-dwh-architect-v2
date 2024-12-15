import { EditorData } from 'src/scripts/ui/common';
import { IFileObjectData } from 'src/scripts/application/FileObject';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';
import { EFileType } from 'src/scripts/utilities/common';
import { Project } from 'src/scripts/application/Project';

export class EditorFileObjectData extends EditorData<IFileObjectData> {
  /** Storage Location */
  storageLocation: string = '';

  /** File Type */
  type: EFileType = EFileType.Unknown;

  /** Path to file in the cloud storage */
  path: string = '';

  /**
   * Constructs an instance, optionally initializing it with a given project.
   *
   * @param {Project} [project] - An optional Project instance to initialize the constructor.
   *                              If provided, retrieves storage locations from the project and
   *                              sets the first location as the default storage location.
   */
  constructor(project?: Project) {
    super();
    // Check for valid project
    if (project) {
      // Get storage locations
      const locations = project.getStorageLocations();
      // Set first location as default
      this.storageLocation = locations.length > 0 ? locations[0].id : '';
    }
  }

  createData(): IFileObjectData {
    return {
      common: {
        name: this.name,
        description: this.description,
      },
      stoageLocation: this.storageLocation,
      type: this.type,
      path: this.path,
    };
  }

  initEditorData(
    document: FirestoreDocument<IFileObjectData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
  }
}
