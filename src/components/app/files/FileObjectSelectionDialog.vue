<template>
  <!-- Basic Dialog -->
  <basic-dialog
    :model-value="_modelValue"
    :title="$t('file.dialog.fileSelection.title')"
    :message="$t('file.dialog.fileSelection.message')"
    :handler="onFileSelected"
    :width="700"
    @update:model-value="(value) => (_modelValue = value)"
    @before-show="initDialog"
  >
    <!-- File Selection Table -->
    <editable-table
      v-model="rows"
      :selected-row="rows.length > 0 ? 0 : undefined"
      :columns="[
        {
          name: 'name',
          label: $t('file.dialog.fileSelection.fileName'),
          align: 'left',
          field: (row) => row.name,
        },
        {
          name: 'size',
          label: $t('file.dialog.fileSelection.fileSize'),
          align: 'right',
          headerStyle: 'width: 150px',
          field: (row) => formatFileSize(row.size),
        },
        {
          name: 'lastModified',
          label: $t('file.dialog.fileSelection.lastModified'),
          align: 'center',
          headerStyle: 'width: 150px',
          field: (row) => formatDateTime(row.lastModified),
        },
      ]"
      selectable
      @row-selected="(value) => (selectedRowIndex = value)"
    />
  </basic-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import BasicDialog from 'components/common/BasicDialog.vue';
import EditableTable from 'components/common/EditableTable.vue';
import { computed, ref } from 'vue';
import { Account } from 'src/scripts/application/Account';

// Get composable components
const comp = cm.useComposables();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: boolean;
  /** Array of file objects */
  files: cm.TFileInfo[];
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: boolean): void;
  /** File Selection Event */
  (event: 'fileSelected', file: cm.TFileInfo): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

// The rows to be displayed in the table
const rows = computed(() => props.files);

// Selected row index
const selectedRowIndex = ref(0);

/**
 * Initializes the dialog by resetting any necessary states or components.
 */
function initDialog(): void {
  selectedRowIndex.value = 0;
}

/**
 * Formats the given file size into a string representation.
 *
 * @param {string | number | undefined} size - The size of the file to format. It can be a string, a number, or undefined.
 * @return {string} The formatted file size string. Returns an empty string if the input size is undefined.
 */
function formatFileSize(size: string | number | undefined): string {
  // Check size
  if (size) {
    let value = 0;
    if (typeof size === 'string') {
      // Handle string values
      const converted = cm.toNumber(size);
      if (converted) {
        value = converted as number;
      } else {
        return size;
      }
    } else {
      value = size as number;
    }
    // Convert
    if (value > 1024 * 1024 * 1024) {
      // Giga Byte
      return (value / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (value > 1024 * 1024) {
      // Mega Byte
      return (value / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (value > 1024) {
      // Kilo Byte
      return (value / 1024).toFixed(2) + ' KB';
    } else {
      // Byte
      return value + ' B';
    }
  }
  // Return empty string
  return '';
}

/**
 * Formats the given time as a localized string based on the user's language preference.
 *
 * @param {string|Date|undefined} time - The date or time to format. Can be a string, Date object, or undefined.
 * @return {string} The formatted date and time as a string, or an empty string if the account is not available or the input is invalid.
 */
function formatDateTime(time: string | Date | undefined): string {
  // Get current account
  const account = comp.session.account as Account;
  // Check account
  if (account) {
    if (typeof time === 'string') {
      // Time is specified as string
      const date = new Date(time);
      return date.toLocaleString(account.data.preference.language);
    } else if (time instanceof Date) {
      // Time is specified as Date
      return time.toLocaleString(account.data.preference.language);
    }
  }
  return '';
}

/**
 * Handles the logic triggered when a file is selected. Retrieves the selected file object,
 * emits an event with the selected file, and closes the dialog.
 *
 * @return {boolean} Returns `true` to indicate the successful handling of the file selection.
 */
function onFileSelected(): boolean {
  // Get selected file object
  const file = props.files[selectedRowIndex.value];
  // Emit event
  emit('fileSelected', file);
  // Close dialog
  return true;
}
</script>
