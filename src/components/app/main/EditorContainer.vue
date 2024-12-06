<template>
  <!-- Page -->
  <q-page class="container-page">
    <!-- Editor Form -->
    <q-form @submit="onSubmit">
      <!-- Container Frame -->
      <div class="container-frame q-col-gutter-y-lg">
        <!-- Container Header Row -->
        <div class="row">
          <!-- Container Title Column -->
          <div class="col-6">
            <!-- Container Title -->
            <div class="container-title">
              {{ $t(`${scope}.editor.${mode}.title`) }}
            </div>
            <!-- Container Message -->
            <div>{{ $t(`${scope}.editor.${mode}.message`) }}</div>
          </div>
          <!-- Container Button Column -->
          <div class="col-6 text-right q-gutter-x-sm">
            <!-- Save Button -->
            <button-push
              v-if="!readOnly"
              :label="$t('label.save')"
              type="submit"
            />
            <!-- Cancel Button -->
            <button-push
              :label="readOnly ? $t('label.close') : $t('label.cancel')"
              look="secondary"
              @click="leaveEditor"
            />
          </div>
        </div>
        <!-- Common Properties Row -->
        <div class="row q-col-gutter-x-sm">
          <!-- Name Column -->
          <div class="col-4">
            <!-- Name Input -->
            <input-value
              v-model="_modelValue.name"
              :label="$t(`${scope}.label.name`)"
              :read-only="readOnly"
              auto-focus
              mandatory
            />
          </div>
          <!-- Description Column -->
          <div class="col-8">
            <!-- Description Input -->
            <input-value
              v-model="_modelValue.description"
              :label="$t('label.description')"
              :read-only="readOnly"
            />
          </div>
        </div>
        <!-- Tab Row -->
        <div class="row">
          <!-- Tab Column -->
          <div class="col">
            <!-- Tab Definition -->
            <q-tabs v-model="tabKey" align="left" no-caps dense>
              <!-- Tab Definition -->
              <q-tab
                v-for="t in tabs"
                :key="t.key"
                :name="t.key"
                :label="$t(t.label)"
              />
            </q-tabs>
            <!-- Tab Panels -->
            <q-tab-panels v-model="tabKey" keep-alive>
              <!-- Tab Panel -->
              <q-tab-panel v-for="t in tabs" :key="t.key" :name="t.key">
                <!-- Tab Panel Slot -->
                <slot :name="`tab-${t.key}`" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';
</style>

<script setup lang="ts">
import * as fd from 'src/scripts/application/FirestoreDocument';
import * as cm from 'src/scripts/utilities/common';
import ButtonPush from 'components/common/ButtonPush.vue';
import InputValue from 'components/common/InputValue.vue';
import { computed, ref } from 'vue';
import { EditorData } from 'src/scripts/ui/common';

// Get composable functions
const comp = cm.useComposables();
// Get run task composable function
const runTask = cm.useRunTask();

// Defines the properties of this component
const props = defineProps<{
  /** The model value */
  modelValue: EditorData<fd.IFirestoreDocumentData>;
  /** Document type of the editor */
  scope: fd.EFirestoreDocumentType;
  /** Tab definition array */
  tabs: cm.TEditorTab[];
  /** Parent Firestore document */
  parent?: fd.FirestoreDocument<fd.IFirestoreDocumentData>;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (
    event: 'update:modelValue',
    value: EditorData<fd.IFirestoreDocumentData>
  ): void;
  /** Create event */
  (
    event: 'created',
    value: fd.FirestoreDocument<fd.IFirestoreDocumentData>
  ): void;
  /** Update event */
  (
    event: 'updated',
    value: fd.FirestoreDocument<fd.IFirestoreDocumentData>
  ): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorData<fd.IFirestoreDocumentData>) =>
    emit('update:modelValue', value),
});

// The editor mode
const mode = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter?.operation
    : cm.EDocumentOperation.Create
);

// Current tab key
const tabKey = ref(props.tabs.length > 0 ? props.tabs[0].key : '');

// Computes the readOnly state based on the editor parameters;
// it returns true if the operation is "View" or if there are no editor parameters.
const readOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === cm.EDocumentOperation.View
    : true
);

/**
 * Handles the process to leave the editor view. This method resets the editor
 * parameters and redirects the user to the previous path stored in the session.
 */
function leaveEditor(): void {
  // Route to the callers path
  comp.router.back();
  // Reset editor parameter
  comp.session.editorParameter = null;
}

/**
 * Handles the submission process. Resets validation messages and validates the editor data.
 * Depending on the document operation type (create or edit), it creates or updates a Firestore document.
 * Upon successful creation or update, it emits corresponding events and exits the editor.
 */
function onSubmit(): void {
  // Reset validation messages
  _modelValue.value.resetValidation();

  // Validate the editor data
  if (!_modelValue.value.validate()) {
    return;
  }

  // Start save process
  runTask(async () => {
    // Get the data object
    const data = _modelValue.value.createData();
    // Check document operation
    const op = comp.session.editorParameter?.operation as cm.EDocumentOperation;
    const type = comp.session.editorParameter
      ?.scope as fd.EFirestoreDocumentType;
    if (op === cm.EDocumentOperation.Create) {
      // Create Firestore document
      const document = await fd.createDocument(
        type,
        data,
        undefined,
        props.parent
      );
      // Emit created event
      emit('created', document);
    } else if (op === cm.EDocumentOperation.Edit) {
      // Get attached Firestore document
      const document = _modelValue.value.document;
      if (document) {
        // Apply metadata of document to created data
        data.common.meta = document.data.common.meta;
        // Apply new data to document
        document.data = data;
        // Update the Firestore document
        await fd.updateDocument(document, true);
        // Emit updated event
        emit('updated', document);
      }
    }
    // Leave editor
    leaveEditor();
  });
}
</script>
