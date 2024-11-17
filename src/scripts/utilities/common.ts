import { EventBus, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useSessionStore } from 'stores/session-store';
import { inject, Ref, ref } from 'vue';
import { getLanguageOptions } from 'src/scripts/utilities/options';

export type TDialogButton = {
  /** The value of the dialog button. */
  value: string;
  /** The label key for the dialog button. */
  label: string;
};

/**
 * Represents the options for a message dialog.
 */
export type TMessageDialogOptions = {
  /** The visibility of the dialog */
  visibility: boolean;
  /** The title of the message dialog. */
  title: string;
  /** The generated message of the message dialog. */
  message: string;
  /** A detailed message */
  detail: string | null | undefined;
  /** The color marker used for the message dialog. */
  color: string;
  /** Array of buttons to be shown. */
  buttons: TDialogButton[];
  /** A result handler function */
  result:
    | ((value: string) => boolean | void | Promise<boolean | void>)
    | null
    | undefined;
};

/**
 * Represents a function type for displaying a message dialog.
 *
 * @param {string} title - The title of the dialog.
 * @param {string} message - The main message to be displayed in the dialog.
 * @param {string|null|undefined} [detail] - Additional details or information to be shown, if any.
 * @param {string} [color] - An optional color to be applied to the dialog.
 * @param {TDialogButton[]} [buttons] - An optional array of buttons to be displayed in the dialog.
 * @param {((value: string) => boolean | void | Promise<boolean | void>) | null | undefined} [result] - An optional callback function to handle the result of the dialog.
 */
export type TFuncShowMessageDialog = (
  title: string,
  message: string,
  detail?: string | null | undefined,
  color?: string,
  buttons?: TDialogButton[],
  result?:
    | ((value: string) => boolean | void | Promise<boolean | void>)
    | null
    | undefined
) => void;

/**
 * Represents a selectable option in a UI dropdown or select component.
 *
 * @property {string|number} value - The value of the option.
 * @property {string} label - The label (or label key) of the option.
 * @property {string} [icon] - An optional icon.
 */
export type TSelectOption = {
  /** The value of the option */
  value: string | number;
  /** The label (or label key) of the option */
  label: string;
  /** An optional icon */
  icon?: string;
};

// Message dialog options.
const messageDialogOptions = ref<TMessageDialogOptions>({
  visibility: false,
  title: '',
  message: '',
  detail: null,
  color: 'primary',
  buttons: [{ value: 'close', label: 'label.close' }],
  result: null,
});

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

export function useRunTask(): (
  fTask: () => Promise<void>,
  fError?: (error: unknown) => boolean
) => Promise<boolean> {
  // Get composable components
  const comp = useComposables();
  // Get show message dialog
  const { showMessageDialog } = useMessageDialog();
  // Return the run task composable function
  return (fTask, fError) =>
    new Promise((resolve) => {
      // Lock the screen
      comp.quasar.loading.show();
      // Run the task function
      fTask()
        .then(() => {
          // Resolve successfully
          resolve(true);
        })
        .catch((error) => {
          // If error function is specified, call it
          const errorProcessed = fError ? fError(error) : false;
          if (!errorProcessed) {
            // Log the error
            console.error(error);
            // Error was not processed, show unexpected error dialog
            const errorMessage = error.message
              ? error.message
              : error.toString();
            // Show message dialog
            showMessageDialog(
              comp.i18n.t('error.unexpected.title'),
              comp.i18n.t('error.unexpected.message'),
              errorMessage,
              'negative'
            );
          }
          // Resolve failed
          resolve(false);
        })
        .finally(() => {
          // Unlock the screen
          comp.quasar.loading.hide();
        });
    });
}

export function useMessageDialog(): {
  messageDialogOptions: Ref<TMessageDialogOptions>;
  showMessageDialog: TFuncShowMessageDialog;
} {
  return {
    messageDialogOptions: messageDialogOptions,
    showMessageDialog: (title, message, detail, color, buttons, result) => {
      messageDialogOptions.value.title = title;
      messageDialogOptions.value.message = message;
      messageDialogOptions.value.detail = detail;
      messageDialogOptions.value.color = color ? color : 'primary';
      messageDialogOptions.value.buttons = buttons
        ? buttons
        : [{ value: 'close', label: 'label.close' }];
      messageDialogOptions.value.result = result;
      messageDialogOptions.value.visibility = true;
    },
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

/**
 * Retrieves the default language setting based on the browser's language.
 *
 * @return {TSelectOption} The language option that matches the browser's language,
 *                        or the first available option if no match is found.
 */
export function getDefaultLanguage(): TSelectOption {
  let option = getLanguageOptions().find(
    (option) => option.value === navigator.language
  );
  if (!option) {
    option = getLanguageOptions()[0];
  }
  return option;
}