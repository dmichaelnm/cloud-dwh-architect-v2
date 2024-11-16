<template>
  <!-- Layout -->
  <q-layout view="hHh Lpr fFf">
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
</script>
