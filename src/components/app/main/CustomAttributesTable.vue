<template>
  <!-- Editable Table -->
  <editable-table
    v-model="_modelValue"
    :message="$t('message.customAttributes')"
    :empty-message="$t('message.customAttributesEmpty')"
    :add-row-handler="addAttribute"
    :validate="validate"
    :read-only="readOnly"
    :columns="[
      {
        name: 'key',
        label: $t('label.key'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => row.key,
        input: ETableColumnInput.Text,
      },
      {
        name: 'type',
        label: $t('label.type'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => $t(`enumeration.customAttributeType.${row.type}`),
        input: ETableColumnInput.Select,
        options: getCustomAttributeTypes(),
        hideIcon: true,
        translate: true,
      },
      {
        name: 'value',
        label: $t('label.value'),
        align: 'left',
        field: (row) => row.value,
        input: (row) =>
          row.type === ECustomAttributeType.Boolean
            ? ETableColumnInput.Checkbox
            : ETableColumnInput.Text,
      },
    ]"
    deletable
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditableTable from 'components/common/EditableTable.vue';
import {
  ECustomAttributeType,
  TCustomAttribute, toBoolean, toNumber
} from 'src/scripts/utilities/common';
import { computed } from 'vue';
import { ETableColumnInput } from 'src/scripts/ui/common';
import { getCustomAttributeTypes } from 'src/scripts/utilities/options';

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: TCustomAttribute[];
  /** Flag for marking this component as read only */
  readOnly?: boolean;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: TCustomAttribute[]): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: TCustomAttribute[]) => emit('update:modelValue', value),
});

/**
 * Adds a new attribute by finding the next available index for the default attribute name
 * and then creating and passing a new row object to the provided callback.
 *
 * @param {function} callback - The callback function that will be invoked with the newly created row.
 */
function addAttribute(callback: (row: any) => void): void {
  // Find next free index for default attribute name
  let index = 0;
  while (_modelValue.value.some((row) => row.key === `attribute${index}`)) {
    index++;
  }
  // Create new row
  const newRow = {
    key: `attribute${index}`,
    type: ECustomAttributeType.String,
    value: '',
  };
  // Call callback handler
  callback(newRow);
}

/**
 * Validates and processes the new value for a given attribute based on its type and name.
 *
 * @param {number} index - The index of the item being validated.
 * @param {string} name - The name of the attribute being validated.
 * @param {any} oldValue - The old value of the attribute before validation.
 * @param {any} newValue - The new value of the attribute to be validated.
 * @return {any} The validated and potentially modified new value.
 */
function validate(
  index: number,
  name: string,
  oldValue: any,
  newValue: any
): any {
  // Check the key column
  if (name === 'key') {
    // Remove all special character from the name
    newValue = (newValue as string).replace(/[^a-zA-Z0-9_]/g, '');
    // Make the first character as lower case
    newValue =
      (newValue as string).substring(0, 1).toLowerCase() +
      (newValue as string).substring(1);
    // Check if the new key isn't already used, if so, replace with old value
    if (
      _modelValue.value.some(
        (att, idx) => index !== idx && newValue === att.key
      )
    ) {
      newValue = oldValue;
    }
  }
  // Check the type column
  else if (name === 'type') {
    // Get the type
    const type = newValue as ECustomAttributeType;
    // Check string type
    if (type === ECustomAttributeType.String) {
      _modelValue.value[index].value =
        _modelValue.value[index].value.toString();
    }
    // Check number type
    else if (type === ECustomAttributeType.Number) {
      const value = toNumber(_modelValue.value[index].value);
      if (value === null) {
        _modelValue.value[index].value = 0;
      } else {
        _modelValue.value[index].value = value;
      }
    }
    // Check boolean type
    else if (type === ECustomAttributeType.Boolean) {
      _modelValue.value[index].value = toBoolean(
        _modelValue.value[index].value
      );
    }
  }
  // Check the value column
  else if (name === 'value') {
    // Get the type
    const type = _modelValue.value[index].type;
    // Check number type
    if (type === ECustomAttributeType.Number) {
      const value = toNumber(newValue);
      newValue = value !== null ? value : oldValue;
    }
  }
  // Return the new value
  return newValue;
}
</script>
