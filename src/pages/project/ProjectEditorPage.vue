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
  >
    <!-- Template for General tab -->
    <template v-slot:tab-general>
      <project-editor-general v-model="editorData.general" />
    </template>

    <!-- Template for Member tab -->
    <template v-slot:tab-member></template>

    <!-- Template for Custom Attributes tab -->
    <template v-slot:tab-attributes></template>
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
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';

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
</script>
