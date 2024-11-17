<template>
  <!-- Dialog -->
  <q-dialog
    ref="messageDialog"
    :model-value="_modelValue"
    persistent
    @update:modelValue="(value) => (_modelValue = value)"
  >
    <!-- Message Dialog Frame -->
    <div class="dialog-frame" style="width: 600px">
      <!-- Title Row -->
      <div class="row dialog-row">
        <!-- Title Column -->
        <div class="col dialog-title">
          <!-- Title -->
          {{ options.title }}
        </div>
      </div>
      <!-- Marker Row -->
      <div
        class="row dialog-marker"
        :style="{ backgroundColor: options.color }"
      />
      <!-- Message Row -->
      <div class="row dialog-row">
        <!-- Message Column -->
        <div class="col">
          <!-- Message Text -->
          {{ options.message }}
        </div>
      </div>
      <!-- Detail Row -->
      <div class="row dialog-row" v-if="options.detail">
        <!-- Detail Column -->
        <div class="col">
          <q-expansion-item :label="$t('label.detail')" dense dense-toggle>
            <!-- Detail Text -->
            {{ options.detail }}
          </q-expansion-item>
        </div>
      </div>
      <!-- Button Row -->
      <div class="row dialog-row">
        <!-- Button Column -->
        <div class="col text-right q-gutter-x-sm">
          <!-- Dialog buttons -->
          <button-push
            v-for="btn in options.buttons"
            :key="btn.value"
            :label="$t(btn.label)"
            look="link"
            @click="onButtonClick(btn.value)"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.dialog-marker {
  height: 2px;
  margin: 0 8px;
}
</style>

<script setup lang="ts">
import { TMessageDialogOptions } from 'src/scripts/utilities/common';
import { computed, ref } from 'vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import { QDialog } from 'quasar';

// Dialog reference
const messageDialog = ref<QDialog | null>(null);

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: boolean;
  /** Message dialog options */
  options: TMessageDialogOptions;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: boolean): void;
  /** Dialog closing event */
  (event: 'close', value: string): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * Handles the button click event by invoking a result handler function if specified,
 * and conditionally hides a message dialog based on the handler's result.
 *
 * @param {string} value - The input value to be processed by the result handler function.
 */
function onButtonClick(value: string): void {
  // Call result handler, if specified
  const result = props.options.result ? props.options.result(value) : true;
  if (typeof result !== 'boolean' || result) {
    // Close dialog
    messageDialog.value?.hide();
    // Emit close event
    emit('close', value);
  }
}
</script>
