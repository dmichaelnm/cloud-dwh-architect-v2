import { EventBus, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useSessionStore } from 'stores/session-store';
import { inject } from 'vue';

/**
 * Retrieves and returns a set of commonly used composable functions and stores.
 *
 * @return An object containing the following composable instances:
 * - `quasar`: The Quasar framework instance.
 * - `i18n`: The internationalization instance.
 * - `route`: The current route instance.
 * - `router`: The Vue Router instance.
 * - `session`: The session store instance.
 * - `bus`: The event bus instance.
 */
export function useComposables() {
  return {
    quasar: useQuasar(),
    i18n: useI18n(),
    route: useRoute(),
    router: useRouter(),
    session: useSessionStore(),
    bus: inject('bus') as EventBus,
  };
}

/**
 * Capitalizes the first character of the given string.
 *
 * @param {string} str - The string to be capitalized.
 * @return {string} The string with the first character capitalized.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
