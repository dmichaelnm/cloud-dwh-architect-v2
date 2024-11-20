<template>
  <!-- Basic Dialog -->
  <basic-dialog
    :model-value="_modelValue"
    :title="$t('dialog.selectAccount.title')"
    :message="$t('dialog.selectAccount.message')"
    :handler="onSubmit"
    @update:model-value="(value) => (_modelValue = value)"
    @before-show="onInit"
  >
    <!-- Dialog DIV -->
    <div>
      <!-- Email Row -->
      <div class="row">
        <!-- Email Column -->
        <div class="col">
          <!-- Email Input -->
          <input-value
            v-model="email"
            :label="$t('auth.label.email')"
            :error-message="emailError"
            auto-focus
            mandatory
          />
        </div>
      </div>
    </div>
  </basic-dialog>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import BasicDialog from 'components/common/BasicDialog.vue';
import { computed, ref } from 'vue';
import InputValue from 'components/common/InputValue.vue';
import { Account, findAccount } from 'src/scripts/application/Account';
import { useComposables } from 'src/scripts/utilities/common';

// Get composable functions
const comp = useComposables();

// Defines the properties of this component
const props = defineProps<{
  /** The model value */
  modelValue: boolean;
  /** Validator */
  validate?: (account: Account) => string | null;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: boolean): void;
  /** Account selected event */
  (event: 'accountSelected', account: Account): void;
}>();

// Email Address
const email = ref('');
// Email Address Error Message
const emailError = ref('');

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * Initializes the email input and error message by setting their values to empty strings.
 */
function onInit(): void {
  email.value = '';
  emailError.value = '';
}

/**
 * Handles the submission process by attempting to find and validate an account based on the provided email,
 * and emits an event if the account is successfully found and validated.
 *
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating the success or failure of the submission process.
 */
async function onSubmit(): Promise<boolean> {
  // Try to find the account for the given email address
  const account = await findAccount(email.value);
  // Check if account was found
  if (account === null) {
    // Account was not found, set error
    emailError.value = comp.i18n.t('error.accountNotFound');
    return false;
  }
  // Run the validator if specified
  if (props.validate) {
    const error = props.validate(account);
    if (error !== null) {
      // Validation has failed with a specific error message
      emailError.value = error;
    }
  }
  // Emit event
  emit('accountSelected', account);
  return true;
}
</script>
