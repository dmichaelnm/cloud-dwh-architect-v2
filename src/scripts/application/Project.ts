import * as fd from 'src/scripts/application/FirestoreDocument';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { where } from 'firebase/firestore';
import { getCurrentAccountId } from 'src/scripts/utilities/firebase';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import {
  ExternalApp,
  IExternalAppData,
} from 'src/scripts/application/ExternalApp';

/**
 * Enumeration for project member roles.
 * Defines the various roles that a member can have within a project.
 */
export enum EProjectMemberRole {
  /** Owner */
  Owner = 'owner',
  /** Manager */
  Manager = 'manager',
  /** Maintainer */
  Maintainer = 'maintainer',
  /** Deployer */
  Deployer = 'deployer',
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
   * Retrieves a list of external applications from the database.
   *
   * @return {ExternalApp[]} An array of external application instances.
   */
  getExternalApplications(): ExternalApp[] {
    return this.getDocuments<IExternalAppData, ExternalApp>(
      EFirestoreDocumentType.ExternalApp
    );
  }

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
      this.data.member.find((m) => m.role === EProjectMemberRole.Manager) ??
      null
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

  /**
   * Determines whether the current user has the required permission level.
   *
   * @param {EProjectMemberRole} minRole - The minimum role required to pass the check.
   * @return {boolean} Returns true if the current user's role level is equal to or higher than the required role level, false otherwise.
   */
  isRoleGreaterOrEqualTo(minRole: EProjectMemberRole): boolean {
    // Get own role
    const role = this.getRole();
    if (role) {
      // Get own level
      const ownLevel = getRoleLevel(role);
      // Get the least level
      const leastLevel = getRoleLevel(minRole);
      // Return permission
      return ownLevel >= leastLevel;
    }
    // No permission
    return false;
  }

  /**
   * Checks if the role of the current user is less than or equal to the specified maximum role.
   *
   * @param {EProjectMemberRole} maxRole - The maximum role to compare against.
   * @return {boolean} True if the current user's role is less than or equal to the specified role, otherwise false.
   */
  isRoleLessOrEqualTo(maxRole: EProjectMemberRole): boolean {
    // Get own role
    const role = this.getRole();
    if (role) {
      // Get own level
      const ownLevel = getRoleLevel(role);
      // Get the least level
      const leastLevel = getRoleLevel(maxRole);
      // Return permission
      return ownLevel <= leastLevel;
    }
    // No permission
    return false;
  }
}

/**
 * Loads project documents where the current user has access.
 *
 * @return {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export async function loadProjects(): Promise<Project[]> {
  // Load project documents where the current user has access
  const documents = await fd.loadDocuments(
    fd.EFirestoreDocumentType.Project,
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

/**
 * Deletes the specified project and all related documents from the database.
 *
 * @param {Project} project - The project instance to be deleted.
 */
export async function deleteProject(project: Project): Promise<void> {
  // Delete the Firestore document of the project
  await fd.deleteDocument(project);
}

/**
 * Retrieves the numerical level corresponding to a given project member role.
 *
 * @param {EProjectMemberRole} role - The role of the project member.
 * @return {number} The level associated with the specified role.
 */
function getRoleLevel(role: EProjectMemberRole): number {
  switch (role) {
    case EProjectMemberRole.Owner:
      return 100;
    case EProjectMemberRole.Manager:
      return 90;
    case EProjectMemberRole.Maintainer:
      return 80;
    case EProjectMemberRole.Deployer:
      return 70;
    case EProjectMemberRole.Developer:
      return 60;
    case EProjectMemberRole.Visitor:
      return 50;
    default:
      return 0;
  }
}
