<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :scope="EFirestoreDocumentType.Project"
    :read-only="readOnly"
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
    @created="onCreated"
  >
    <!-- Template for General tab -->
    <template v-slot:tab-general>
      <project-editor-general v-model="editorData" />
    </template>

    <!-- Template for Member tab -->
    <template v-slot:tab-member>
      <project-editor-member v-model="editorData" :read-only="readOnly" />
    </template>

    <!-- Template for Custom Attributes tab -->
    <template v-slot:tab-attributes>
      <custom-attributes-table
        v-model="editorData.attributes"
        :read-only="readOnly"
      />
    </template>
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import ProjectEditorGeneral from 'components/app/project/ProjectEditorGeneral.vue';
import { computed, onBeforeMount, ref } from 'vue';
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

// Computes the readOnly state based on the editor parameters;
// it returns true if the operation is "View" or if there are no editor parameters.
const readOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === EDocumentOperation.View
    : true
);

// Lifecycle method that is called before this component is mounted
onBeforeMount(async () => {
  // Check editor mode
  if (comp.session.editorParameter?.operation === EDocumentOperation.Create) {
    // Initialize general properties
    editorData.value.general = {
      owner: comp.session.account,
      manager: comp.session.account,
    };
  } else if (
    comp.session.editorParameter?.operation === EDocumentOperation.Edit ||
    comp.session.editorParameter?.operation === EDocumentOperation.View
  ) {
    // Get the selected project
    const projectId = comp.session.editorParameter.id;
    const project = comp.session.getProject(projectId);
    if (project) {
      // Initialize editor data
      await editorData.value.initEditorData(project);
    }
  }
});

/**
 * This method is called when a Firestore document is created. It handles the creation
 * of a new project based on the received document, adds the project to the current session,
 * sorts the list of projects, and updates the account with the new project set as the current one.
 *
 * @param {FirestoreDocument<IFirestoreDocumentData>} document - The Firestore document based on which the new project is created.
 */
function onCreated(document: FirestoreDocument<IFirestoreDocumentData>): void {
  // Create project
  const project = new Project({ obj: document });
  // Add project to session
  comp.session.projects.push(project);
  // Sort projects
  comp.session.sortProjects();
  // Set new project as active on the account
  if (comp.session.account) {
    comp.session.account.data.state.currentProject = document.id;
    updateDocument(comp.session.account);
  }
  // Set current project
  comp.session.project = project;
}
</script>
