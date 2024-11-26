import {
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { QTableColumn } from 'quasar';
import { TSelectOption } from 'src/scripts/utilities/common';

/**
 * Enumeration representing possible input types for a table column.
 */
export enum ETableColumnInput {
  /** Text Input */
  Text = 'text',
  /** Select Input */
  Select = 'select',
  /** Checkbox Input */
  Checkbox = 'checkbox',
}

/**
 * Enhanced table column type extending QTableColumn with additional properties.
 *
 * @property {ETableColumnInput} [input] - Input Type.
 * @property {TSelectOption[]} [options] - Options for input type Select.
 * @property {boolean} [translate] - Flag for translating the option labels.
 * @property {boolean} [hideIcon] - Flag for hiding the options icon.
 */
export type TTableColumn = QTableColumn & {
  /** Input Type */
  input?: ETableColumnInput | ((row: any) => ETableColumnInput);
  /** Options for input type Select */
  options?: TSelectOption[];
  /** Flag for translating the option labels */
  translate?: boolean;
  /** Flah for hiding the options icon */
  hideIcon?: boolean;
};

/**
 * Abstract class representing generic editor data, providing base
 * functionality for name and description properties, validation,
 * and data creation.
 */
export abstract class EditorData<D extends IFirestoreDocumentData> {
  /** Attached Firestore document */
  document?: FirestoreDocument<D>;

  /** The name of the object */
  name: string;

  /** An optional description of the object */
  description: string | null;

  /**
   * Default constructor.
   */
  protected constructor() {
    this.name = '';
    this.description = null;
  }

  /**
   * Validates the input and returns a string if the validation fails,
   * otherwise returns null if the input is valid.
   *
   * @return {string|null} A string describing the validation error if invalid, or null if valid.
   */
  validate(): boolean {
    return true;
  }

  /**
   * Resets the validation state for the form or input fields.
   *
   * This method clears any validation errors or messages that might
   * have been set, effectively allowing for a fresh validation state
   * without any previous error indications.
   */
  resetValidation(): void {}

  /**
   * Creates and returns a new data object for a Firestore document.
   *
   * @return {D} The newly created data object.
   */
  abstract createData(): D;

  /**
   * Initializes the editor with data from the given Firestore document.
   * Retrieves the necessary fields from the document and sets up the editor instance accordingly.
   *
   * @param {FirestoreDocument<D>} document - The Firestore document containing the data to be loaded into the editor.
   */
  abstract initEditorData(document: FirestoreDocument<D>): void | Promise<void>;
}
