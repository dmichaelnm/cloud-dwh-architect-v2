<template>
  <!-- Editor Container -->
  <editor-container
    v-model="editorData"
    :scope="EFirestoreDocumentType.ExternalApp"
    :tabs="[]"
  >
  </editor-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditorContainer from 'components/app/main/EditorContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EditorExternalAppData } from 'src/scripts/ui/externalApp';
import { ref } from 'vue';

// Editor data
const editorData = ref<EditorExternalAppData>(new EditorExternalAppData());
</script>
