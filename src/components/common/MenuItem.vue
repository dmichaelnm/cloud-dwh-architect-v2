<template>
  <!-- Menu Item -->
  <q-item
    :clickable="!readOnly"
    v-close-popup="!noAutoClose"
    dense
    @click="emit('click')"
  >
    <!-- Icon Section -->
    <q-item-section side v-if="!hideIcon">
      <!-- Icon -->
      <q-icon :name="icon ? icon : ''" size="xs" />
    </q-item-section>
    <!-- Label Section -->
    <q-item-section>
      <!-- Label -->
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <!-- Default slot -->
    <slot />
  </q-item>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
// Defines the properties of this component
defineProps<{
  /** The label of the menu item */
  label: string;
  /** An optional icon */
  icon?: string;
  /** Read Only flag */
  readOnly?: boolean;
  /** Flag for auto closing the menu item */
  noAutoClose?: boolean;
  /** Flag for hiding the icon section */
  hideIcon?: boolean;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Menu item selected event */
  (event: 'click'): void;
}>();
</script>
