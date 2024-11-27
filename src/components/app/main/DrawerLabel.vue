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
.drawer-label {
  font-weight: bold;
}
</style>

<script setup lang="ts">
// Defines the properties of this component
defineProps<{
  /** Label of the drawer item */
  label: string;
}>();
</script>
