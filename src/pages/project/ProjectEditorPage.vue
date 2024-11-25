<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :scope="EFirestoreDocumentType.Project"
    :mode="
      comp.session.editorParameter
        ? comp.session.editorParameter.operation
        : EDocumentOperation.Create
    "
    :tabs="[
      { key: 'general', label: 'label.general' },
      { key: 'member', label: 'project.label.member' },
      { key: 'attributes', label: 'label.attributes' },
    ]"
    @save="onSaved"
  >
    <!-- Template for General tab -->
    <template v-slot:tab-general>
      <project-editor-general v-model="editorData" />
    </template>

    <!-- Template for Member tab -->
    <template v-slot:tab-member>
      <project-editor-member v-model="editorData" />
    </template>

    <!-- Template for Custom Attributes tab -->
    <template v-slot:tab-attributes>
      <custom-attributes-table v-model="editorData.attributes" />
    </template>
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import ProjectEditorGeneral from 'components/app/project/ProjectEditorGeneral.vue';
import { onBeforeMount, ref } from 'vue';
import {
  EDocumentOperation,
  useComposables,
} from 'src/scripts/utilities/common';
import { EditorProjectData } from 'src/scripts/ui/project';
import {
  EFirestoreDocumentType,
  FirestoreDocument,
  IFirestoreDocumentData,
  updateDocument,
} from 'src/scripts/application/FirestoreDocument';
import { Project } from 'src/scripts/application/Project';
import ProjectEditorMember from 'components/app/project/ProjectEditorMember.vue';
import CustomAttributesTable from 'components/app/main/CustomAttributesTable.vue';

// Get composable components
const comp = useComposables();

// General project properties
const editorData = ref<EditorProjectData>(new EditorProjectData());

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Check editor mode
  if (comp.session.editorParameter?.operation === EDocumentOperation.Create) {
    // Initialize general properties
    editorData.value.general = {
      owner: comp.session.account,
      manager: comp.session.account,
    };
  }
});

/**
 * Handles the event when a document is saved to Firestore. This function adds the saved document
 * to the session's projects list and sorts the projects.
 *
 * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document that has been saved.
 */
function onSaved(document: FirestoreDocument<IFirestoreDocumentData>): void {
  // Add project to session
  comp.session.projects.push(new Project({obj: document}));
  // Sort projects
  comp.session.sortProjects();
  // Set new project as active on the account
  if (comp.session.account) {
    comp.session.account.data.state.currentProject = document.id;
    updateDocument(comp.session.account);
  }
  // Set current project
  comp.session.project = document as Project;
}
</script>
