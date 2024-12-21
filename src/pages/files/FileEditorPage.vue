<template>
  <!-- Editor Container -->
  <editor-container
    ref="editorContainer"
    v-model="editorData"
    :scope="EFirestoreDocumentType.File"
    :parent="comp.session.project ? comp.session.project : undefined"
    :tabs="[
      {
        key: 'general',
        label: 'label.general',
      },
      {
        key: 'columns',
        label: 'file.label.columns',
      },
      {
        key: 'attributes',
        label: 'label.attributes',
      },
    ]"
    @created="onCreated"
  >
    <!-- Template: General -->
    <template v-slot:tab-general>
      <!-- File Object General -->
      <file-object-general
        v-model="editorData"
        :read-only="isReadOnly"
        @reverse-engineered="editorContainer?.setTab('columns')"
      />
    </template>
    <!-- Template: Columns -->
    <template v-slot:tab-columns>
      <!-- File Column Definitions -->
      <file-object-columns v-model="editorData" :read-only="isReadOnly" />
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
import FileObjectGeneral from 'components/app/files/FileObjectGeneral.vue';
import FileObjectColumns from 'components/app/files/FileObjectColumns.vue';
import CustomAttributesTable from 'components/app/main/CustomAttributesTable.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import { computed, onBeforeMount, ref } from 'vue';
import { Project } from 'src/scripts/application/Project';
import { FileObject } from 'src/scripts/application/FileObject';

// Get composable components
const comp = cm.useComposables();

// Editor container reference
const editorContainer = ref<InstanceType<typeof EditorContainer> | null>(null);

// Editor data object
const editorData = ref<EditorFileObjectData>(
  new EditorFileObjectData(comp.session.project as Project)
);

// Flag resolving to true, if editor is in read only, otherwise false
const isReadOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === cm.EDocumentOperation.View
    : false
);

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Get current project
  const project = comp.session.project;
  if (
    project &&
    (comp.session.editorParameter?.operation === cm.EDocumentOperation.Edit ||
      comp.session.editorParameter?.operation === cm.EDocumentOperation.View)
  ) {
    // Get storage location ID
    const fileObjectId = comp.session.editorParameter.id as string;
    // Get storage location object
    const fileObject = (project as Project).getFileObject(fileObjectId);
    if (fileObject) {
      // Initialize editor data
      editorData.value.initEditorData(fileObject);
    }
  }
});

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
  const fileObject = new FileObject({ obj: document }, project);
  // Add storage location to project
  project.addDocument(fileObject);
}
</script>
