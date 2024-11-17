<template>
  <!-- Authentication Container -->
  <authentication-container :message="$t('auth.message.login')">
  </authentication-container>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import AuthenticationContainer from 'components/app/auth/AuthenticationContainer.vue';
</script>
