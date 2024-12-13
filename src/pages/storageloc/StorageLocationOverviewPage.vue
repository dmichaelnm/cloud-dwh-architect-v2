<template>
  <!-- Overview Container -->
  <overview-container
    :scope="fd.EFirestoreDocumentType.StorageLoc"
    :items="storageLocs"
    :permission="getPermission"
    :delete-handler="deleteItem"
    :columns="[
      {
        name: 'location',
        label: $t('storageLoc.label.location'),
        align: 'left',
        headerStyle: 'width: 350px',
        field: (row) => row.data.path,
      },
    ]"
  >
    <!-- Template: Location -->
    <template v-slot:body-cell-location="{ props }">
      <!-- Table Cell -->
      <q-td :props="props">
        <!-- Main DIV -->
        <div class="flex items-center q-gutter-x-md">
          <!-- Icon DIV -->
          <div>
            <!-- External App Icon -->
            <q-icon
              :name="`img:icons/${
                getExternalApp(props.row)?.data.provider
              }.png`"
              size="sm"
            />
          </div>
          <!-- Application & Path -->
          <div>
            <!-- Application Name -->
            <div>{{ getExternalApp(props.row)?.data.common.name }}</div>
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
import * as cm from 'src/scripts/utilities/common';
import * as fd from 'src/scripts/application/FirestoreDocument';
import * as sl from 'src/scripts/application/StorageLocation';
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { computed } from 'vue';
import { ExternalApp } from 'src/scripts/application/ExternalApp';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';

// Get composable components
const comp = cm.useComposables();

// Storage locations array
const storageLocs = computed(() =>
  comp.session.project
    ? (comp.session.project as Project).getStorageLocations()
    : []
);

/**
 * Retrieves an external application associated with the given row data.
 *
 * @param {any} row - The row data that potentially contains the information to identify the external application.
 * @return {ExternalApp | undefined} The external application if found, or undefined if not available.
 */
function getExternalApp(row: any): ExternalApp | undefined {
  // Get current project
  const project = comp.session.project;
  if (project) {
    // Get storage location
    const storageLoc = row as sl.StorageLocation;
    // Return external app
    return project.getExternalApplication(storageLoc.data.externalApp);
  }
  // Return undefined
  return undefined;
}

/**
 * Determines whether the current user has the necessary permission for a specified document operation.
 *
 * @param {EDocumentOperation} operation - The document operation to check permissions for. Valid operations include Create, View, Edit, and Delete.
 * @return {boolean} Returns true if the user has the required permissions, otherwise false.
 */
function getPermission(operation: cm.EDocumentOperation): boolean {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Check create permission
    if (operation === cm.EDocumentOperation.Create) {
      // Developer and above
      return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Deployer);
    }
    // Check view permission
    if (operation === cm.EDocumentOperation.View) {
      // Only visitors
      return project.isRoleLessOrEqualTo(EProjectMemberRole.Visitor);
    }
    // Check edit permission
    if (operation === cm.EDocumentOperation.Edit) {
      // Developer and above
      return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Developer);
    }
    // Check delete permission
    if (operation === cm.EDocumentOperation.Delete) {
      // Maintainer and above
      return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Developer);
    }
  }
  // No permissions
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
  await sl.deleteStorageLocation(document as sl.StorageLocation);
}
</script>
