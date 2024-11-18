import * as fd from 'src/scripts/application/FirestoreDocument';

export interface IProjectData extends fd.IFirestoreDocumentData {}

export class Project extends fd.FirestoreDocument<IProjectData> {}
