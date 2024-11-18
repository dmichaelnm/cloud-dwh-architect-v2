<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.reset')">
    <!-- Form -->
    <q-form ref="resetForm" @submit="onSubmit">
      <!-- Form DIV -->
      <div class="q-col-gutter-y-sm">
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
              auto-focus
              mandatory
            />
          </div>
        </div>
        <!-- Reset Password Button Row -->
        <div class="row">
          <!-- Reset Password Button Column -->
          <div class="col text-center">
            <!-- Reset Password Button -->
            <button-push :label="$t('auth.label.reset')" type="submit" />
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
import { QForm } from 'quasar';
import InputValue from 'components/common/InputValue.vue';
import { onBeforeMount, ref } from 'vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import {
  useComposables,
  useMessageDialog,
  useRunTask,
} from 'src/scripts/utilities/common';
import { processFirebaseError } from 'src/scripts/utilities/auth';
import { resetPassword } from 'src/scripts/application/Account';

// Get composable components
const comp = useComposables();
// Get run task composable function
const runTask = useRunTask();
// Get message dialog composable functions
const { showSuccessDialog } = useMessageDialog();

// Form reference
const resetForm = ref<QForm | null>(null);

// Email Address
const email = ref('');
// Email Address Error Message
const emailError = ref('');

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Set email from cookie
  email.value = comp.quasar.cookies.get('email') ?? '';
});

/**
 * Handles the submission of the reset password form.
 */
function onSubmit(): void {
  // Reset validation
  resetValidation();

  // Start reset password task
  runTask(
    async () => {
      // Send the email
      await resetPassword(email.value);
      // Show success dialog
      showSuccessDialog(
        comp.i18n.t('auth.dialog.reset.title'),
        comp.i18n.t('auth.dialog.reset.message'),
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
      // Process firebase error
      return processFirebaseError(error, comp.i18n.t, emailError);
    }
  );
}

/**
 * Resets the validation state of the form and clears any error messages.
 */
function resetValidation(): void {
  // Reset form components
  resetForm.value?.resetValidation();
  // Reset error messages
  emailError.value = '';
}
</script>
