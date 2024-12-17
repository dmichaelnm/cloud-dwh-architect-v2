import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { EFileType } from 'src/scripts/utilities/common';
import { TColumnDefinition } from 'src/scripts/application/CommonTypes';

/**
 * Represents the properties for configuring a CSV file. This type is used
 * to define the format and structure of a CSV file.
 */
export type TFilePropertiesCSV = {
  /** Row Separator */
  rowSeparator: 'CRLF' | 'LF' | 'CR';
  /** Field Delimitor */
  fieldDelimitor: string;
  /** Quote Character */
  quoteCharacter: string;
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
export interface IFileObjectData extends IFirestoreDocumentData {
  /** Storage Location */
  stoageLocation: string;
  /** File Type */
  type: EFileType;
  /** File name in the cloud storage */
  file: string;
  /** File Properties */
  properties: TFileProperties;
  /** Column definitions */
  columns: TFileColumnDefinition[];
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
      return EFileType.CSV;
    // Unknown file type
    default:
      return EFileType.Unknown;
  }
}

/**
 * Retrieves file properties based on the provided file type.
 *
 * @param {EFileType} type - The type of the file for which properties are to be retrieved.
 * @return {TFileProperties} The properties corresponding to the given file type. Returns null if the file type is unknown.
 */
export function getFilePropertiesFromType(type: EFileType): TFileProperties {
  switch (type) {
    // CSV Properties
    case EFileType.CSV:
      return {
        rowSeparator: 'CRLF',
        fieldDelimitor: ',',
        quoteCharacter: '"',
        hasHeaderRow: false,
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'HH:mm:ss',
        timestampFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
        decimalSeparator: '.',
      };
    // Unknown File Properties
    default:
      return null;
  }
}
