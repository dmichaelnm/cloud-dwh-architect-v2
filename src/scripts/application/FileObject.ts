import * as fd from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { EFileType, TCustomAttribute } from 'src/scripts/utilities/common';
import { TColumnDefinition } from 'src/scripts/application/CommonTypes';
import { loadChildDocuments, Project } from 'src/scripts/application/Project';

/**
 * Represents the properties for configuring a CSV file. This type is used
 * to define the format and structure of a CSV file.
 */
export type TFilePropertiesCSV = {
  /** Row Separator */
  rowSeparator: 'CRLF' | 'LF' | 'CR';
  /** Field Delimitor */
  fieldDelimitor: string;
  /** First row is header */
  hasHeaderRow: boolean;
  /** Date Format */
  dateFormat: string;
  /** Time Format */
  timeFormat: string;
  /** Timestamp Format */
  timestampFormat: string;
  /** Decimal Separator */
  decimalSeparator: string;
};

/**
 * Represents a type definition for a CSV column that extends the base TColumnType.
 * Includes an optional format property which defines the specific format of the column.
 */
export type TColumnDefinitionCSV = TColumnDefinition & {
  /** Optional Format */
  format: string | null;
};

/**
 * Represents the type definition for a file column, which can be either
 * a standard column definition or a column definition specific to CSV files.
 */
export type TFileColumnDefinition = TColumnDefinition | TColumnDefinitionCSV;

/**
 * Represents the properties of a file as a type.
 * This type can either represent valid CSV file properties
 * (as defined in TFilePropertiesCSV) or a null value when no
 * file properties are available.
 */
export type TFileProperties = TFilePropertiesCSV | null;

/**
 * This type defines the structure for metadata, particularly focusing
 * on column definitions within a dataset or table construct.
 */
export type TMetaData = {
  /** Column Definitions */
  columns: TColumnDefinition[];
};

/**
 * Type definition for the metadata configuration of a CSV file.
 * Extends the TMetaData type.
 */
export type TMetaDataCSV = TMetaData & {
  /** Field delimiter */
  fieldDelimiter: string;
  /** Line break */
  lineBreak: 'CRLF' | 'LF' | 'CR';
};

/**
 * Represents the data structure for a file object within a storage system.
 * Extends the `IFirestoreDocumentData` interface.
 *
 * This interface is used to define the necessary information about the file,
 * including its location, type, properties, and additional metadata.
 */
export interface IFileObjectData extends fd.IFirestoreDocumentData {
  /** Storage Location */
  stoageLocation: string;
  /** File Type */
  type: EFileType;
  /** File name pattern of the files in the cloud storage */
  filePattern: string;
  /** File Properties */
  properties: TFileProperties;
  /** Column definitions */
  columns: TFileColumnDefinition[];
  /** Custom attributes */
  attributes: TCustomAttribute[];
}

export class FileObject extends ProjectDocument<IFileObjectData> {}

/**
 * Determines the file type based on the provided file extension.
 *
 * @param {string | undefined} extension - The file extension to assess. If undefined, the file type will default to unknown.
 * @return {EFileType} The corresponding file type, or unknown if the extension does not match a known type.
 */
export function getFileTypeFromExtension(
  extension: string | undefined
): EFileType {
  // Check extension
  if (!extension) {
    return EFileType.Unknown;
  }
  // Determine file type
  switch (extension.toLowerCase()) {
    // CSV File
    case 'csv':
    case 'csv.gz':
      return EFileType.CSV;
    // Unknown file type
    default:
      return EFileType.Unknown;
  }
}

/**
 * Retrieves file properties based on a given file type and optional file object.
 *
 * @param {EFileType} type - The type of the file, specifying how to extract its properties.
 * @param {FileObject} [fileObject] - An optional parameter representing the file with its data and properties.
 * @return {TFileProperties} The file properties specific to the file type. Returns `null` for unknown file types.
 */
export function getFilePropertiesFromType(
  type: EFileType,
  fileObject?: FileObject
): TFileProperties {
  switch (type) {
    // CSV Properties
    case EFileType.CSV:
      // Cast to CSV properties
      const csvProps = fileObject?.data.properties as TFilePropertiesCSV;
      return {
        rowSeparator: csvProps ? csvProps.rowSeparator : 'CRLF',
        fieldDelimitor: csvProps ? csvProps.fieldDelimitor : ',',
        hasHeaderRow: csvProps ? csvProps.hasHeaderRow : false,
        dateFormat: csvProps ? csvProps.dateFormat : 'yyyy-MM-dd',
        timeFormat: csvProps ? csvProps.timeFormat : 'HH:mm:ss',
        timestampFormat: csvProps
          ? csvProps.timestampFormat
          : 'yyyy-MM-dd HH:mm:ss.SSS',
        decimalSeparator: csvProps ? csvProps.decimalSeparator : '.',
      };
    // Unknown File Properties
    default:
      return null;
  }
}

/**
 * Extracts and returns an array of column definitions from the provided file object.
 *
 * @param {FileObject} fileObject - The file object containing metadata and column definitions.
 * @return {TFileColumnDefinition[]} An array of column definitions specific to the file type.
 */
export function getFileColumnDefinitions(
  fileObject: FileObject
): TFileColumnDefinition[] {
  // Create result array
  const columns: TFileColumnDefinition[] = [];
  // Iterate over file object columns
  for (const col of fileObject.data.columns) {
    switch (fileObject.data.type) {
      // CSV Column Definition
      case EFileType.CSV:
        // Cast to CSV column definition
        const csvCol = col as TColumnDefinitionCSV;
        // Add CSV column definition
        columns.push({
          name: csvCol.name,
          type: csvCol.type,
          precision: csvCol.precision,
          scale: csvCol.scale,
          nullable: csvCol.nullable,
          format: csvCol.format,
          comment: csvCol.comment,
        });
        break;
    }
  }
  // Return array
  return columns;
}

/**
 * Loads file objects for a given project by retrieving associated documents
 * of type File from the Firestore and instantiating them as FileObject instances.
 *
 * @param {Project} project - The project for which file objects need to be loaded.
 */
export async function loadFileObjects(project: Project): Promise<void> {
  await loadChildDocuments(
    project,
    fd.EFirestoreDocumentType.File,
    (document) => new FileObject({ obj: document }, project)
  );
}

/**
 * Deletes a specified file object, removes its storage location document,
 * and removes the document reference from the associated project.
 *
 * @param {FileObject} fileObject - The file object to be deleted. Contains information about the file and its associated project.
 */
export async function deleteFileObject(fileObject: FileObject): Promise<void> {
  // Get project
  const project = fileObject.project;
  // Delete storage location document
  await fd.deleteDocument(fileObject);
  // Remove document from project
  project.removeDocument(fileObject);
}
