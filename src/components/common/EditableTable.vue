<template>
  <!-- Message Component -->
  <message-component :message="message">
    <!-- Table DIV -->
    <div class="q-col-gutter-y-sm">
      <!-- Empty Message Row -->
      <div class="row" v-if="_modelValue.length === 0 && emptyMessage">
        <!-- Empty Message Column -->
        <div class="col text-hint">
          <!-- Empty Message -->
          {{ emptyMessage }}
        </div>
      </div>
      <!-- Table Row -->
      <div class="row" v-if="_modelValue.length > 0">
        <!-- Table Column -->
        <div class="col">
          <!-- Table -->
          <q-table
            :rows="_modelValue"
            :columns="computedColumns"
            :pagination-label="(f, e, t) => f + ' - ' + e + ' / ' + t"
            :pagination="{
              rowsPerPage: 10,
              sortBy: sortBy,
              descending: sortOrder === 'desc',
            }"
            :rows-per-page-label="$t('label.recordsPerPage')"
            :rows-per-page-options="[10, 20, 50, 100, 0]"
            hide-no-data
            flat
            dense
            wrap-cells
          >
            <!-- Template for selection column -->
            <template v-slot:body-cell-select="props" v-if="!readOnly">
              <!-- Table Cell -->
              <q-td :props="props">
                <!-- Radio Buttun -->
                <q-radio
                  v-model="selectedRowIndex"
                  :val="props.rowIndex"
                  dense
                  size="xs"
                />
              </q-td>
            </template>
            <!-- Template for custom columns -->
            <template
              v-for="col in columns"
              :key="col.name"
              v-slot:[getSlotName(col)]="props"
            >
              <!-- Custom Column Slot -->
              <slot :name="getSlotName(col)" :props="props">
                <!-- Custom Column Cell -->
                <q-td :props="props">
                  <!-- Custom String or Number Column Value -->
                  <div
                    v-if="
                      getInputType(col, props.row) !==
                      ETableColumnInput.Checkbox
                    "
                  >
                    <!-- Value DIV -->
                    <div class="flex q-gutter-x-sm">
                      <!-- Optional Icon DIV -->
                      <div v-if="getIcon(col, props.row)">
                        <!-- Optional Icon -->
                        <q-icon :name="getIcon(col, props.row)" size="xs" />
                      </div>
                      <!-- Value -->
                      <div>{{ props.value }}</div>
                    </div>
                  </div>
                  <!-- Custom Boolean Column Value -->
                  <div
                    v-if="
                      getInputType(col, props.row) ===
                      ETableColumnInput.Checkbox
                    "
                  >
                    <!-- Readonly Icon -->
                    <q-icon
                      v-if="readOnly"
                      :name="
                        props.value ? 'check_box' : 'check_box_outline_blank'
                      "
                      size="xs"
                    />
                    <!-- Checkbox -->
                    <q-checkbox
                      v-if="!readOnly"
                      v-model="props.row.value"
                      size="xs"
                      dense
                    />
                  </div>
                  <!-- Text input popup editor -->
                  <q-popup-edit
                    :ref="setEditorReference('pe', col, props.rowIndex)"
                    v-model="props.row[col.name]"
                    v-if="
                      getInputType(col, props.row) === ETableColumnInput.Text &&
                      !readOnly
                    "
                    v-slot="scope"
                    anchor="center middle"
                    @show="select(col, props.rowIndex)"
                  >
                    <!-- Input component -->
                    <input-value
                      :ref="setEditorReference('iv', col, props.rowIndex)"
                      v-model="scope.value"
                      :label="col.label"
                      hide-bottom-space
                      @focusout="updateValue(props.rowIndex, col, scope.value)"
                      @keyup.enter="hideEditor(col, props.rowIndex)"
                      @blur="hideEditor(col, props.rowIndex)"
                    />
                  </q-popup-edit>
                  <!-- Select input popup editor -->
                  <q-popup-edit
                    :ref="setEditorReference('pe', col, props.rowIndex)"
                    v-model="props.row[col.name]"
                    v-if="
                      getInputType(col, props.row) ===
                        ETableColumnInput.Select && !readOnly
                    "
                    v-slot="scope"
                    anchor="center middle"
                    @show="showPopup(col, props.rowIndex)"
                  >
                    <!-- Select component -->
                    <select-value
                      :ref="setEditorReference('sl', col, props.rowIndex)"
                      v-model="scope.value"
                      :label="col.label"
                      :options="col.options as TSelectOption[]"
                      :translate="col.translate"
                      :hide-icon="col.selectHideIcon"
                      @update:model-value="
                        updateValue(props.rowIndex, col, scope.value, true)
                      "
                    />
                  </q-popup-edit>
                </q-td>
              </slot>
            </template>
          </q-table>
        </div>
      </div>
      <!-- Button Row -->
      <div class="row" v-if="!readOnly">
        <!-- Button Column -->
        <div class="col">
          <!-- Add Row Button -->
          <button-icon
            v-if="addRowHandler"
            icon="add"
            @click="addRow"
            :tooltip="addTooltip"
          />
          <!-- Delete Row Button -->
          <button-icon
            v-if="deletable && selectedRowIndex > -1"
            icon="remove"
            @click="deleteRow"
            :tooltip="deleteTooltip"
          />
        </div>
      </div>
    </div>
  </message-component>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import MessageComponent from 'components/common/MessageComponent.vue';
