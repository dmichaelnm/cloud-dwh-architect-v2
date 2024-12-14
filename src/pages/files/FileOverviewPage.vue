<template>
  <!-- Overview Container -->
  <overview-container
    :scope="EFirestoreDocumentType.File"
    :items="[]"
    :permission="getPermission"
  >
  </overview-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';

// Get composable components
const comp = cm.useComposables();

function getPermission(operation: cm.EDocumentOperation): boolean {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Check create permission
    if (operation === cm.EDocumentOperation.Create) {
      // Only developer and above
      return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Developer);
    }
  }
  // No permission
  return false;
}
</script>
