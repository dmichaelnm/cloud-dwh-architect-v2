<template>
  <!-- Component DIV -->
  <div class="q-col-gutter-y-sm">
    <!-- Message Row -->
    <div class="row" v-if="message">
      <!-- Message Column -->
      <div :class="colWidthAttr">
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
import { computed } from 'vue';

// Defines the properties of this component
const props = defineProps<{
  /** The message of the component */
  message?: string;
  /** The width of the text (in columns 1 - 12) */
  colWidth?: number;
}>();

// The attribute specifying the column width
const colWidthAttr = computed(() =>
  props.colWidth ? `col-${props.colWidth}` : 'col-9'
);
</script>
