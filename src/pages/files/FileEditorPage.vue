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
  >
    <!-- Template: General -->
    <template v-slot:tab-general>
      <!-- File Object General -->
      <file-object-general
        v-model="editorData"
        @reverse-engineered="editorContainer?.setTab('columns')"
      />
    </template>
    <!-- Template: Columns -->
    <template v-slot:tab-columns>
      <!-- File Column Definitions -->
      <file-object-columns v-model="editorData" />
    </template>
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import { ref } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';
import FileObjectGeneral from 'components/app/files/FileObjectGeneral.vue';
import { Project } from 'src/scripts/application/Project';
import FileObjectColumns from 'components/app/files/FileObjectColumns.vue';

// Get composable components
const comp = useComposables();

// Editor container reference
const editorContainer = ref<InstanceType<typeof EditorContainer> | null>(null);

// Editor data object
const editorData = ref<EditorFileObjectData>(
  new EditorFileObjectData(comp.session.project as Project)
);
</script>
