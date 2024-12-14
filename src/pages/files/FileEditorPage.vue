<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :scope="EFirestoreDocumentType.File"
    :parent="comp.session.project ? comp.session.project : undefined"
    :tabs="[
      {
        key: 'general',
        label: $t('label.general'),
      },
      {
        key: 'columns',
        label: $t('file.label.columns'),
      },
      {
        key: 'attributes',
        label: $t('label.attributes'),
      },
    ]"
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import { ref } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';

// Get composable components
const comp = useComposables();

const editorData = ref<EditorFileObjectData>(new EditorFileObjectData());
</script>