import { computed, reactive, ref } from 'vue';
import ButtonIcon from 'components/common/ButtonIcon.vue';
import { ETableColumnInput, TTableColumn } from 'src/scripts/ui/common';
import InputValue from 'components/common/InputValue.vue';
import SelectValue from 'components/common/SelectValue.vue';
import { QPopupEdit } from 'quasar';
import { TSelectOption } from 'src/scripts/utilities/common';

// Contains the references to popup editors in the editable table
const references = reactive(<Record<string, any>>{});

// Selected row index
const selectedRowIndex = ref(-1);

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: Record<string, any>[];
  /** Table message */
  message?: string;
  /** Message when table is empty */
  emptyMessage?: string;
  /** Handler for adding a row */
  addRowHandler?: (
    callback: (row: Record<string, any>) => void
  ) => void | Promise<void>;
  /** Tooltip for the Add button */
  addTooltip?: string;
  /** Column definitions */
  columns: TTableColumn[];
  /** Validator function */
  validate?: (index: number, name: string, oldValue: any, newValue: any) => any;
  /** Flag for the possibility of deleting rows */
  deletable?: boolean;
  /** Tooltip for the Delete button */
  deleteTooltip?: string;
  /** Flag for the possibility of moving rows */
  moveable?: boolean;
  /** Flag for marking this component as read only */
  readOnly?: boolean;
  /** Name of column to be sorted */
  sortBy?: string;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: Record<string, any>[]): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: Record<string, any>[]) => emit('update:modelValue', value),
});

// The computed array of column definitions
const computedColumns = computed(() => {
  // Create computed columns array
  const colArr: TTableColumn[] = [];
  // If rows are deletable or moveable, create a selection column
  if (props.deletable || props.moveable) {
    colArr.push({
      name: 'select',
      align: 'center',
      label: '',
      field: '',
      headerStyle: 'width: 50px',
    });
  }
  // Add custom columns
  colArr.push(...props.columns);
  // Check last column for headerStyle attribute
  if (colArr.length > 0 && colArr[colArr.length - 1].headerStyle) {
    // Add empty column
    colArr.push({ name: 'lastEmptyColumn', label: '', field: '' });
  }
  return colArr;
});

/**
 * Adds a new row to the model value using the handler function provided in props.
 * The handler function is awaited to ensure the row is properly added.
 */
async function addRow(): Promise<void> {
  // Check for valid handler function
  if (props.addRowHandler) {
    // Call the handler
    await props.addRowHandler((row) => {
      // Add the new row to the model value
      _modelValue.value.push(row);
      // Set selected index to new row
      selectedRowIndex.value = _modelValue.value.length - 1;
    });
  }
}

/**
 * Deletes a row from the model based on the current selected row index.
 */
function deleteRow(): void {
  // Remove the selected row
  _modelValue.value.splice(selectedRowIndex.value, 1);
  // Set the new selected index
  selectedRowIndex.value -= 1;
  // Check selected row index
  if (selectedRowIndex.value < 0 && _modelValue.value.length > 0) {
    selectedRowIndex.value = 0;
  }
}

