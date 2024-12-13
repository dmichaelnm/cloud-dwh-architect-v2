import { EditorData } from 'src/scripts/ui/common';
import { IStorageLocationData } from 'src/scripts/application/StorageLocation';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { Project } from 'src/scripts/application/Project';

/**
 * Represents the storage location data specific to the editor.
 *
 * This class is responsible for managing and manipulating storage location details,
 * including external application, path, and custom attributes.
 * It provides functionality to construct storage location data for usage
 * and initializes editor-specific data tied to a Firestore document.
 *
 * @extends EditorData<IStorageLocationData>
 */
export class EditorStorageLocationData extends EditorData<IStorageLocationData> {
  /** External Application */
  externalApp: string | null = null;

  /** Path to the location */
  path: string = '';

  /** Custom attributes */
  attributes: TCustomAttribute[] = [];

  /**
   * Default constructor.
   */
  constructor(project?: Project) {
    super();
    // Check for valid project
    if (project) {
      // Get storage location apps
      const apps = project.getStorageLocationCapableApps();
      // Set initial app
      this.externalApp = apps.length > 0 ? apps[0].id : null;
    }
  }

  /**
   * Creates and returns an object representing storage location data.
   *
   * The returned object contains common details such as name and description,
   * along with external app information, path, and additional attributes.
   *
   * @return {IStorageLocationData} An object containing storage location details.
   */
  createData(): IStorageLocationData {
    return {
      common: {
        name: this.name,
        description: this.description,
      },
      externalApp: this.externalApp as string,
      path: this.path,
      attributes: this.attributes,
    };
  }

  initEditorData(
    document: FirestoreDocument<IStorageLocationData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
    // Apply common values
    this.name = document.data.common.name;
    this.description = document.data.common.description;
    // Apply external app and path
    this.externalApp = document.data.externalApp;
    this.path = document.data.path;
    // Apply custom attributes
    const attr = document.data.attributes;
    for (const i in attr) {
      this.attributes.push({ ...attr[i] });
    }
  }
}
