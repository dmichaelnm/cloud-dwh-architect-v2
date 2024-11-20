<template>
  <!-- Component DIV -->
  <div class="q-col-gutter-y-sm">
    <!-- Message Row -->
    <div class="row" v-if="message">
      <!-- Message Column -->
      <div class="col-8">
        <!-- Message -->
        {{ message }}
      </div>
    </div>
    <!-- Component Row -->
    <div class="row">
      <!-- Component Column -->
      <div class="col">
        <!-- Component Slot -->
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
// Defines the properties of this component
defineProps<{
  /** The message of the component */
  message?: string;
}>();
</script>
