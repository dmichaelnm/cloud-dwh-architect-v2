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
            :read-only="readOnly"
          />
        </div>
      </div>
      <!-- Sample File & Sample Button Row -->
      <div class="row q-col-gutter-x-sm items-center" v-if="!readOnly">
        <!-- Sample File Column -->
        <div class="col-6">
          <!-- Sample File Input -->
          <input-value
            v-model="sampleFile"
            :label="$t('file.label.sampleFile')"
            button-icon="search"
            hide-bottom-space
            @button-click="openFileSelectionDialog"
          />
        </div>
        <!-- Sample Button Column -->
        <div class="col-3">
          <button-push
            :label="$t('label.sampleDataStructure')"
            @click="sampleMetaData"
          />
        </div>
      </div>
      <!-- Path and Type Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Path Column -->
        <div class="col-6">
          <!-- Path -->
          <input-value
            v-model="_modelValue.filePattern"
            :label="$t('file.label.filePattern')"
            :read-only="readOnly"
            mandatory
          />
        </div>
        <!-- Type Selection Column -->
        <div class="col-3">
          <!-- Type Selection -->
          <select-value
            v-model="_modelValue.type"
            :options="getFileTypes()"
            :label="$t('file.label.type')"
            :read-only="readOnly"
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
    :read-only="readOnly"
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
import ButtonPush from 'components/common/ButtonPush.vue';
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
const { showWarningDialog } = cm.useMessageDialog();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorFileObjectData;
  /** Read only flag */
  readOnly?: boolean;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorFileObjectData): void;
  /** Reverse Engineered event */
  (event: 'reverse-engineered'): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorFileObjectData) => emit('update:modelValue', value),
});

// Sample file
const sampleFile = ref<string>('');

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
          // Normalize path
          const path = storageLoc.data.path.startsWith('/')
            ? storageLoc.data.path.substring(1)
            : storageLoc.data.path;
          // Get the array of filenames from server
          fileNames.value = await post('getFiles', {
            provider: externalApp.data.provider,
            credentials: externalApp.data.credentials,
            path: path,
          });
          if (fileNames.value.length > 0) {
            // Open the dialog
            dialogVisible.value = true;
          } else {
            // Nothing found, show warning dialog
            showWarningDialog(
              comp.i18n.t('file.dialog.noFiles.title'),
              comp.i18n.t('file.dialog.noFiles.message')
            );
          }
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
  let extension = file.name.split('.').pop();
  if (extension === 'gz') {
    // Extension marks file as GZIP, get real extension
    const parts = file.name.split('.');
    extension = parts[parts.length - 2] + '.gz';
  }
  console.debug(extension);
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
  // Set the sample file and file pattern
  sampleFile.value = file.name;
  _modelValue.value.filePattern = file.name;
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

/**
 * Initiates a process to sample metadata for a file from an external application.
 * Handles specific properties and column definitions for CSV file types.
 */
function sampleMetaData(): void {
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
        // Start sampling task
        runTask(async () => {
          // Normalize path
          const path = storageLoc.data.path.startsWith('/')
            ? storageLoc.data.path.substring(1)
            : storageLoc.data.path;
          // Start sampling
          const result = await post('getFileMetaData', {
            provider: externalApp.data.provider,
            credentials: externalApp.data.credentials,
            path: `${path}${sampleFile.value}`,
            type: _modelValue.value.type,
            properties: {
              hasHeaderRow: _modelValue.value.properties
                ? _modelValue.value.properties.hasHeaderRow
                : false,
              decimalSeparator: _modelValue.value.properties
                ? _modelValue.value.properties.decimalSeparator
                : '.',
              dateFormat: _modelValue.value.properties
                ? _modelValue.value.properties.dateFormat
                : 'yyyy-MM-dd',
              timeFormat: _modelValue.value.properties
                ? _modelValue.value.properties.timeFormat
                : 'HH:mm:ss',
              timestampFormat: _modelValue.value.properties
                ? _modelValue.value.properties.timestampFormat
                : 'yyyy-MM-dd HH:mm:ss.SSS',
            },
          });
          if (_modelValue.value.type === EFileType.CSV) {
            // Cast to CSV result
            const csvResult = result as fo.TMetaDataCSV;
            // Get CSV properties
            const csvProperties = _modelValue.value
              .properties as fo.TFilePropertiesCSV;
            // Apply CSV properties
            csvProperties.rowSeparator = csvResult.lineBreak;
            csvProperties.fieldDelimitor = csvResult.fieldDelimiter;
            // Apply column definitions
            _modelValue.value.columns = csvResult.columns;
            // Emit event
            emit('reverse-engineered');
          }
        });
      }
    }
  }
}
</script>
