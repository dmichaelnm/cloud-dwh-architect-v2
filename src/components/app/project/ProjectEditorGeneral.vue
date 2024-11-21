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
            v-model="_modelValue.owner"
            :label="$t('enumeration.memberRole.owner')"
            read-only
          />
        </div>
        <!-- Manager Column -->
        <div class="col-3">
          <!-- Manager Input -->
          <select-account
            v-model="_modelValue.manager"
            :label="$t('enumeration.memberRole.manager')"
            @update:modelValue="(value) => (_modelValue.manager = value)"
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
import { TProjectGeneral } from 'src/scripts/ui/project';

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: TProjectGeneral;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: TProjectGeneral): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: TProjectGeneral) => emit('update:modelValue', value),
});
</script>
