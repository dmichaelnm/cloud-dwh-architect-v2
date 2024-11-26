<template>
  <message-component :message="$t('project.general.message')">
    <!-- Main DIV -->
    <div>
      <!-- Owner and Manager Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Owner Column -->
        <div class="col-3">
          <!-- Owner Input -->
          <select-account
            v-model="_modelValue.general.owner"
            :label="$t('enumeration.memberRole.owner')"
            read-only
          />
        </div>
        <!-- Manager Column -->
        <div class="col-3">
          <!-- Manager Input -->
          <select-account
            v-model="_modelValue.general.manager"
            :label="$t('enumeration.memberRole.manager')"
            :validate="validate"
            :read-only="!isManagerEditable"
            @update:modelValue="
              (value) => (_modelValue.general.manager = value)
            "
          />
        </div>
      </div>
    </div>
  </message-component>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import MessageComponent from 'components/common/MessageComponent.vue';
import { computed } from 'vue';
import SelectAccount from 'components/app/account/SelectAccount.vue';
import { EditorProjectData } from 'src/scripts/ui/project';
import { Account } from 'src/scripts/application/Account';
import { useComposables } from 'src/scripts/utilities/common';
import { EProjectMemberRole, Project } from 'src/scripts/application/Project';

// Get composable components
const comp = useComposables();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorProjectData;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorProjectData): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorProjectData) => emit('update:modelValue', value),
});

// Checks if the manager field is editable by verifying if the project is new
// or if the current user has Owner permissions.
const isManagerEditable = computed(() => {
  if (!_modelValue.value.document) {
    // It is a new project
    return true;
  }
  // Check role
  return (_modelValue.value.document as Project).hasPermission(
    EProjectMemberRole.Owner
  );
});

/**
 * Validates if a given account can be added as a manager.
 *
 * @param {Account} account - The account object to be validated.
 * @return {string|null} - Returns an error message if the account is already a member; otherwise, returns null.
 */
function validate(account: Account): string | null {
  // Check if manager account is not in member list
  if (_modelValue.value.member.some((member) => member.id === account.id)) {
    // Selected account as already a normal project member
    return comp.i18n.t('project.member.error.member');
  }
  // Validation successful
  return null;
}
</script>
