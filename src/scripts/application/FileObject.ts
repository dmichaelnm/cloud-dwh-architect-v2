import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';

export interface IFileObjectData extends IFirestoreDocumentData {}

export class FileObject extends ProjectDocument<IFileObjectData> {}
