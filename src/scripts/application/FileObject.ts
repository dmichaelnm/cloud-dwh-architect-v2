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
