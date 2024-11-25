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
export class Project extends fd.FirestoreDocument<IProjectData> {
  /**
   * Retrieves the project member who holds the role of Owner.
   *
   * @return {TProjectMember | null} The project member with the role of Owner, or null if no Owner is found.
   */
  getOwner(): TProjectMember | null {
    return (
      this.data.member.find((m) => m.role === EProjectMemberRole.Owner) ?? null
    );
  }

  /**
   * Retrieves the manager from the list of project members.
   *
   * @return {TProjectMember | null} The manager if found, otherwise null.
   */
  getManager(): TProjectMember | null {
    return (
      this.data.member.find((m) => m.role === EProjectMemberRole.Manager) ?? null
    );
  }

  /**
   * Retrieves the role of the current account member within the project.
   *
   * @return {EProjectMemberRole | null} The role of the member if found, otherwise null.
   */
  getRole(): EProjectMemberRole | null {
    // Get current account ID
    const id = getCurrentAccountId();
    // Find member with that ID
    const member = this.data.member.find((m) => m.id === id);
    // Return role of the member
    return member?.role ?? null;
  }
}

/**
 * Loads project documents where the current user has access.
 *
 * @return {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export async function loadProjects(): Promise<Project[]> {
  // Load project documents where the current user has access
  const documents = await loadDocuments(
    EFirestoreDocumentType.Project,
    null,
    where('access', 'array-contains', getCurrentAccountId())
  );
  // Create projects array
  const projects: Project[] = [];
  for (const document of documents) {
    projects.push(new Project({ obj: document }));
  }
  // Return the projects array
  return projects;
}
