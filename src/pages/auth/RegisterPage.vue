<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.register')">
    <!-- Form -->
    <q-form ref="registerForm" @submit="onSubmit">
      <!-- Form DIV -->
      <div class="q-col-gutter-y-sm">
        <!-- First & Last Name Row -->
        <div class="row q-col-gutter-x-sm">
          <!-- First Name Column -->
          <div class="col">
            <!-- First Name Input -->
            <input-value
              v-model="firstName"
              :label="$t('auth.label.firstName')"
              auto-focus
              mandatory
            />
          </div>
          <!-- Last Name Row -->
          <div class="col">
            <!-- Last Name Column -->
            <input-value
              v-model="lastName"
              :label="$t('auth.label.lastName')"
              mandatory
            />
          </div>
        </div>
        <!-- Email Row -->
        <div class="row">
          <!-- Email Column -->
          <div class="col">
            <!-- Email Input -->
            <input-value
              v-model="email"
              :label="$t('auth.label.email')"
              :error-message="emailError"
              auto-complete="username"
              mandatory
            />
          </div>
        </div>
        <!-- Password & Password Repeat Row -->
        <div class="row q-col-gutter-x-sm">
          <!-- Password Column -->
          <div class="col">
            <!-- Password Input -->
            <input-value
              v-model="password"
              :label="$t('auth.label.password')"
              :error-message="passwordError"
              type="password"
              auto-complete="new-password"
              mandatory
            />
          </div>
          <!-- Repeat Password Column -->
          <div class="col">
            <!-- Repeat Password Input -->
            <input-value
              v-model="passwordRepeat"
              :label="$t('auth.label.passwordRepeat')"
              :error-message="passwordRepeatError"
              type="password"
              auto-complete="new-password"
              mandatory
            />
          </div>
        </div>
        <!-- Register Button Row -->
        <div class="row" style="margin-top: 8px">
          <!-- Register Button Column -->
          <div class="col text-center">
            <!-- Register Button -->
            <button-push :label="$t('auth.label.register')" type="submit" />
          </div>
        </div>
        <!-- Back Link Row -->
        <div class="row">
          <!-- Back Link Column -->
          <div class="col text-center">
            <!-- Bank Button -->
            <button-push
              :label="$t('label.back')"
              look="link"
              route-to="/auth/login"
            />
          </div>
        </div>
      </div>
    </q-form>
  </authentication-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import AuthenticationContainer from 'components/app/auth/AuthenticationContainer.vue';
import { onBeforeMount, ref } from 'vue';
import InputValue from 'components/common/InputValue.vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import {
  useComposables,
  useMessageDialog,
  useRunTask,
} from 'src/scripts/utilities/common';
import { QForm } from 'quasar';
import { createAccount } from 'src/scripts/application/Account';
import { processFirebaseError } from 'src/scripts/utilities/firebase';

// Get composable components
const comp = useComposables();
// Get run task composable function
const runTask = useRunTask();
// Get message dialog composable function
const { showSuccessDialog } = useMessageDialog();

// Form reference
const registerForm = ref<QForm | null>(null);

// First Name
const firstName = ref('');
// Last Name
const lastName = ref('');
// Email Address
const email = ref('');
// Email Address Error Message
const emailError = ref('');
// Password
const password = ref('');
// Password Error Message
const passwordError = ref('');
// Password Repeat
const passwordRepeat = ref('');
// Password Repeat Error Message
const passwordRepeatError = ref('');

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Set email from cookie
  email.value = comp.quasar.cookies.get('email') ?? '';
});

/**
 * Handles the submission of the registration form by performing validation,
 * creating a new account, and processing any errors that occur.
 */
function onSubmit(): void {
  // Reset validation
  resetValidation();

  // Check password and repeated password for equality
  if (password.value !== passwordRepeat.value) {
    // Set error message on repeated password
    passwordRepeatError.value = comp.i18n.t('auth.error.passwordRepeatInvalid');
    return;
  }

  // Start the registration task
  runTask(
    async () => {
      // Create new account
      await createAccount(
        firstName.value,
        lastName.value,
        email.value,
        password.value,
        comp.quasar.dark.isActive,
        comp.i18n.locale.value
      );
      // Show success dialog
      showSuccessDialog(
        comp.i18n.t('auth.dialog.register.title'),
        comp.i18n.t('auth.dialog.register.message'),
        undefined,
        () => {
          // Set email cookie
          comp.quasar.cookies.set('email', email.value);
          // Route to login page
          comp.router.push({ path: '/auth/login' });
        }
      );
    },
    (error) => {
      // Process error
      return processFirebaseError(
        error,
        comp.i18n.t,
        emailError,
        passwordError
      );
    }
  );
}

/**
 * Resets the validation state of the form.
 * This includes clearing any validation error messages.
 */
function resetValidation(): void {
  // Reset the form
  registerForm.value?.resetValidation();
  // Reset error messages
  emailError.value = '';
  passwordError.value = '';
  passwordRepeatError.value = '';
}
</script>
