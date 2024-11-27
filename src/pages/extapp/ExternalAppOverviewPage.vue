<template>
  <!-- Overview Container -->
  <overview-container
    :scope="fd.EFirestoreDocumentType.ExternalApp"
    :items="externalApps"
    :permission="getPermission"
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

// Get composable components
const comp = useComposables();

// Returns an array of external applications of the current project
const externalApps = computed(() =>
  comp.session.project ? (comp.session.project as Project).getExternalApplications() : []
);

function getPermission(operation: EDocumentOperation): boolean {
  // Check for current project
  if (comp.session.project) {
    // Check create permission
    if (operation === EDocumentOperation.Create) {
      return comp.session.project.isRoleGreaterOrEqualTo(
        EProjectMemberRole.Maintainer
      );
    }
  }
  return false;
}
</script>
