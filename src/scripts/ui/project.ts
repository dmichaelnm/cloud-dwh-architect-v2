import { Account } from 'src/scripts/application/Account';
import {
  EProjectMemberRole,
  IProjectData,
  TProjectMember,
} from 'src/scripts/application/Project';
import { EditorData } from 'src/scripts/ui/common';

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

    return {
      access: accessList,
      common: {
        name: this.name,
        description: this.description,
      },
      member: member,
    };
  }
}
