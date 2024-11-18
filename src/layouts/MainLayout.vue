<template>
  <q-layout view="hHh Lpr fFf"></q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';
import { onAccountStateChanged } from 'src/scripts/application/Account';

// Get composable components
const comp = useComposables();

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Lock the screen
  comp.quasar.loading.show();
  onAccountStateChanged(async (account) => {
    // Check for authorized account
    if (account === null) {
      // Unlock the screen
      comp.quasar.loading.hide();
      // No authorized account, redirect to login page
      await comp.router.push({ path: '/auth/login' });
    } else {
      // Store account on session
      comp.session.account = account;
      // Unlock the screen
      comp.quasar.loading.hide();
    }
  });
});
</script>
