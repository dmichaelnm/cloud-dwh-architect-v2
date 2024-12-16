import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { EFileType } from 'src/scripts/utilities/common';

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
};

/**
 * Represents the properties of a file as a type.
 * This type can either represent valid CSV file properties
 * (as defined in TFilePropertiesCSV) or a null value when no
 * file properties are available.
 */
export type TFileProperties = TFilePropertiesCSV | null;

export interface IFileObjectData extends IFirestoreDocumentData {
  /** Storage Location */
  stoageLocation: string;
  /** File Type */
  type: EFileType;
  /** Path to the file in the cloud storage */
  path: string;
  /** File Properties */
  properties: TFileProperties;
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
      };
    // Unknown File Properties
    default:
      return null;
  }
}
