<template>
  <!-- Select Account Dialog -->
  <select-account-dialog
    v-model="dialogVisible"
    :validate="validate"
    @account-selected="(account) => (_modelValue = account)"
  />

  <!-- Field -->
  <q-field :label="label" :readonly="readOnly" outlined dense stack-label>
    <!-- Template for the account -->
    <template v-slot:control>
      <!-- Account Name -->
      {{ _modelValue !== null ? _modelValue.data.common.name : '' }}
    </template>
    <!-- Template for Select Button -->
    <template v-slot:append v-if="!readOnly">
      <!-- Select Button -->
      <button-icon icon="person_search" @click="dialogVisible = true" />
    </template>
  </q-field>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ButtonIcon from 'components/common/ButtonIcon.vue';
import { Account } from 'src/scripts/application/Account';
import { computed, ref } from 'vue';
import SelectAccountDialog from 'components/app/account/SelectAccountDialog.vue';

// Defines the properties of this component
const props = defineProps<{
  /** The model value */
  modelValue: Account | null;
  /** The label of the account selection input. */
  label?: string;
  /** Read Only flag */
  readOnly?: boolean;
  /** Validator */
  validate?: (account: Account) => string | null;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: Account | null): void;
}>();

// Visible flag for account selection dialog
const dialogVisible = ref(false);

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: Account | null) => emit('update:modelValue', value),
});
</script>
