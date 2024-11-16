<template>
  <!-- Button -->
  <q-btn
    :icon="icon"
    :size="iconSize"
    :href="href"
    :target="target"
    class="button-icon-background"
    round
    flat
  >
    <!-- Tooltip -->
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.button-icon-background:hover {
  background-color: $light-background-hover;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

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
}>();

// Computed property for determining the icon size with a default value of 'sm'
// if not provided in the props.
const iconSize = computed(() => (props.size ? props.size : 'sm'));
</script>
