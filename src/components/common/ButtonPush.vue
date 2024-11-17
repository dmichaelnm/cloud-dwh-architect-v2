<template>
  <!-- Button -->
  <q-btn
    :label="label"
    :type="type"
    :flat="lookAttr === 'link'"
    :class="`button-look-${lookAttr}`"
    :to="routeTo"
    dense
    no-caps
    @click="emit('click')"
  />
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.q-btn {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
  font-size: 10pt;
}

.button-look-push {
  background-color: $button-background-light;
  color: $button-text-light;
}

.body--dark .button-look-push {
  background-color: $button-background-dark;
  color: $button-text-dark;
}

.button-look-link {
  background-color: transparent;
  color: $button-background-light;
  font-weight: normal;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

// Defines the properties of this component
const props = defineProps<{
  /** The label of the button */
  label: string;
  /** The type of the button */
  type?: 'button' | 'submit' | 'reset';
  /** The look of the button */
  look?: 'push' | 'link';
  /** Routing path */
  routeTo?: string;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Click event */
  (event: 'click'): void;
}>();

// Computes the button look based on the 'look' prop, defaulting to 'push' if not provided.
const lookAttr = computed(() => (props.look ? props.look : 'push'));
</script>
