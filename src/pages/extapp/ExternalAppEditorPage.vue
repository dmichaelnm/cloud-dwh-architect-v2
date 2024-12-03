<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :parent="comp.session.project ? comp.session.project : undefined"
    :scope="fd.EFirestoreDocumentType.ExternalApp"
    :tabs="[
      { key: 'provider', label: 'externalApp.label.provider' },
      { key: 'attributes', label: 'label.attributes' },
    ]"
    @created="onCreated"
  >
    <!-- Template for Provider tab -->
    <template v-slot:tab-provider>
      <!-- External app provider -->
      <external-app-editor-provider v-model="editorData" />
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
import ExternalAppEditorProvider from 'components/app/extapp/ExternalAppEditorProvider.vue';
import CustomAttributesTable from 'components/app/main/CustomAttributesTable.vue';
import { EditorExternalAppData } from 'src/scripts/ui/externalApp';
import { computed, onBeforeMount, ref } from 'vue';
import { ExternalApp } from 'src/scripts/application/ExternalApp';
import { Project } from 'src/scripts/application/Project';
import { EDocumentOperation } from 'src/scripts/utilities/common';

// Get composable components
const comp = cm.useComposables();

// Editor data
const editorData = ref<EditorExternalAppData>(new EditorExternalAppData());

// Flag resolving to true, if editor is in read only, otherwise false
const isReadOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === EDocumentOperation.View
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
    // Get external application ID
    const extAppId = comp.session.editorParameter.id as string;
    // Get external app object
    const extApp = (project as Project).getExternalApplication(extAppId);
    if (extApp) {
      // Initialize editor data
      editorData.value.initEditorData(extApp);
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
  // Create external application object
  const externalApp = new ExternalApp({ obj: document }, project);
  // Add external application to the project
  project.addDocument(externalApp);
}
</script>
