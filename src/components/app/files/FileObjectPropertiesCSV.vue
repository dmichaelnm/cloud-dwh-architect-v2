<template>
  <message-component
    v-if="_modelValue.type === EFileType.CSV"
    :message="$t('file.properties.csv.message')"
  >
    <!-- Main DIV -->
    <div class="q-col-gutter-y-sm">
      <!-- Has Header Row - Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Header Row Column -->
        <div class="col-2">
          <!-- Header Row Selection -->
          <q-checkbox
            v-model="(_modelValue.properties as TFilePropertiesCSV).hasHeaderRow"
            :label="$t('file.properties.csv.hasHeaderRow')"
            :disable="readOnly"
          />
        </div>
      </div>
      <!-- Row Separator, Field Delimitor, Quote Character Row-->
      <div class="row q-col-gutter-x-sm">
        <!-- Row Separator Column -->
        <div class="col-2">
          <!-- Row Separator Selection -->
          <select-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).rowSeparator"
            :label="$t('file.properties.csv.rowSeparator')"
            :read-only="readOnly"
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
            :read-only="readOnly"
          />
        </div>
        <!-- Quote Character Column -->
        <div class="col-2">
          <!-- Quote Character Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).quoteCharacter"
            :label="$t('file.properties.csv.quoteCharacter')"
            :read-only="readOnly"
          />
        </div>
      </div>
      <!-- Format Pattern Rows -->
      <div class="row q-col-gutter-x-sm">
        <!-- Date Format Column -->
        <div class="col-2">
          <!-- Date Format Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).dateFormat"
            :label="$t('file.properties.csv.dateFormat')"
            :read-only="readOnly"
          />
        </div>
        <!-- Time Format Column -->
        <div class="col-2">
          <!-- Time Format Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).timeFormat"
            :label="$t('file.properties.csv.timeFormat')"
            :read-only="readOnly"
          />
        </div>
        <!-- Timestamp Format Column -->
        <div class="col-2">
          <!-- Timestamp Format Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).timestampFormat"
            :label="$t('file.properties.csv.timestampFormat')"
            :read-only="readOnly"
          />
        </div>
        <!-- Decimal Separator Column -->
        <div class="col-2">
          <!-- Decimal Separator Selection -->
          <input-value
            v-model="(_modelValue.properties as TFilePropertiesCSV).decimalSeparator"
            :label="$t('file.properties.csv.decimalSeparator')"
            :read-only="readOnly"
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
  /** Read only flag */
  readOnly?: boolean;
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
