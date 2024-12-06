<template>
  <!-- Overview Container -->
  <overview-container
    :scope="EFirestoreDocumentType.StorageLoc"
    :items="[]"
    :permission="getPermission"
  >
  </overview-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { EDocumentOperation } from 'src/scripts/utilities/common';

function getPermission(operation: EDocumentOperation): boolean {
  console.debug(operation);
  return true;
}
</script>
