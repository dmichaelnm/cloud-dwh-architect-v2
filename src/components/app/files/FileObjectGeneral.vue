<template>
  <!-- Message Component -->
  <message-component :message="$t('file.editor.message.general')">
    <!-- Main DIV -->
    <div class="q-col-gutter-y-sm">
      <!-- Storage Location Selection Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Storage Location Selection Column -->
        <div class="col-6">
          <!-- Storage Location Selection -->
          <select-value
            v-model="_modelValue.storageLocation"
            :label="$t('file.label.storageLocation')"
            :options="storageLocations"
          />
        </div>
      </div>
      <!-- Path and Type Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Path Column -->
        <div class="col-6">
          <!-- Path -->
          <input-value
            v-model="_modelValue.path"
            :label="$t('file.label.path')"
            button-icon="search"
            mandatory
            @button-click="openFileSelectionDialog"
          />
        </div>
        <!-- Type Selection Column -->
        <div class="col-3">
          <!-- Type Selection -->
          <select-value
            v-model="_modelValue.type"
            :options="getFileTypes()"
            :label="$t('file.label.type')"
            translate
            hide-icon
          />
        </div>
      </div>
    </div>
  </message-component>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import MessageComponent from 'components/common/MessageComponent.vue';
import { computed } from 'vue';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import InputValue from 'components/common/InputValue.vue';
import SelectValue from 'components/common/SelectValue.vue';
import { getFileTypes } from 'src/scripts/utilities/options';
import {
  TSelectOption,
  useComposables,
  useRunTask,
} from 'src/scripts/utilities/common';
import { Project } from 'src/scripts/application/Project';
import { post } from 'src/scripts/utilities/functions';

// Get composable components
const comp = useComposables();
// Get run task composable function
const runTask = useRunTask();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorFileObjectData;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorFileObjectData): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorFileObjectData) => emit('update:modelValue', value),
});

// Array of storage locations for the selection
const storageLocations = computed(() => {
  // Options array
  const options: TSelectOption[] = [];
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get storage locations
    const storageLocs = project.getStorageLocations();
    // Iterate over storage location and add options
    storageLocs.forEach((storageLoc) => {
      // Get external application
      const externalApp = project.getExternalApplication(
        storageLoc.data.externalApp
      );
      if (externalApp) {
        // Add option
        options.push({
          value: storageLoc.id,
          label: storageLoc.data.common.name,
          icon: `img:icons/${externalApp.data.provider}.png`,
        });
      }
    });
  }
  // Return options array
  return options;
});

function openFileSelectionDialog(): void {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get storage location
    const storageLoc = project.getStorageLocation(
      _modelValue.value.storageLocation
    );
    if (storageLoc) {
      // Get external application
      const externalApp = project.getExternalApplication(
        storageLoc.data.externalApp
      );
      if (externalApp) {
        // Retrieve files
        runTask(async () => {
          const result = await post('getFiles', {
            provider: externalApp.data.provider,
            credentials: externalApp.data.credentials,
            path: storageLoc.data.path,
          });
          console.debug(result);
        });
      }
    }
  }
}
</script>
