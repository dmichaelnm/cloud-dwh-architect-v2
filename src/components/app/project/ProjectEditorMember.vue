<template>
  <!-- Select Account Dialog -->
  <select-account-dialog
    v-model="visible"
    :validate="validateNewMember"
    @account-selected="addNewMember"
  />

  <!-- Editable Table -->
  <editable-table
    v-model="_modelValue.member"
    :message="$t('project.member.message')"
    :empty-message="$t('project.member.emptyMessage')"
    :add-row-handler="openAccountDialog"
    :add-tooltip="$t('project.member.tooltip.add')"
    :delete-tooltip="$t('project.member.tooltip.delete')"
    :read-only="readOnly"
    :columns="[
      {
        name: 'name',
        label: $t('project.label.memberName'),
        align: 'left',
        headerStyle: 'width: 300px',
        field: (row) => row.name
      },
      {
        name: 'role',
        label: $t('project.label.role'),
        align: 'left',
        headerStyle: 'width: 250px',
        field: (row) => $t(`enumeration.memberRole.${row.role}`),
        input: ETableColumnInput.Select,
        options: getProjectMemberRoles(),
        translate: true,
        selectHideIcon: true
      },
      {
        name: 'description',
        label: $t('label.description'),
        align: 'left',
        field: (row) => row.description,
        input: ETableColumnInput.Text
      },
    ]"
    deletable
    moveable
  ></editable-table>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import EditableTable from 'components/common/EditableTable.vue';
import { computed, ref } from 'vue';
import SelectAccountDialog from 'components/app/account/SelectAccountDialog.vue';
import { EditorProjectData } from 'src/scripts/ui/project';
import { Account } from 'src/scripts/application/Account';
import {
  EProjectMemberRole,
  TProjectMember,
} from 'src/scripts/application/Project';
import { useComposables } from 'src/scripts/utilities/common';
import { ETableColumnInput } from 'src/scripts/ui/common';
import { getProjectMemberRoles } from 'src/scripts/utilities/options';

// Get composable functions
const comp = useComposables();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorProjectData;
  /** Flag for marking this component as read only */
  readOnly?: boolean;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model value update */
  (event: 'update:modelValue', value: EditorProjectData): void;
}>();

// Visibility of account selection dialog
const visible = ref(false);
// Reference to the callback function
const callbackHandler = ref<((row: object) => void) | null>(null);

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorProjectData) => emit('update:modelValue', value),
});

/**
 * Opens an account dialog and stores the provided callback handler.
 *
 * @param {function} callback - A function that handles a row object.
 */
function openAccountDialog(callback: (row: object) => void): void {
  // Store callback handler
  callbackHandler.value = callback;
  // Open dialog
  visible.value = true;
}

/**
 * Adds a new member to the project using the provided account information.
 *
 * @param {Account} account - The account containing the new member's information.
 */
function addNewMember(account: Account): void {
  // Add callback handler
  if (callbackHandler.value) {
    callbackHandler.value({
      id: account.id,
      name: account.data.common.name,
      role: EProjectMemberRole.Visitor,
      description: null,
    } as TProjectMember);
  }
}

/**
 * Validates the new member account to ensure it isn't already present as an owner, manager, or regular member.
 *
 * @param {Account} account - The account to be validated.
 * @return {string | null} - Returns an error message string if validation fails, otherwise returns null.
 */
function validateNewMember(account: Account): string | null {
  // Check for owner account
  if (_modelValue.value.general.owner?.id === account.id) {
    // Owner cannot be selected
    return comp.i18n.t('project.member.error.owner');
  }
  // Check for manager account
  if (_modelValue.value.general.manager?.id === account.id) {
    // Manager cannot be selected
    return comp.i18n.t('project.member.error.manager');
  }
  // Check other members
  if (_modelValue.value.member.some((member) => member.id === account.id)) {
    // Selected account is already member
    return comp.i18n.t('project.member.error.member');
  }
  // Validation was successful
  return null;
}
</script>
