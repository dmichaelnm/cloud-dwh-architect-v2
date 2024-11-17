<template>
  <!-- Layout -->
  <q-layout view="hHh Lpr fFf">
    <!-- Message Dialog -->
    <message-dialog
      v-model="messageDialogOptions.visibility"
      :options="messageDialogOptions"
    />

    <!-- Application Footer -->
    <app-footer />

    <!-- Page Container -->
    <q-page-container>
      <!-- Router View -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import AppFooter from 'components/app/AppFooter.vue';
import MessageDialog from 'components/common/MessageDialog.vue';
import { useMessageDialog } from 'src/scripts/utilities/common';

// Get message dialog options
const { messageDialogOptions } = useMessageDialog();
</script>
