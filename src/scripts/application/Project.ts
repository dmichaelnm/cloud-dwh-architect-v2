import { where } from 'firebase/firestore';
import * as fd from 'src/scripts/application/FirestoreDocument';
import {
  EFirestoreDocumentType,
  loadDocuments,
} from 'src/scripts/application/FirestoreDocument';
import { getCurrentAccountId } from 'src/scripts/utilities/firebase';
import { TCustomAttribute } from 'src/scripts/utilities/common';

/**
 * Enumeration for project member roles.
 * Defines the various roles that a member can have within a project.
 */
export enum EProjectMemberRole {
  /** Owner */
  Owner = 'owner',
  /** Manager */
  Manager = 'manager',
  /** Developer */
  Developer = 'developer',
  /** Visitor */
  Visitor = 'visitor',
}

/**
 * Represents a member of a project.
 */
export type TProjectMember = {
  /** ID of the account of the member */
  id: string;
  /** Display name of the account */
  name: string;
  /** Role of the member */
  role: EProjectMemberRole;
  /** Description */
  description: string | null;
};

/**
 * Represents the data structure for a project within the system.
 */
export interface IProjectData extends fd.IFirestoreDocumentData {
  /** Access List */
  access: string[];
  /** Members of the project */
  member: TProjectMember[];
  /** Custom Attributes */
  attributes: TCustomAttribute[];
}

/**
 * Represents a Project document in Firestore.
 */
export class Project extends fd.FirestoreDocument<IProjectData> {}

/**
 * Loads project documents where the current user has access.
 *
 * @return {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export async function loadProjects(): Promise<Project[]> {
  // Load project documents where the current user has access
  return await loadDocuments<IProjectData, Project>(
    EFirestoreDocumentType.Project,
    null,
    where('access', 'array-contains', getCurrentAccountId())
  );
}
