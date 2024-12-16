<template>
  <message-component
    v-if="_modelValue.type === EFileType.CSV"
    :message="$t('file.properties.csv.message')"
  >
    <!-- Main DIV -->
    <div class="q-col-gutter-y-sm">
      <!-- Row Separator, Field Delimitor, Quote Character Row-->
      <div class="row q-col-gutter-x-sm">
        <!-- Row Separator Column -->
        <div class="col-2">
          <!-- Row Separator Selection -->
          <select-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).rowSeparator"
            :label="$t('file.properties.csv.rowSeparator')"
            :options="[
              { value: 'CRLF', label: 'CRLF' },
              { value: 'LF', label: 'LF' },
              { value: 'CR', label: 'CR' },
            ]"
            hide-icon
          />
        </div>
        <!-- Field Delimitor Column -->
        <div class="col-2">
          <!-- Field Delimitor Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).fieldDelimitor"
            :label="$t('file.properties.csv.fieldDelimiter')"
          />
        </div>
        <!-- Quote Character Column -->
        <div class="col-2">
          <!-- Quote Character Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).quoteCharacter"
            :label="$t('file.properties.csv.quoteCharacter')"
          />
        </div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <!-- Header Row Column -->
        <div class="col-2">
          <!-- Header Row Selection -->
          <q-checkbox
            v-model="(_modelValue.properties as TFilePropertiesCSV).hasHeaderRow"
            :label="$t('file.properties.csv.hasHeaderRow')"
          />
        </div>
      </div>
    </div>
  </message-component>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { EFileType } from 'src/scripts/utilities/common';
import { TFilePropertiesCSV } from 'src/scripts/application/FileObject';
import InputValue from 'components/common/InputValue.vue';
import MessageComponent from 'components/common/MessageComponent.vue';
import SelectValue from 'components/common/SelectValue.vue';

import { computed } from 'vue';
import { EditorFileObjectData } from 'src/scripts/ui/fileObject';

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorFileObjectData;
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
</script>
