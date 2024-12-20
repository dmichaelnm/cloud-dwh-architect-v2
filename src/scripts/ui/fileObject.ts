import * as fo from 'src/scripts/application/FileObject';
import { EditorData } from 'src/scripts/ui/common';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';
import { EFileType, TCustomAttribute } from 'src/scripts/utilities/common';
import { Project } from 'src/scripts/application/Project';

/**
 * This class represents file metadata and its associated properties used within an editor.
 * It extends the base `EditorData` class, allowing integration with file-specific data.
 */
export class EditorFileObjectData extends EditorData<fo.IFileObjectData> {
  /** Storage Location */
  storageLocation: string = '';

  /** File Type */
  type: EFileType = EFileType.Unknown;

  /** File name pattern */
  filePattern: string = '';

  /** File properties */
  properties: fo.TFileProperties = null;

  /** File column definitions */
  columns: fo.TFileColumnDefinition[] = [];

  /** Custom Attributes */
  attributes: TCustomAttribute[] = [];

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

  /**
   * Creates and returns an object representing file metadata and its properties.
   *
   * @return {fo.IFileObjectData} An object containing file information, including name, description, storage location,
   *                              type, path, properties, and columns.
   */
  createData(): fo.IFileObjectData {
    return {
      common: {
        name: this.name,
        description: this.description,
      },
      stoageLocation: this.storageLocation,
      type: this.type,
      filePattern: this.filePattern,
      properties: this.properties,
      columns: this.columns,
      attributes: this.attributes,
    };
  }

  /**
   * Initializes the editor with data from the given Firestore document.
   * This method sets up the document, common values such as name and description,
   * storage information, file properties, and column definitions.
   *
   * @param {FirestoreDocument<fo.IFileObjectData>} document - The Firestore document containing file object data to
   *        initialize the editor.
   */
  initEditorData(
    document: FirestoreDocument<fo.IFileObjectData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
    // Apply common values
    this.name = document.data.common.name;
    this.description = document.data.common.description;
    // Apply storage location, file and type
    this.storageLocation = document.data.stoageLocation;
    this.filePattern = document.data.filePattern;
    this.type = document.data.type;
    // Apply properties
    this.properties = fo.getFilePropertiesFromType(
      document.data.type,
      document as fo.FileObject
    );
    console.debug(document.data.columns);
    // Apply column definitions
    this.columns = fo.getFileColumnDefinitions(document as fo.FileObject);
    // Apply custom attributes
    const attr = document.data.attributes;
    for (const i in attr) {
      this.attributes.push({ ...attr[i] });
    }
  }
}
