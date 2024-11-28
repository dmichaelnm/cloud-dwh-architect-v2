<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :parent="comp.session.project ? comp.session.project : undefined"
    :scope="EFirestoreDocumentType.ExternalApp"
    :tabs="[]"
    @created="onCreated"
  >
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import {
  EFirestoreDocumentType,
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { EditorExternalAppData } from 'src/scripts/ui/externalApp';
import { onBeforeMount, ref } from 'vue';
import {
  EDocumentOperation,
  useComposables,
} from 'src/scripts/utilities/common';
import { ExternalApp } from 'src/scripts/application/ExternalApp';
import { Project } from 'src/scripts/application/Project';

// Get composable components
const comp = useComposables();

// Editor data
const editorData = ref<EditorExternalAppData>(new EditorExternalAppData());

// Computes the readOnly state based on the editor parameters;
// it returns true if the operation is "View" or if there are no editor parameters.
/*
const readOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === EDocumentOperation.View
    : true
);
*/
// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Get current project
  const project = comp.session.project;
  if (
    project &&
    (comp.session.editorParameter?.operation === EDocumentOperation.Edit ||
      comp.session.editorParameter?.operation === EDocumentOperation.View)
  ) {
    // Get external application ID
    const extAppId = comp.session.editorParameter.id as string;
    // Get external app object
    const extApp = (project as Project).getExternalApplication(extAppId);
    if (extApp) {
      // Initialize editor data
      editorData.value.initEditorData(extApp);
      console.debug(editorData.value);
    }
  }
});

/**
 * Handles actions to be taken when a new Firestore document is created.
 *
 * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document that was created.
 */
function onCreated(document: FirestoreDocument<IFirestoreDocumentData>): void {
  // Get current project
  const project = comp.session.project as Project;
  // Create external application object
  const externalApp = new ExternalApp({ obj: document }, project);
  // Add external application to the project
  project.addDocument(externalApp);
}
</script>
