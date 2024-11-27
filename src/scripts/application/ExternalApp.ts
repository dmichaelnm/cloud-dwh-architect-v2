import { IFirestoreDocumentData } from 'src/scripts/application/FirestoreDocument';
import { ProjectDocument } from 'src/scripts/application/ProjectDocument';

export interface IExternalAppData extends IFirestoreDocumentData {}

export class ExternalApp extends ProjectDocument<IExternalAppData> {}
