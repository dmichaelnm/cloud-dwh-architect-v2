<template>
  <!-- Overview Container -->
  <overview-container
    :scope="EFirestoreDocumentType.File"
    :items="fileObjects"
    :permission="getPermission"
    :delete-handler="deleteItem"
    :columns="[
      {
        name:'location',
        label: $t('file.label.location'),
        align: 'left',
        headerStyle: 'width: 300px',
        field: row => (row as fo.FileObject).data.file
      },
      {
        name: 'type',
        label: $t('file.label.type'),
        align: 'center',
        headerStyle: 'width: 150px',
        field: row => (row as fo.FileObject).data.type
      },
      {
        name: 'count',
        label: $t('file.label.columnCount'),
        align: 'center',
        headerStyle: 'width: 100px',
        field: row => (row as fo.FileObject).data.columns.length
      }]"
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
            <div class="text-italic">
              {{ getStorageLocation(props.row)?.data.path }}
            </div>
            <!-- File -->
            <div class="text-italic">{{ props.row.data.file }}</div>
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
import * as fo from 'src/scripts/application/FileObject';
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { EDocumentOperation } from 'src/scripts/utilities/common';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';
import { computed } from 'vue';
import { ExternalApp } from 'src/scripts/application/ExternalApp';
import { StorageLocation } from 'src/scripts/application/StorageLocation';

// Get composable components
const comp = cm.useComposables();

// File objects array
const fileObjects = computed(() =>
  comp.session.project ? (comp.session.project as Project).getFileObjects() : []
);

/**
 * Determines whether the user has the required permission for a given document operation.
 *
 * @param {cm.EDocumentOperation} operation - The document operation to check permissions for.
 *        Possible values include creating, editing, deleting, or viewing a document.
 * @return {boolean} - Returns true if the user has the necessary permissions for the operation, otherwise false.
 */
function getPermission(operation: cm.EDocumentOperation): boolean {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Check create, edit and delete permission
    if (
      operation === cm.EDocumentOperation.Create ||
      operation === EDocumentOperation.Edit ||
      operation === EDocumentOperation.Delete
    ) {
      // Only developer and above
      return project.isRoleGreaterOrEqualTo(EProjectMemberRole.Developer);
    }
    // Check View permission
    if (operation === EDocumentOperation.View) {
      // Only Visitors
      return project.isRoleLessOrEqualTo(EProjectMemberRole.Visitor);
    }
  }
  // No permission
  return false;
}

/**
 * Retrieves an external application associated with the given row data.
 *
 * @param {any} row - The row data that potentially contains the information to identify the external application.
 * @return {ExternalApp | undefined} The external application if found, or undefined if not available.
 */
function getExternalApp(row: any): ExternalApp | undefined {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get file object
    const fileObject = row as fo.FileObject;
    if (fileObject) {
      // Get storage location
      const storageLoc = project.getStorageLocation(
        fileObject.data.stoageLocation
      );
      if (storageLoc) {
        // Return external app
        return project.getExternalApplication(storageLoc.data.externalApp);
      }
    }
  }
  // Return undefined
  return undefined;
}

/**
 * Retrieves the storage location for the provided row if available.
 *
 * @param {any} row - The row object, which is expected to represent a file object containing a valid storage location.
 * @return {StorageLocation | undefined} The storage location associated with the provided file object, or undefined
 *         if it cannot be determined.
 */
function getStorageLocation(row: any): StorageLocation | undefined {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get file object
    const fileObject = row as fo.FileObject;
    if (fileObject) {
      // Return storage location
      return project.getStorageLocation(fileObject.data.stoageLocation);
    }
  }
  // Return undefined
  return undefined;
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
  await fo.deleteFileObject(document as fo.FileObject);
}
</script>
