<template>
  <!-- Clickable Item -->
  <q-item
    v-if="routeToPage || disable"
    :clickable="!disable"
    @click="routeTo(routeToPage as string)"
  >
    <!-- Icon Section -->
    <q-item-section avatar>
      <!-- Icon -->
      <q-icon :class="disable ? 'label-disabled' : ''" :name="icon" />
    </q-item-section>
    <!-- Label Section -->
    <q-item-section>
      <!-- Item Label -->
      <q-item-label :class="disable ? 'label-disabled' : ''">{{
        label
      }}</q-item-label>
    </q-item-section>
  </q-item>
  <!-- Expansion Item -->
  <q-expansion-item
    v-if="!routeToPage && !disable"
    :label="label"
    :icon="icon"
  ></q-expansion-item>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.label-disabled {
  color: $text-hint-light;
}

.body--dark .label-disabled {
  color: $text-hint-dark;
}
</style>

<script setup lang="ts">
import { useRouting } from 'src/scripts/utilities/common';

// Get routing composable functions
const { routeTo } = useRouting();

// Defines the properties of this component
defineProps<{
  /** Label of the drawer item */
  label: string;
  /** Icon of the drawer item */
  icon: string;
  /** Route to path, if not set, the item is expandable */
  routeToPage?: string;
  /** Flag for disabling the item */
  disable?: boolean;
}>();
</script>
