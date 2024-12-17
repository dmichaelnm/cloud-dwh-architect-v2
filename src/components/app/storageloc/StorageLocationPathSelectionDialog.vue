<template>
  <!-- Basic Dialog -->
  <basic-dialog
    :model-value="_modelValue"
    :title="$t('storageLoc.dialog.pathSelection.title')"
    :message="$t('storageLoc.dialog.pathSelection.message')"
    :handler="onSubmit"
    @before-show="initDialog"
    @update:model-value="(value) => (_modelValue = value)"
  >
    <!-- Main DIV -->
    <div>
      <!-- Path Row -->
      <div v-for="p in pathOptions" :key="p" class="row">
        <!-- Path Column -->
        <div class="col">
          <!-- Path Radio Button -->
          <q-radio
            v-model="path"
            :val="p"
            :label="p.length > 0 ? p : $t('label.rootFolder')"
            size="xs"
          />
        </div>
      </div>
    </div>
  </basic-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import BasicDialog from 'components/common/BasicDialog.vue';
import { computed, ref } from 'vue';

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: boolean;
  /** Possible paths */
  paths: string[];
  /** Selected path */
  selected?: string;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: boolean): void;
  /** Path selection event */
  (event: 'pathSelected', value: string): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

// The selected path
const path = ref('');

// Returns the array with the available paths
const pathOptions = computed(() => {
  // Path array (with root directory)
  const pathArray: string[] = ['/'];
  // Add specified path entries
  pathArray.push(...props.paths.map(path => `/${path}`));
  // Return the path array
  return pathArray;
});

/**
 * Initializes the dialog by setting the `path` value based on the provided `props`.
 * It assigns the `path` value to `props.selected` if present, otherwise uses the first
 * value in the `props.paths` array. If neither is available, it defaults to an empty string.
 */
function initDialog(): void {
  if (props.selected) {
    path.value = props.selected;
  } else if (props.paths.length > 0) {
    path.value = props.paths[0];
  } else {
    path.value = '';
  }
}

/**
 * Executes the submission process by emitting the 'pathSelected' event with
 * the current value of the path and closing the dialog.
 *
 * @return {boolean} Returns true to indicate the submission process was successful.
 */
function onSubmit(): boolean {
  // Emit the event
  emit('pathSelected', path.value);
  // Close dialog
  return true;
}
</script>
