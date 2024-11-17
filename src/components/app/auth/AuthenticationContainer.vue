<template>
  <!-- Page -->
  <q-page class="flex flex-center">
    <!-- Container DIV -->
    <div class="container auth-container">
      <!-- Header Row -->
      <div class="row auth-row">
        <!-- Header Column -->
        <div class="col container-caption application-title">
          <!-- Application Title -->
          {{ $t('application.title') }}
        </div>
      </div>
      <!-- Message Row -->
      <div class="row auth-row" style="height: 130px">
        <!-- Message Column -->
        <div class="col">
          <!-- Message -->
          {{ message }}
        </div>
      </div>
      <!-- Option Row -->
      <div class="row auth-row items-center">
        <!-- Dark Mode Option Column -->
        <div class="col-7">
          <!-- Dark Mode Button -->
          <button-icon icon="dark_mode" @click="onSwitchDarkMode" />
        </div>
        <!-- Language Selection Column -->
        <div class="col-5">
          <!-- Language Selection -->
          <select-value
            v-model="language"
            :options="getLanguageOptions()"
            borderless
            translate
            @update:modelValue="onSwitchLanguage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.auth-container {
  width: 500px;
}

.auth-row {
  padding: 8px;
}

.application-title {
  text-align: center;
  font-size: 14pt;
}
</style>

<script setup lang="ts">
import ButtonIcon from 'components/common/ButtonIcon.vue';
import {
  getDefaultLanguage,
  useComposables,
} from 'src/scripts/utilities/common';
import SelectValue from 'components/common/SelectValue.vue';
import { getLanguageOptions } from 'src/scripts/utilities/options';
import { onBeforeMount, ref } from 'vue';

const comp = useComposables();
const language = ref('');

// Define the properties for the AuthenticationContainer component
defineProps<{
  /** The message of the authentication container */
  message: string;
}>();

onBeforeMount(() => {
  // Set dark mode from cookie
  comp.quasar.dark.set(comp.quasar.cookies.get('dark-mode') === 'true');
  // Get language from cookie
  language.value = comp.quasar.cookies.get('language');
  if (!language.value) {
    // Get default language, if cookie is not set
    language.value = getDefaultLanguage().value as string;
  }
  // Set the language of the application
  comp.i18n.locale.value = language.value;
});

/**
 * Toggles the dark mode setting for the application and updates the corresponding cookie.
 */
function onSwitchDarkMode(): void {
  // Switch the dark mode
  comp.quasar.dark.toggle();
  // Set dark mode cookie
  comp.quasar.cookies.set('dark-mode', comp.quasar.dark.isActive.toString());
}

/**
 * Switches the application language to the selected language and updates the language cookie accordingly.
 */
function onSwitchLanguage(): void {
  // Switch the application language
  comp.i18n.locale.value = language.value;
  // Set language cookie
  comp.quasar.cookies.set('language', language.value);
}
</script>
