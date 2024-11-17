<template>
  <!-- Input -->
  <q-input
    select="inputValue"
    :model-value="_modelValue"
    :label="label"
    :type="type"
    :autofocus="autoFocus"
    :autocomplete="autoComplete"
    :rules="[(value) => (mandatory ? !!value : true) || $t('error.emptyInput')]"
    lazy-rules="ondemand"
    spellcheck="false"
    no-error-icon
    stack-label
    outlined
    dense
    @update:modelValue="(value) => (_modelValue = value)"
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput } from 'quasar';

// Reference to the q-input component.
const inputValue = ref<QInput | null>(null);

// Defines the properties of this component
const props = defineProps<{
  /** Model value of this component */
  modelValue: string | number | null;
  /** The label of the input field */
  label?: string;
  /** The type of the input field */
  type?: 'text' | 'password' | 'textarea' | 'file' | 'number' | 'time' | 'date';
  /** Auto Complete attribute */
  autoComplete?: string;
  /** Auto Focus flag */
  autoFocus?: boolean;
  /** Mandatory flag */
  mandatory?: boolean;
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

/**
 * Resets the validation state of the input value.
 */
function resetValidation(): void {
  inputValue.value?.resetValidation();
}

// Exposed methods of this component
defineExpose({
  resetValidation,
});
</script>
