import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';
import { EFileType } from 'src/scripts/utilities/common';

export interface IFileObjectData extends IFirestoreDocumentData {
  /** Storage Location */
  stoageLocation: string;
  /** File Type */
  type: EFileType;
  /** Path to the file in the cloud storage */
  path: string;
}

export class FileObject extends ProjectDocument<IFileObjectData> {}

/**
 * Determines the file type based on the provided file extension.
 *
 * @param {string} extension - The file extension to evaluate.
 * @return {EFileType} The corresponding file type as an EFileType enum value.
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
    case 'csv':
      return EFileType.CSV;
    default:
      return EFileType.Unknown;
  }
}
