<template>
  <!-- Dialog -->
  <q-dialog
    ref="basicDialog"
    :model-value="_modelValue"
    persistent
    @update:modelValue="(value) => (_modelValue = value)"
  >
    <!-- Dialog DIV -->
    <div
      :style="{ width: (props.width ? props.width : '600') + 'px' }"
      class="dialog-frame"
    >
      <!-- Dialog Header Row -->
      <div class="row dialog-row" v-if="title">
        <!-- Dialog Header Column -->
        <div class="col dialog-title">
          <!-- Dialog Title -->
          {{ title }}
        </div>
      </div>
      <!-- Dialog Message Row -->
      <div class="row dialog-row" v-if="message">
        <!-- Dialog Message Column -->
        <div class="col">
          <!-- Dialog Message -->
          {{ message }}
        </div>
      </div>
      <!-- Form -->
      <q-form @submit="onSubmit">
        <!-- Content Row -->
        <div class="row dialog-row">
          <!-- Content Column -->
          <div class="col">
            <!-- Content Slot -->
            <slot />
          </div>
        </div>
        <!-- Button Row -->
        <div class="row dialog-row">
          <!-- Button Column -->
          <div class="col text-right q-gutter-x-sm">
            <!-- Okay Button -->
            <button-push :label="$t('label.okay')" look="link" type="submit" />
            <!-- Cancel Button -->
            <button-push
              :label="$t('label.cancel')"
              look="link"
              @click="closeDialog"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QDialog } from 'quasar';
import ButtonPush from 'components/common/ButtonPush.vue';
import { useRunTask } from 'src/scripts/utilities/common';

// Get run task composable function
const runTask = useRunTask();

// Dialog reference
const basicDialog = ref<QDialog | null>(null);

// Defines the properties of this component
const props = defineProps<{
  /** The model value */
  modelValue: boolean;
  /** The width of the dialog */
  width?: number;
  /** The title of the dialog */
  title?: string;
  /** An optional message of the dialog */
  message?: string;
  /** Close handler */
  handler?: () => Promise<boolean>;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: boolean): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * Handles the submit action for the dialog. If a handler function is provided
 * through the component's props, it will execute the handler asynchronously
 * and close the dialog if the handler returns a result. In the absence of a
 * handler function, it simply closes the dialog.
 */
function onSubmit(): void {
  // Start handler task
  runTask(async () => {
    // Run handler, if specified
    const result = props.handler ? await props.handler() : true;
    if (result) {
      // Close the dialog
      closeDialog();
    }
  });
}

/**
 * Closes the currently open dialog if it is visible.
 */
function closeDialog(): void {
  // Close the dialog
  basicDialog.value?.hide();
}
</script>
