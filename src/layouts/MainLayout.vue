<template>
  <!-- Layout -->
  <q-layout view="hHh Lpr fFf">
    <!-- Message Dialog -->
    <message-dialog
      v-model="messageDialogOptions.visibility"
      :options="messageDialogOptions"
    />

    <!-- Header -->
    <q-header>
      <!-- Header DIV -->
      <div class="header-bar">
        <!-- Header Row -->
        <div class="row items-center">
          <!-- Left Drawer Button Column -->
          <div class="col-auto left-drawer-button">
            <!-- Left Drawer Button -->
            <button-icon
              :icon="leftDrawerIcon"
              @click="leftDrawer = !leftDrawer"
              size="md"
            />
          </div>
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
              /
              {{
                project ? $t(`enumeration.memberRole.${project.getRole()}`) : ''
              }}
            </div>
          </div>
          <!-- Project Menu Column -->
          <div class="col-auto project-menu">
            <!-- Project Menu -->
            <project-menu @select="switchProject" />
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

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawer" show-if-above :width="300" bordered>
      <!-- Drawer DIV -->
      <div class="left-drawer-list">
        <!-- List of drawer items -->
        <q-list>
          <!-- Management -->
          <drawer-label :label="$t('label.management')" />
          <!-- External Applications -->
          <drawer-item
            :label="$t('externalApp.label.drawerItem')"
            :disable="project === null"
            icon="apps"
            route-to-page="/externalApp/overview"
          />
        </q-list>
      </div>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <!-- Router View -->
      <router-view />
    </q-page-container>
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

.left-drawer {
  background-color: transparent;
}

.left-drawer-button {
  padding: 0 16px 0 0;
}

.left-drawer-list {
  padding: 32px 0;
}
</style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import AppFooter from 'components/app/AppFooter.vue';
import AccountMenu from 'components/app/main/AccountMenu.vue';
import ProjectMenu from 'components/app/project/ProjectMenu.vue';
import MessageDialog from 'components/common/MessageDialog.vue';
import ButtonIcon from 'components/common/ButtonIcon.vue';
import DrawerItem from 'components/app/main/DrawerItem.vue';
import DrawerLabel from 'components/app/main/DrawerLabel.vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { onAccountStateChanged } from 'src/scripts/application/Account';
import { loadProjects } from 'src/scripts/application/Project';
import { updateDocument } from 'src/scripts/application/FirestoreDocument';

// Get composable components
const comp = cm.useComposables();
// Get message dialog options
const { messageDialogOptions } = cm.useMessageDialog();
// Get run task composable function
const runTask = cm.useRunTask();

// Left drawer state
const leftDrawer = ref(false);

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
      // Load projects and sort the array
      comp.session.projects = await loadProjects();
      comp.session.sortProjects();
      // Set active project
      await switchProject();
      // Unlock the screen
      comp.quasar.loading.hide();
    }
  });
});

// Drawer Icon Name
const leftDrawerIcon = computed(() =>
  leftDrawer.value ? 'chevron_left' : 'chevron_right'
);

// Reference to the current project
const project = computed(() => comp.session.project);

// Watch the current project for being removed
watch(project, (newValue, oldValue) => {
  if (newValue === null && oldValue !== null) {
    // Reset account project
    if (comp.session.account) {
      comp.session.account.data.state.currentProject = null;
      // Switch project
      switchProject();
    }
  }
});

/**
 * Switches the current project based on the account's state and available projects.
 * If the current project is different from the one listed in the account's state, it updates the session accordingly.
 * It ensures the project's validity and updates relevant account information.
 * If no valid project is found, it sets the session's project to null.
 */
async function switchProject(): Promise<void> {
  // Start switch process
  await runTask(async () => {
    // Get current project ID from account
    const projectId = comp.session.account
      ? comp.session.account?.data.state.currentProject
      : null;
    // Do nothing, if project is already active
    if (projectId !== comp.session.project?.id) {
      // Check, if project ID is in projects array
      const project = comp.session.getProject(projectId);
      // If project was found, current ID on account is valid
      if (project) {
        // Set current project
        comp.session.project = project;
        // TODO load project details
      } else if (comp.session.projects.length > 0) {
        // Set the first project in the list as active
        comp.session.project = comp.session.projects[0];
        // TODO load project details
      } else {
        // No project found
        comp.session.project = null;
      }
      // Update account
      if (comp.session.account) {
        comp.session.account.data.state.currentProject = comp.session.project
          ? comp.session.project.id
          : null;
        await updateDocument(comp.session.account);
      }
    }
  });
}
</script>
