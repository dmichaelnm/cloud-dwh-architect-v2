<template>
  <!-- Page -->
  <q-page class="editor-page">
    <!-- Editor Form -->
    <q-form @submit="onSubmit">
      <!-- Editor Frame -->
      <div class="editor-frame q-col-gutter-y-lg">
        <!-- Editor Header Row -->
        <div class="row">
          <!-- Editor Title Column -->
          <div class="col-6">
            <!-- Editor Title -->
            <div class="editor-title">
              {{ $t(`${scope}.editor.${mode}.title`) }}
            </div>
            <!-- Editor Message -->
            <div>{{ $t(`${scope}.editor.${mode}.message`) }}</div>
          </div>
          <!-- Editor Button Column -->
          <div class="col-6 text-right q-gutter-x-sm">
            <!-- Save Button -->
            <button-push :label="$t('label.save')" type="submit" />
            <!-- Cancel Button -->
            <button-push
              :label="$t('label.cancel')"
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

.editor-page {
  padding: 48px;
}

.editor-frame {
  background-color: $background-container-light;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 16px;
}

.body--dark .editor-frame {
  background-color: $background-container-dark;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}

.editor-title {
  color: $text-caption-light;
  font-size: 14pt;
  font-variant: small-caps;
}

.body--dark .editor-title {
  color: $text-caption-dark;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  EDocumentOperation,
  TEditorTab,
  useComposables,
  useRunTask,
} from 'src/scripts/utilities/common';
import ButtonPush from 'components/common/ButtonPush.vue';
import InputValue from 'components/common/InputValue.vue';
import {
  createDocument,
  EFirestoreDocumentType,
  FirestoreDocument,
  IFirestoreDocumentData,
} from 'src/scripts/application/FirestoreDocument';
import { EditorData } from 'src/scripts/ui/common';

// Get composable functions
const comp = useComposables();
// Get run task composable function
const runTask = useRunTask();

// Defines the properties of this component
const props = defineProps<{
  /** The model value */
  modelValue: EditorData<IFirestoreDocumentData>;
  /** Document type of the editor */
  scope: EFirestoreDocumentType;
  /** Editor mode */
  mode: EDocumentOperation;
  /** Tab definition array */
  tabs: TEditorTab[];
}>();

const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorData<IFirestoreDocumentData>): void;
  /** Save event */
  (event: 'save', value: FirestoreDocument<IFirestoreDocumentData>): void;
}>();

// Current tab key
const tabKey = ref(props.tabs.length > 0 ? props.tabs[0].key : '');

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorData<IFirestoreDocumentData>) =>
    emit('update:modelValue', value),
});

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
    const op = comp.session.editorParameter?.operation as EDocumentOperation;
    const type = comp.session.editorParameter?.scope as EFirestoreDocumentType;
    if (op === EDocumentOperation.Create) {
      // Create Firestore document
      const document = await createDocument(type, data);
      // Emit save event
      emit('save', document);
      // Leave editor
      leaveEditor()
    } else if (op === EDocumentOperation.Edit) {
    }
  });
}
</script>
