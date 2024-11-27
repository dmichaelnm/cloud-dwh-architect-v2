<template>
  <!-- Item -->
  <q-item dense>
    <!-- Label Section -->
    <q-item-section>
      <!-- Label -->
      <q-item-label class="drawer-label">{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.drawer-label {
  color: $text-caption-light;
  font-weight: bold;
}

.body--dark .drawer-label {
  color: $text-caption-dark;
}

</style>

<script setup lang="ts">
// Defines the properties of this component
defineProps<{
  /** Label of the drawer item */
  label: string;
}>();
</script>
