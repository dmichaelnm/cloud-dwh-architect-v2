<template>
  <!-- Menu Item -->
  <q-item
    :clickable="!readOnly"
    v-close-popup="closePopup"
    dense
    @click="emit('click')"
  >
    <!-- Icon Section -->
    <q-item-section side v-if="showIconSection">
      <!-- Icon -->
      <q-icon :name="icon ? icon : ''" size="xs" />
    </q-item-section>
    <!-- Label Section -->
    <q-item-section>
      <!-- Label -->
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed } from 'vue';

// Defines the properties of this component
const props = defineProps<{
  /** The label of the menu item */
  label: string;
  /** An optional icon */
  icon?: string;
  /** Read Only flag */
  readOnly?: boolean;
  /** Flag for auto closing the menu item */
  autoClose?: boolean;
  /** Flag for hiding the icon section */
  hideIcon?: boolean;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Menu item selected event */
  (event: 'click'): void;
}>();

// Computes whether the popup should be closed automatically based on the autoClose prop, defaulting to true.
const closePopup = computed(() => (props.autoClose ? props.autoClose : true));
// Computed property to determine if the icon section should be visible based on the hideIcon property.
const showIconSection = computed(() =>
  props.hideIcon ? !props.hideIcon : true
);
</script>
