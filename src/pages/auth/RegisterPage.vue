<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.register')">
    <!-- Form -->
    <q-form @submit="onSubmit">
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
              type="password"
              auto-complete="new-password"
              mandatory
            />
          </div>
        </div>
        <!-- Register Button Row -->
        <div class="row">
          <!-- Register Button Column -->
          <div class="col text-center">
            <!-- Login Button -->
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
import { ref } from 'vue';
import InputValue from 'components/common/InputValue.vue';
import ButtonPush from 'components/common/ButtonPush.vue';

// First Name
const firstName = ref('');
// Last Name
const lastName = ref('');
// Email Address
const email = ref('');
// Password
const password = ref('');
// Password Repeat
const passwordRepeat = ref('');

function onSubmit(): void {}
</script>
