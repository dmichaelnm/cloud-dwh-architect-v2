<template>
  <!-- Columns Table -->
  <editable-table
    v-model="_modelValue.columns"
    :columns="columns"
    :message="$t('file.columns.message')"
    :empty-message="$t('file.columns.messageEmpty')"
    :add-row-handler="addColumn"
    :read-only="readOnly"
    deletable
    moveable
  >
    <!-- Template: Position -->
    <template v-slot:body-cell-position="{ props }">
      <!-- Table Cell -->
      <q-td :props="props"> {{ props.rowIndex + 1 }}.</q-td>
    </template>
  </editable-table>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed } from 'vue';
import EditableTable from 'components/common/EditableTable.vue';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';
import {
  TColumnDefinitionCSV,
  TFileColumnDefinition,
} from 'src/scripts/application/FileObject';
import { EColumnType } from 'src/scripts/application/CommonTypes';
import { ETableColumnInput, TTableColumn } from 'src/scripts/ui/common';
import { EFileType, useComposables } from 'src/scripts/utilities/common';
import { getColumnTypes } from 'src/scripts/utilities/options';

// Get composable components
const comp = useComposables();

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
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorFileObjectData) => emit('update:modelValue', value),
});

// Returns the array of column definitions for the table
const columns = computed(() => {
  // Define common columns
  const columns: TTableColumn[] = [
    // Position
    {
      name: 'position',
      align: 'right',
      label: '',
      headerStyle: 'width: 50px',
      field: '',
    },
    // Column Name
    {
      name: 'name',
      align: 'left',
      label: comp.i18n.t('file.columns.name'),
      headerStyle: 'width: 200px',
      field: (row: TFileColumnDefinition) => row.name,
      input: ETableColumnInput.Text,
    },
    // Column Type
    {
      name: 'type',
      align: 'left',
      label: comp.i18n.t('file.columns.type'),
      headerStyle: 'width: 125px',
      field: (row: TFileColumnDefinition) =>
        comp.i18n.t(`enumeration.columnType.${row.type}`),
      input: ETableColumnInput.Select,
      options: getColumnTypes(),
      translate: true,
    },
    // Precision
    {
      name: 'precision',
      align: 'center',
      label: comp.i18n.t('file.columns.precision'),
      headerStyle: 'width: 100px',
      field: (row: TFileColumnDefinition) => row.precision,
      input: (row) => getInputTypeFor('precision', row),
    },
    // Scale
    {
      name: 'scale',
      align: 'center',
      label: comp.i18n.t('file.columns.scale'),
      headerStyle: 'width: 100px',
      field: (row: TFileColumnDefinition) => row.scale,
      input: (row) => getInputTypeFor('scale', row),
    },
    // Nullable
    {
      name: 'nullable',
      align: 'center',
      label: comp.i18n.t('file.columns.nullable'),
      headerStyle: 'width: 100px',
      field: (row: TFileColumnDefinition) => row.nullable,
      input: ETableColumnInput.Checkbox,
    },
  ];
  // Add file type dependent columns
  if (_modelValue.value.type === EFileType.CSV) {
    // Add format column
    columns.push({
      name: 'format',
      align: 'left',
      label: comp.i18n.t('file.columns.format'),
      headerStyle: 'width: 200px',
      field: (row: TColumnDefinitionCSV) => row.format,
      input: (row) => getInputTypeFor('format', row),
    });
  }
  // Add comment column
  columns.push({
    name: 'comment',
    align: 'left',
    label: comp.i18n.t('file.columns.comment'),
    field: (row: TColumnDefinitionCSV) => row.comment,
    input: ETableColumnInput.Text,
  });
  // Return column definitions
  return columns;
});

/**
 * Adds a new column to a data structure by invoking the provided callback function.
 *
 * @param {function} callback - A function that accepts a "row" object of type TFileColumnType, representing the
 *                              configuration for the new column.
 */
function addColumn(callback: (row: TFileColumnDefinition) => void): void {
  callback({
    name: comp.i18n.t('file.columns.newColumn'),
    type: EColumnType.String,
    precision: 100,
    scale: null,
    nullable: false,
    format: null,
    comment: null,
  });
}

/**
 * Determines the appropriate input type for a given column definition based on the provided scope.
 *
 * @param scope The scope defining the type of operation (e.g., 'precision', 'scale', 'format') to determine the input type.
 * @param row The column definition object containing information about the column such as type and relevant properties.
 * @return An input type from `ETableColumnInput` corresponding to the scope and column type,
 *         or `undefined` if no input type is applicable.
 */
function getInputTypeFor(
  scope: 'precision' | 'scale' | 'format',
  row: TFileColumnDefinition
): ETableColumnInput | undefined {
  if (scope === 'precision') {
    if (row.type === EColumnType.String) {
      row.precision = row.precision ? row.precision : 100;
      return ETableColumnInput.Number;
    } else if (row.type === EColumnType.Number) {
      row.precision = row.precision ? row.precision : 10;
      return ETableColumnInput.Number;
    } else if (row.type === EColumnType.Timestamp) {
      row.precision = 9;
      return ETableColumnInput.Number;
    } else {
      row.precision = null;
    }
  } else if (scope === 'scale') {
    if (row.type === EColumnType.Number) {
      row.scale = row.scale ? row.scale : 0;
      return ETableColumnInput.Number;
    } else {
      row.scale = null;
    }
  } else if (scope === 'format' && _modelValue.value.type === EFileType.CSV) {
    if (row.type === EColumnType.Number) {
      (row as TColumnDefinitionCSV).format = null;
      return ETableColumnInput.Text;
    } else if (row.type === EColumnType.Date) {
      (row as TColumnDefinitionCSV).format = (row as TColumnDefinitionCSV)
        .format
        ? (row as TColumnDefinitionCSV).format
        : 'YYYY-MM-DD';
      return ETableColumnInput.Text;
    } else if (row.type === EColumnType.Time) {
      (row as TColumnDefinitionCSV).format = (row as TColumnDefinitionCSV)
        .format
        ? (row as TColumnDefinitionCSV).format
        : 'HH24:MI:SS';
      return ETableColumnInput.Text;
    } else if (row.type === EColumnType.Timestamp) {
      (row as TColumnDefinitionCSV).format = (row as TColumnDefinitionCSV)
        .format
        ? (row as TColumnDefinitionCSV).format
        : 'YYYY-MM-DD HH24:MI:SS.FF9';
      return ETableColumnInput.Text;
    } else {
      (row as TColumnDefinitionCSV).format = null;
    }
  }
  // No edit possible
  return undefined;
}
</script>
