<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :scope="fd.EFirestoreDocumentType.StorageLoc"
    :parent="comp.session.project ? comp.session.project : undefined"
    :tabs="[
      { key: 'general', label: 'label.general' },
      { key: 'attributes', label: 'label.attributes' },
    ]"
    @created="onCreated"
  >
    <!-- Template for General tab -->
    <template v-slot:tab-general>
      <storage-location-general v-model="editorData" />
    </template>
    <!-- Template for Custom Attributes tab -->
    <template v-slot:tab-attributes>
      <custom-attributes-table
        v-model="editorData.attributes"
        :read-only="isReadOnly"
      />
    </template>
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as fd from 'src/scripts/application/FirestoreDocument';
import * as cm from 'src/scripts/utilities/common';
import EditorContainer from 'components/app/main/EditorContainer.vue';
import { EditorStorageLocationData } from 'src/scripts/ui/storageLocation';
import { computed, ref } from 'vue';
import { Project } from 'src/scripts/application/Project';
import { StorageLocation } from 'src/scripts/application/StorageLocation';
import CustomAttributesTable from 'components/app/main/CustomAttributesTable.vue';
import StorageLocationGeneral from 'components/app/storageloc/StorageLocationGeneral.vue';

// Get composable components
const comp = cm.useComposables();

// Editor data
const editorData = ref<EditorStorageLocationData>(
  new EditorStorageLocationData(comp.session.project as Project)
);

// Flag resolving to true, if editor is in read only, otherwise false
const isReadOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === cm.EDocumentOperation.View
    : false
);

/**
 * Handles actions to be taken when a new Firestore document is created.
 *
 * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document that was created.
 */
function onCreated(
  document: fd.FirestoreDocument<fd.IFirestoreDocumentData>
): void {
  // Get current project
  const project = comp.session.project as Project;
  // Create storage location object
  const storageLoc = new StorageLocation({ obj: document }, project);
  // Add storage location to project
  project.addDocument(storageLoc);
}
</script>
