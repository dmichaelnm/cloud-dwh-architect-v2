<template>
  <!-- Overview Container -->
  <overview-container
    :scope="EFirestoreDocumentType.Project"
    :items="projects"
    :permission="getPermission"
    :delete-handler="_deleteProject"
    :columns="[
      {
        name: 'owner',
        label: $t('enumeration.memberRole.owner'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => (row as Project).getOwner()?.name
      },
      {
        name: 'manager',
        label: $t('enumeration.memberRole.manager'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => (row as Project).getManager()?.name
      },
      {
        name: 'role',
        label: $t('project.label.ownRole'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => $t(`enumeration.memberRole.${(row as Project).getRole()}`)
      }
    ]"
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import {
  EFirestoreDocumentType,
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { deleteProject, EProjectMemberRole, Project } from 'src/scripts/application/Project';
import { computed } from 'vue';
import {
  EDocumentOperation,
  useComposables,
} from 'src/scripts/utilities/common';

// Get composable components
const comp = useComposables();

// The projects to be displayed in the overview
const projects = computed(() => (comp.session ? comp.session.projects : []));

/**
 * Checks if the current user has permission to perform a specified operation on a project.
 *
 * @param {EDocumentOperation} operation - The operation to be performed (e.g., Edit).
 * @param {any} row - The current row, expected to be a project instance.
 * @return {boolean} - Returns true if the user has the necessary permission; otherwise, false.
 */
function getPermission(operation: EDocumentOperation, row: any): boolean {
  // Get project instance
  const project = row as Project;
  // Check for view operation
  if (operation === EDocumentOperation.View) {
    return project.isRoleLessOrEqualTo(EProjectMemberRole.Maintainer);
  }
  // Check for edit operation
  if (operation === EDocumentOperation.Edit) {
    return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Manager);
  }
  // Check for delete operation
  if (operation === EDocumentOperation.Delete) {
    return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Owner);
  }
  // No permission
  return false;
}

/**
 * Deletes a project from Firestore and removes it from the session store.
 *
 * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document representing the project to be deleted.
 */
async function _deleteProject(
  document: FirestoreDocument<IFirestoreDocumentData>
): Promise<void> {
  // Delete the Firestore project
  await deleteProject(document as Project);
  // Remove project from the session store
  comp.session.removeProject(document.id);
  // Check if the deleted project was the current project
  if (document.id === comp.session.project?.id) {
    // Set current project to null
    comp.session.project = null;
  }
}
</script>
