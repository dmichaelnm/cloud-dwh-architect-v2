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
          <!-- Space -->
          <div class="col-grow" />
          <!-- Account Menu Column -->
          <div class="col-auto">
            <!-- Account Menu -->
            <account-menu @logout="logoutAccount" />
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
  background-color: $primary;
  color: $text-caption-dark;
  padding: 8px 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.body--dark .header-bar {
  color: $text-caption-light;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}

.header-title {
  font-size: 14pt;
  font-variant: small-caps;
}

.account-name {
  font-weight: normal;
  font-size: 9pt;
}
</style>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';
import { logout, onAccountStateChanged } from 'src/scripts/application/Account';
import AppFooter from 'components/app/AppFooter.vue';
import AccountMenu from 'components/app/main/AccountMenu.vue';

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

async function logoutAccount(): Promise<void> {
  // Logout current account
  await logout();
}
</script>
