<template>
  <!-- Layout -->
  <q-layout view="hHh Lpr fFf">
    <!-- Header -->
    <q-header>
      <!-- Header DIV -->
      <div class="header-bar">
        <!-- Header Row -->
        <div class="row items-center">
          <!-- Application Title Column -->
          <div class="col-auto">
            <!-- Application Title -->
            <div class="header-title">{{ $t('application.title') }}</div>
            <div class="account-name">
              {{
                comp.session.account
                  ? comp.session.account.data.common.name
                  : ''
              }}
            </div>
          </div>
          <!-- Project Menu Column -->
          <div class="col-auto project-menu">
            <!-- Project Menu -->
            <project-menu />
          </div>
          <!-- Space -->
          <div class="col-grow" />
          <!-- Account Menu Column -->
          <div class="col-auto">
            <!-- Account Menu -->
            <account-menu />
          </div>
        </div>
      </div>
    </q-header>

    <!-- Footer -->
    <q-footer>
      <!-- Application Footer -->
      <app-footer />
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.header-bar {
  background-color: $background-container-light;
  color: $text-caption-light;
  padding: 8px 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.body--dark .header-bar {
  background-color: $background-container-dark;
  color: $text-caption-dark;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}

.header-title {
  font-size: 14pt;
  font-variant: small-caps;
}

.project-menu {
  padding: 0 48px;
}

.account-name {
  font-weight: normal;
  font-size: 9pt;
}
</style>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';
import { onAccountStateChanged } from 'src/scripts/application/Account';
import AppFooter from 'components/app/AppFooter.vue';
import AccountMenu from 'components/app/main/AccountMenu.vue';
import ProjectMenu from 'components/app/main/ProjectMenu.vue';

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
      // Set dark mode from account preference
      comp.quasar.dark.set(account.data.preference.darkMode);
      // Set language from account preference
      comp.i18n.locale.value = account.data.preference.language;
      // Unlock the screen
      comp.quasar.loading.hide();
    }
  });
});
</script>
