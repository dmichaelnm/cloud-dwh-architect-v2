<template>
  <!-- Button -->
  <q-btn
    :icon="icon"
    :size="iconSize"
    :href="href"
    :target="target"
    :color="colorAttr"
    round
    flat
    @click="emit('click')"
  >
    <!-- Tooltip -->
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed } from 'vue';

// Defines the properties of this component
const props = defineProps<{
  /** The icon of the button. */
  icon: string;
  /** The size of the icon */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** An optional tooltip */
  tooltip?: string;
  /** An optional external link URL */
  href?: string;
  /** The target of the external link */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** The color of the button */
  color?: string;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Click event */
  (event: 'click'): void;
}>();

// Computed property for determining the icon size with a default value of 'sm'
// if not provided in the props.
const iconSize = computed(() => (props.size ? props.size : 'sm'));

// Returns the color attribute based on the provided props or defaults to 'primary'.
const colorAttr = computed(() => (props.color ? props.color : 'primary'));
</script>
