<template>
  <!-- File Selection Dialog -->
  <file-object-selection-dialog
    v-model="dialogVisible"
    :files="fileNames"
    @file-selected="onFileSelected"
  />

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
            @update:modelValue="onFileTypeChanged"
          />
        </div>
      </div>
    </div>
  </message-component>
  <!-- CSV Properties -->
  <file-object-properties-c-s-v
    v-if="_modelValue.type === EFileType.CSV"
    v-model="_modelValue"
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import * as fo from 'src/scripts/application/FileObject';
import MessageComponent from 'components/common/MessageComponent.vue';
import InputValue from 'components/common/InputValue.vue';
import SelectValue from 'components/common/SelectValue.vue';
import FileObjectSelectionDialog from 'components/app/files/FileObjectSelectionDialog.vue';
import FileObjectPropertiesCSV from 'components/app/files/FileObjectPropertiesCSV.vue';
import { EFileType } from 'src/scripts/utilities/common';
import { computed, ref } from 'vue';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import { getFileTypes } from 'src/scripts/utilities/options';
import { Project } from 'src/scripts/application/Project';
import { post } from 'src/scripts/utilities/functions';

// Get composable components
const comp = cm.useComposables();
// Get run task composable function
const runTask = cm.useRunTask();

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
  const options: cm.TSelectOption[] = [];
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

// Flag for opening file selection dialog
const dialogVisible = ref(false);
// Array of file names
const fileNames = ref<cm.TFileInfo[]>([]);

/**
 * Opens a file selection dialog for the user to choose files.
 * This method retrieves file information from an external provider
 * associated with the project's storage location and displays it in a dialog.
 */
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
          // Get the array of filenames from server
          fileNames.value = await post('getFiles', {
            provider: externalApp.data.provider,
            credentials: externalApp.data.credentials,
            path: storageLoc.data.path,
          });
          // Open the dialog
          dialogVisible.value = true;
        });
      }
    }
  }
}

/**
 * Handles the event triggered when a file is selected and updates the file model properties accordingly.
 *
 * @param {TFileInfo} file - The file information object containing details about the selected file.
 */
function onFileSelected(file: cm.TFileInfo): void {
  // Get file extension
  const extension = file.name.split('.').pop();
  // Set file type
  _modelValue.value.type = fo.getFileTypeFromExtension(extension);
  // Set file properties for current file type
  _modelValue.value.properties = fo.getFilePropertiesFromType(
    _modelValue.value.type
  );
  // Determine the name of the file object
  _modelValue.value.name = file.name
    .split('.')
    .slice(0, -1)
    .join('.')
    .toUpperCase();
  // Set the file name
  _modelValue.value.path = file.name;
}

/**
 * Handles the change in file type and updates the file properties accordingly.
 * Fetches the appropriate properties based on the new file type and assigns them to the model's value.
 */
function onFileTypeChanged(): void {
  // Set file properties for current file type
  _modelValue.value.properties = fo.getFilePropertiesFromType(
    _modelValue.value.type
  );
}
</script>
