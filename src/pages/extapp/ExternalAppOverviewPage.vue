<template>
  <!-- Overview Container -->
  <overview-container
    :scope="fd.EFirestoreDocumentType.ExternalApp"
    :items="externalApps"
    :permission="getPermission"
    :delete-handler="deleteItem"
    :columns="[
      {
        name: 'provider',
        label: $t('externalApp.label.provider'),
        align: 'left',
        headerStyle: 'width: 250px',
        icon: (row) => `img:icons/${row.data.provider}.png`,
        field: (row) =>
          $t(`enumeration.externalAppProvider.${row.data.provider}`),
      },
    ]"
  >
    <!-- Template: Provider -->
    <template v-slot:body-cell-provider="{ props }">
      <!-- Table Cell -->
      <q-td :props="props">
        <!-- Main DIV -->
        <div class="flex items-center q-gutter-x-md">
          <!-- Icon DIV -->
          <div>
            <!-- External App Icon -->
            <q-icon
              :name="`img:icons/${props.row.data.provider}.png`"
              size="sm"
            />
          </div>
          <!-- Application & Path -->
          <div>
            <!-- Application Name -->
            <div>{{ props.row.data.common.name }}</div>
            <!-- Path -->
            <div class="text-italic">{{ props.row.data.path }}</div>
          </div>
        </div>
      </q-td>
    </template>
  </overview-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as fd from 'src/scripts/application/FirestoreDocument';
import * as cm from 'src/scripts/utilities/common';
import * as ea from 'src/scripts/application/ExternalApp';
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { computed } from 'vue';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';

// Get composable components
const comp = cm.useComposables();

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
function getPermission(operation: cm.EDocumentOperation): boolean {
  // Check for current project
  if (comp.session.project) {
    // Check view permission
    if (operation === cm.EDocumentOperation.View) {
      return comp.session.project.isRoleLessOrEqualTo(
        EProjectMemberRole.Deployer
      );
    }
    // Check create/edit/delete permission
    if (
      operation === cm.EDocumentOperation.Create ||
      operation === cm.EDocumentOperation.Edit ||
      operation === cm.EDocumentOperation.Delete
    ) {
      return comp.session.project.isRoleGreaterOrEqualTo(
        EProjectMemberRole.Maintainer
      );
    }
  }
  return false;
}

/**
 * Deletes a specified Firestore document and removes it from the current project session if applicable.
 *
 * @param {fd.FirestoreDocument<fd.IFirestoreDocumentData>} document - The Firestore document to be deleted.
 */
async function deleteItem(
  document: fd.FirestoreDocument<fd.IFirestoreDocumentData>
): Promise<void> {
  // Delete the document
  await ea.deleteExternalApp(document as ea.ExternalApp);
}
</script>
