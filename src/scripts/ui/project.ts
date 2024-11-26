import { Account, getAccount } from 'src/scripts/application/Account';
import {
  EProjectMemberRole,
  IProjectData,
  TProjectMember,
} from 'src/scripts/application/Project';
import { EditorData } from 'src/scripts/ui/common';
import { TCustomAttribute } from 'src/scripts/utilities/common';
import { FirestoreDocument } from 'src/scripts/application/FirestoreDocument';

/**
 * Represents the general details of a project.
 */
export type TProjectGeneral = {
  /** Project Owner */
  owner: Account | null;
  /** Project Manager */
  manager: Account | null;
};

/**
 * Class representing the data of a project in the editor.
 */
export class EditorProjectData extends EditorData<IProjectData> {
  /** General properties of the project */
  general: TProjectGeneral;

  /** Project members */
  member: TProjectMember[];

  /** Custom attributes */
  attributes: TCustomAttribute[];

  /**
   * Default constructor.
   */
  constructor() {
    super();
    this.general = {
      owner: null,
      manager: null,
    };
    this.member = [];
    this.attributes = [];
  }

  /**
   * Initializes the editor with data from the provided Firestore document.
   *
   * @param {FirestoreDocument<IProjectData>} document - The Firestore document containing project data.
   * @return {Promise<void>} A promise that resolves when the data has been initialized.
   */
  async initEditorData(
    document: FirestoreDocument<IProjectData>
  ): Promise<void> {
    // Attach Firestore document
    this.document = document;
    // Apply name and description
    this.name = document.data.common.name;
    this.description = document.data.common.description;
    // Apply general properties
    this.general.owner = await getAccount(
      document.data.member.find((m) => m.role === EProjectMemberRole.Owner)
        ?.id as string
    );
    this.general.manager = await getAccount(
      document.data.member.find((m) => m.role === EProjectMemberRole.Manager)
        ?.id as string
    );
    // Apply member array
    for (const member of document.data.member) {
      // Exclude owner and manager
      if (
        member.role !== EProjectMemberRole.Owner &&
        member.role !== EProjectMemberRole.Manager
      ) {
        this.member.push({
          id: member.id,
          name: member.name,
          role: member.role,
          description: member.description,
        });
      }
    }
    // Apply custom attributes
    for (const attribute of document.data.attributes) {
      this.attributes.push({
        key: attribute.key,
        type: attribute.type,
        value: attribute.value,
      });
    }
  }

  /**
   * Creates and returns the project data object including members and their roles,
   * as well as common project properties like name and description.
   *
   * @return {IProjectData} The constructed project data object with access list,
   *                        common properties, and members.
   */
  createData(): IProjectData {
    // Create member array
    const member: TProjectMember[] = [];
    // Add owner to member array
    member.push({
      id: this.general.owner?.id as string,
      name: this.general.owner?.data.common.name as string,
      role: EProjectMemberRole.Owner,
      description: null,
    });
    // Add manager to member array
    member.push({
      id: this.general.manager?.id as string,
      name: this.general.manager?.data.common.name as string,
      role: EProjectMemberRole.Manager,
      description: null,
    });
    // Add normal project members
    member.push(...this.member);
    // Create access list
    const accessList: string[] = [];
    accessList.push(...new Set(member.map((m) => m.id)));
    // Return final data object
    return {
      access: accessList,
      common: {
        name: this.name,
        description: this.description,
      },
      member: member,
      attributes: this.attributes,
    };
  }
}
