<template>
  <!-- Account Menu DIV -->
  <div>
    <!-- Account Menu Row -->
    <div class="row">
      <!-- Account Menu Button Column -->
      <div class="col-auto">
        <!-- Account Menu Button -->
        <button-icon icon="settings">
          <!-- Menu -->
          <q-menu style="width: 200px">
            <!-- Dark Mode Switch Item -->
            <menu-item
              :label="$t(darkModeLabel)"
              :icon="darkModeIcon"
              @click="onSwitchDarkMode"
            />
            <!-- Language Selection Item -->
            <menu-item
              :label="$t(languageOption.label)"
              :icon="languageOption.icon"
              no-auto-close
            >
              <!-- Language Menu -->
              <q-menu anchor="top left" self="top right" style="width: 200px">
                <!-- Language Options -->
                <menu-item
                  v-for="l in getLanguageOptions()"
                  :key="l.value"
                  :label="$t(l.label)"
                  :icon="l.icon"
                  @click="onSwitchLanguage(l.value as string)"
                />
              </q-menu>
            </menu-item>
            <!-- Separator -->
            <q-separator />
            <!-- Logout Item -->
            <menu-item
              :label="$t('auth.label.logout')"
              icon="logout"
              @click="logoutAccount"
            />
          </q-menu>
        </button-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ButtonIcon from 'components/common/ButtonIcon.vue';
import MenuItem from 'components/common/MenuItem.vue';
import { computed } from 'vue';
import { TSelectOption, useComposables } from 'src/scripts/utilities/common';
import { logout } from 'src/scripts/application/Account';
import { updateDocument } from 'src/scripts/application/FirestoreDocument';
import { getLanguageOptions } from 'src/scripts/utilities/options';

// Get composable components
const comp = useComposables();

// Computed property that dynamically changes the dark mode label based on the current theme state.
const darkModeLabel = computed(() =>
  comp.quasar.dark.isActive ? 'label.lightMode' : 'label.darkMode'
);
// Computed property that dynamically changes the dark mode icon based on the current theme state.
const darkModeIcon = computed(() =>
  comp.quasar.dark.isActive ? 'light_mode' : 'dark_mode'
);
const languageOption = computed(
  () =>
    getLanguageOptions().find(
      (option) => option.value === comp.i18n.locale.value
    ) as TSelectOption
);

/**
 * Toggles the dark mode setting for the application.
 *
 * This method switches the application's theme between light and dark modes.
 * It also sets a cookie to persist the user's preference and updates
 * the user's account preferences if the user is logged in.
 */
function onSwitchDarkMode(): void {
  // Set dark mode
  comp.quasar.dark.toggle();
  // Set dark mode cookie
  comp.quasar.cookies.set('darkmode', comp.quasar.dark.isActive.toString());
  // Update account preference
  if (comp.session.account) {
    comp.session.account.data.preference.darkMode = comp.quasar.dark.isActive;
    updateDocument(comp.session.account);
  }
}

/**
 * Switches the application's language based on the provided language code.
 *
 * @param {string} language - The language code to switch to (e.g., 'en', 'es').
 */
function onSwitchLanguage(language: string): void {
  // Set application language
  comp.i18n.locale.value = language;
  // Set language cookie
  comp.quasar.cookies.set('language', language);
  // Update account preference
  if (comp.session.account) {
    comp.session.account.data.preference.language = language;
    updateDocument(comp.session.account);
  }
}

/**
 * Asynchronously logs out the current user account and resets the session.
 */
async function logoutAccount(): Promise<void> {
  // Logout current account
  await logout();
  // Reset the user session
  comp.session.resetSession();
}
</script>
