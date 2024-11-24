<template>
  <!-- Select -->
  <q-select
    ref="selectValue"
    :model-value="_modelValue"
    :options="options"
    :borderless="borderless"
    :outlined="!borderless"
    :label="label"
    :autocomplete="autoComplete"
    dense
    options-dense
    emit-value
    map-options
    @update:modelValue="(value) => (_modelValue = value)"
  >
    <!-- Template for Icon -->
    <template v-slot:prepend v-if="!hideIcon">
      <!-- Icon -->
      <q-icon :name="selectedOption?.icon" size="xs" />
    </template>
    <!-- Template for Label -->
    <template v-slot:selected>
      {{
        selectedOption
          ? translate
            ? $t(selectedOption?.label)
            : selectedOption?.label
          : ''
      }}
    </template>
    <!-- Template for label options -->
    <template v-slot:option="props">
      <!-- Option Item -->
      <q-item clickable v-close-popup dense v-bind="props.itemProps">
        <!-- Icon Section -->
        <q-item-section avatar v-if="props.opt.icon">
          <!-- Icon -->
          <q-icon :name="props.opt.icon" size="xs" />
        </q-item-section>
        <!-- Label Section -->
        <q-item-section>
          <!-- Label -->
          <q-item-label
            >{{ translate ? $t(props.opt.label) : props.opt.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TSelectOption } from 'src/scripts/utilities/common';
import { QSelect } from 'quasar';

// Reference to the select component
const selectValue = ref<QSelect | null>(null);

// Defines the properties of this component
const props = defineProps<{
  /** Model value of this component */
  modelValue: string | number | null;
  /** Options array */
  options: TSelectOption[];
  /** Flag for a borderless select component */
  borderless?: boolean;
  /** Flag for translating the label keys of the options */
  translate?: boolean;
  /** The label of this component */
  label?: string;
  /** Flag for hiding the options icon */
  hideIcon?: boolean;
  /** Auto complete attribute */
  autoComplete?: string
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: string | number | null): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: string | number | null) => emit('update:modelValue', value),
});

// Returns the selected option object
const selectedOption = computed(() =>
  props.options.find((option) => option.value === _modelValue.value)
);

/**
 * Displays the popup associated with the selected value.
 */
function showPopup(): void {
  selectValue.value?.showPopup();
}

// Exposed methods of this component
defineExpose({ showPopup });
</script>