/**
 * Determines the input type for a given table column and row data.
 *
 * @param {TTableColumn} column - The table column definition.
 * @param {any} row - The data for the current row.
 * @return {ETableColumnInput | undefined} - The determined input type or undefined if not specified.
 */
function getInputType(
  column: TTableColumn,
  row: any
): ETableColumnInput | undefined {
  if (typeof column.input === 'function') {
    // Input type is a function that evaluates the input type
    return column.input(row);
  }
  if (column.input) {
    // Return the static input type
    return column.input;
  }
  // Return undefined as default input type
  return undefined;
}

/**
 * Retrieves the icon associated with a specific column and row.
 *
 * @param {TTableColumn} column - The column definition that may contain an icon or a function to determine an icon.
 * @param {any} row - The row data used to determine the icon when the column icon is a function.
 * @return {string | undefined} The icon name as a string if available, or undefined if no icon is determined.
 */
function getIcon(column: TTableColumn, row: any): string | undefined {
  if (typeof column.icon === 'function') {
    // Icon is determined from a function call
    return column.icon(row);
  }
  if (column.icon) {
    // Icon name is static
    return column.icon;
  }
  // No icon
  return undefined;
}

/**
 * Constructs a slot name for a given table column.
 *
 * @param {TTableColumn} column - The table column object for which the slot name is being constructed.
 * @return {`body-cell-${string}`} The constructed slot name for the table cell.
 */
function getSlotName(column: TTableColumn): `body-cell-${string}` {
  return `body-cell-${column.name}` as const;
}

/**
 * Sets a reference to an editor element for a specific table column and index.
 *
 * @param {string} prefix - The component prefix.
 * @param {TTableColumn} column - The column object for which the editor reference is being set.
 * @param {number} index - The index of the row for which the editor reference is being set.
 * @return {Function} - A function that accepts an element and sets it as the editor reference.
 */
function setEditorReference(
  prefix: string,
  column: TTableColumn,
  index: number
): (el: any) => any {
  return (el: any) => {
    references[`${prefix}_${column.name}_${index}`] = el;
  };
}

/**
 * Hides the editor element associated with a specific table column and row index.
 *
 * @param {TTableColumn} column - The table column associated with the editor.
 * @param {number} index - The row index corresponding to the editor.
 */
function hideEditor(column: TTableColumn, index: number): void {
  const editor = references[`pe_${column.name}_${index}`];
  if (editor && editor.hide) {
    editor.hide();
  }
}

/**
 * Selects a value in the specified table column at the given index.
 *
 * @param {TTableColumn} column - The table column object containing the name property used to identify the column.
 * @param {number} index - The index of the row in the table for which the value selection should occur.
 */
function select(column: TTableColumn, index: number): void {
  const editor = references[`iv_${column.name}_${index}`];
  if (editor && editor.select) {
    editor.select();
  }
}

/**
 * Shows the options window of a select component for the specified table column at the given index.
 *
 * @param {TTableColumn} column - The column object that contains the data and configuration for the table column.
 * @param {number} index - The zero-based index representing the row number within the table.
 */
function showPopup(column: TTableColumn, index: number): void {
  const editor = references[`sl_${column.name}_${index}`];
  if (editor && editor.showPopup) {
    editor.showPopup();
  }
}

/**
 * Updates the value of a specific cell in a table model.
 *
 * @param {number} index - The row index of the cell to be updated.
 * @param {TTableColumn} column - The column object containing the column name.
 * @param {*} value - The new value to be assigned to the cell.
 * @param {boolean} hide - Flag for hiding the popup editor.
 */
function updateValue(
  index: number,
  column: TTableColumn,
  value: any,
  hide: boolean = false
): void {
  // Get the old value
  const oldValue = _modelValue.value[index][column.name];
  // Set the new value
  _modelValue.value[index][column.name] = props.validate
    ? props.validate(index, column.name, oldValue, value)
    : value;
  // Hide popup editor if necessary
  if (hide) {
    hideEditor(column, index);
  }
}
</script>
