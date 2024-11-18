<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.login')">
    <!-- Form -->
    <q-form ref="loginForm" @submit="onSubmit">
      <!-- Form DIV -->
      <div class="q-col-gutter-y-sm">
        <!-- Email & Password Row -->
        <div class="row q-col-gutter-x-sm">
          <!-- Email Column -->
          <div class="col">
            <!-- Email Input -->
            <input-value
              v-model="email"
              :label="$t('auth.label.email')"
              :error-message="emailError"
              :auto-focus="email === ''"
              auto-complete="username"
              mandatory
            />
          </div>
          <!-- Password Column -->
          <div class="col">
            <!-- Password Input -->
            <input-value
              v-model="password"
              :label="$t('auth.label.password')"
              :auto-focus="email !== ''"
              type="password"
              auto-complete="current-password"
              mandatory
            />
          </div>
        </div>
        <!-- Login Button Row -->
        <div class="row">
          <!-- Login Button Column -->
          <div class="col text-center">
            <!-- Login Button -->
            <button-push :label="$t('auth.label.login')" type="submit" />
          </div>
        </div>
        <!-- Links Row -->
        <div class="row">
          <!-- Register Account Column -->
          <div class="col">
            <!-- Register Account Button -->
            <button-push
              :label="$t('auth.label.register')"
              look="link"
              route-to="/auth/register"
            />
          </div>
          <!-- Reset Password Column -->
          <div class="col text-right">
            <!-- Reset Password Button -->
            <button-push
              :label="$t('auth.label.reset')"
              look="link"
              route-to="/auth/reset"
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
import InputValue from 'components/common/InputValue.vue';
import { onBeforeMount, ref } from 'vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import { useComposables, useRunTask } from 'src/scripts/utilities/common';
import { QForm } from 'quasar';
import { processFirebaseError } from 'src/scripts/utilities/firebase';
import { login } from 'src/scripts/application/Account';

// Get composable components
const comp = useComposables();
// Get run task composable function
const runTask = useRunTask();

// Form reference
const loginForm = ref<QForm | null>(null);

// Email Address
const email = ref('');
// Email Address Error Message
const emailError = ref('');
// Password
const password = ref('');

// Lifecycle method that is called before this component is mounted
onBeforeMount(() => {
  // Set email from cookie
  email.value = comp.quasar.cookies.get('email');
});

/**
 * Handles the submit event by resetting validation, initiating the login process,
 * setting the email cookie, and navigating to the main layout.
 */
function onSubmit(): void {
  // Reset validation
  resetValidation();

  // Start the login process
  runTask(
    async () => {
      // Login to Firebase
      await login(email.value, password.value);
      // Set email cookie
      comp.quasar.cookies.set('email', email.value);
      // Route to main layout
      await comp.router.push({ path: '/' });
    },
    (error) => {
      // Process Firebase error
      return processFirebaseError(error, comp.i18n.t, emailError);
    }
  );
}

/**
 * Resets the validation state of the login form.
 * This method will reset any validation errors and clear any error messages.
 */
function resetValidation(): void {
  // Reset validation of the form components
  loginForm.value?.resetValidation();
  // Reset error messages
  emailError.value = '';
}
</script>
