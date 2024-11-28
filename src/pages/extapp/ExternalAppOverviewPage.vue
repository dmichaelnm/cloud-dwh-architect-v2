<template>
  <!-- Overview Container -->
  <overview-container
    :scope="fd.EFirestoreDocumentType.ExternalApp"
    :items="externalApps"
    :permission="getPermission"
    :delete-handler="deleteItem"
  >
  </overview-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as fd from 'src/scripts/application/FirestoreDocument';
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import {
  EDocumentOperation,
  useComposables,
} from 'src/scripts/utilities/common';
import { computed } from 'vue';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';
import {
  deleteDocument,
  FirestoreDocument,
  IFirestoreDocumentData
} from 'src/scripts/application/FirestoreDocument';

// Get composable components
const comp = useComposables();

// Returns an array of external applications of the current project
const externalApps = computed(() =>
  comp.session.project
    ? (comp.session.project as Project).getExternalApplications()
    : []
);

/**
 * Determines if the current user has the necessary permissions for an operation on a document.
 *
 * @param {EDocumentOperation} operation - The type of document operation being checked (e.g., View, Create, Edit, Delete).
 * @return {boolean} - Returns true if the user has the required permission for the specified operation; otherwise, returns false.
 */
function getPermission(operation: EDocumentOperation): boolean {
  // Check for current project
  if (comp.session.project) {
    // Check view permission
    if (operation === EDocumentOperation.View) {
      return comp.session.project.isRoleLessOrEqualTo(
        EProjectMemberRole.Deployer
      );
    }
    // Check create/edit/delete permission
    if (
      operation === EDocumentOperation.Create ||
      operation === EDocumentOperation.Edit ||
      operation === EDocumentOperation.Delete
    ) {
      return comp.session.project.isRoleGreaterOrEqualTo(
        EProjectMemberRole.Maintainer
      );
    }
  }
  return false;
}

async function deleteItem(
  document: FirestoreDocument<IFirestoreDocumentData>
): Promise<void> {
  // Get current project
  const project = comp.session.project;
  if (project) {
    // Delete the document
    await deleteDocument(document);
    // Remove the document from the current project
    (project as Project).removeDocument(document);
  }
}
</script>
