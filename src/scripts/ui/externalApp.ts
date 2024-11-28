import { EditorData } from 'src/scripts/ui/common';
import { IExternalAppData } from 'src/scripts/application/ExternalApp';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';

/**
 * The EditorExternalAppData class is responsible for managing and initializing
 * the data specific to an external application within the editor. It extends
 * the EditorData base class and specializes in handling IExternalAppData objects.
 */
export class EditorExternalAppData extends EditorData<IExternalAppData> {

  /**
   * Default constructor.
   */
  constructor() {
    super();
  }

  /**
   * Creates a data object containing the common properties of the external
   * application.
   *
   * @return {IExternalAppData} The data object with common properties including `name` and `description`.
   */
  createData(): IExternalAppData {
    // Return data object
    return {
      common: {
        name: this.name,
        description: this.description,
      },
    };
  }

  /**
   * Initializes the editor data with the provided Firestore document.
   *
   * @param {FirestoreDocument<IExternalAppData>} document - The Firestore document containing the external app data.
   * @return {void | Promise<void>} Returns void or a promise that resolves to void.
   */
  initEditorData(
    document: FirestoreDocument<IExternalAppData>
  ): void | Promise<void> {
    // Attach document
    this.document = document;
    // Apply common values
    this.name = document.data.common.name;
    this.description = document.data.common.description;
  }
}
