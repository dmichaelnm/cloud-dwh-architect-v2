<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.login')">
    <!-- Form -->
    <q-form @submit="onSubmit">
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
            <button-push :label="$t('auth.label.reset')" look="link" />
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
import { useComposables } from 'src/scripts/utilities/common';

// Get composable components
const comp = useComposables();

// Email Address
const email = ref('');
// Password
const password = ref('');

onBeforeMount(() => {
  // Set email from cookie
  email.value = comp.quasar.cookies.get('email');
});

function onSubmit(): void {}
</script>
