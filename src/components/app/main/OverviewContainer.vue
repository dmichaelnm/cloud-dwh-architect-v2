<template>
  <!-- Container Page -->
  <q-page class="container-page">
    <!-- Container Frame -->
    <div class="container-frame q-col-gutter-y-lg">
      <!-- Container Header Row -->
      <div class="row">
        <!-- Container Title Column -->
        <div class="col-6">
          <!-- Container Title -->
          <div class="container-title">
            {{ $t(`${scope}.overview.title`) }}
          </div>
          <!-- Container Message -->
          <div>{{ $t(`${scope}.overview.message`) }}</div>
        </div>
        <!-- Container Button Column -->
        <div class="col-6 text-right q-gutter-x-sm">
          <!-- Cancel Button -->
          <button-push :label="$t('label.close')" route-to="/" />
        </div>
      </div>
      <!-- Overview Table -->
      <editable-table :model-value="items" :columns="computedColumns">
        <!-- Template for actions -->
        <template v-slot:body-cell-action="{ props }">
          <!-- Table Cell -->
          <q-td :props="props">
            <div class="action-button">
              <!-- View Button -->
              <button-icon
                v-if="permission(cm.EDocumentOperation.View, props.row)"
                :tooltip="$t(`${scope}.overview.tooltip.view`)"
                icon="visibility"
                @click="
                  openEditor(scope, cm.EDocumentOperation.View, props.row.id)
                "
              />
              <!-- Edit Button -->
              <button-icon
                v-if="permission(cm.EDocumentOperation.Edit, props.row)"
                :tooltip="$t(`${scope}.overview.tooltip.edit`)"
                icon="edit"
                @click="
                  openEditor(scope, cm.EDocumentOperation.Edit, props.row.id)
                "
              />
              <!-- Delete Button -->
              <button-icon
                v-if="
                  permission(cm.EDocumentOperation.Delete, props.row) &&
                  deleteHandler
                "
                :tooltip="$t(`${scope}.overview.tooltip.delete`)"
                icon="delete"
                @click="confirmDeletion(props.row)"
              />
            </div>
          </q-td>
        </template>
        <!-- Template for Name & Description column -->
        <template v-slot:body-cell-name="{ props }">
          <!-- Table Cell -->
          <q-td :props="props">
            <!-- Name -->
            <div>{{ props.row.data.common.name }}</div>
            <!-- Description -->
            <div class="text-hint">
              {{ props.row.data.common.description }}
            </div>
          </q-td>
        </template>
        <!-- Template for Created By / At column -->
        <template v-slot:body-cell-created="{ props }">
          <!-- Table Cell -->
          <q-td :props="props">
            <!-- Created By -->
            <div>{{ props.row.data.common.meta.created.by }}</div>
            <!-- Created At -->
            <div>
              {{
                cm.toDateTimeString(
                  props.row.data.common.meta.created.at,
                  comp.session.account?.data.preference.language
                )
              }}
            </div>
          </q-td>
        </template>
        <!-- Template for Altered By / At column -->
        <template v-slot:body-cell-altered="{ props }">
          <!-- Table Cell -->
          <q-td :props="props">
            <!-- Altered By -->
            <div>{{ props.row.data.common.meta.altered?.by }}</div>
            <!-- Altered At -->
            <div>
              {{
                cm.toDateTimeString(
                  props.row.data.common.meta.altered?.at,
                  comp.session.account?.data.preference.language
                )
              }}
            </div>
          </q-td>
        </template>
      </editable-table>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.action-button {
  color: $primary;
}
</style>

<script setup lang="ts">
import * as fd from 'src/scripts/application/FirestoreDocument';
import * as cm from 'src/scripts/utilities/common';
import ButtonPush from 'components/common/ButtonPush.vue';
import ButtonIcon from 'components/common/ButtonIcon.vue';
import EditableTable from 'components/common/EditableTable.vue';
import { computed } from 'vue';
import { TTableColumn } from 'src/scripts/ui/common';
import { useMessageDialog, useRunTask } from 'src/scripts/utilities/common';

// Get composable components
const comp = cm.useComposables();
// Get routing composable functions
const { openEditor } = cm.useRouting();
// Get message dialog composable functions
const { showConfirmationDialog } = useMessageDialog();
// Get run task composable function
const runTask = useRunTask();

// Defines the properties of this component
const props = defineProps<{
  /** Document type of the editor */
  scope: fd.EFirestoreDocumentType;
  /** The items array to be shown in the overview */
  items: fd.FirestoreDocument<fd.IFirestoreDocumentData>[];
  /** Custom columns */
  columns?: TTableColumn[];
  /** Permission handler */
  permission: (
    operation: cm.EDocumentOperation,
    row: fd.FirestoreDocument<fd.IFirestoreDocumentData>
  ) => boolean;
  /** Delete handler */
  deleteHandler?: (
    document: fd.FirestoreDocument<fd.IFirestoreDocumentData>
  ) => void | Promise<void>;
}>();

// Computes and returns an array of table columns, including default
// and custom columns, using internationalization for labels.
const computedColumns = computed(() => {
  // Create columns array
  const colArr: TTableColumn[] = [];
  // Add action column
  colArr.push({
    name: 'action',
    label: '',
    align: 'left',
    headerStyle: 'width: 100px',
    field: '',
  });
  // Add name column
  colArr.push({
    name: 'name',
    label: comp.i18n.t(`${props.scope}.label.name`),
    align: 'left',
    field: (row) => row.data.common.name,
  });
  // Add custom columns
  if (props.columns) {
    colArr.push(...props.columns);
  }
  // Add Created column
  colArr.push({
    name: 'created',
    label: comp.i18n.t('label.created'),
    align: 'left',
    headerStyle: 'width: 200px',
    field: (row) => row.data.common.meta.created.at,
  });
  // Add Altered column
  colArr.push({
    name: 'altered',
    label: comp.i18n.t('label.altered'),
    align: 'left',
    headerStyle: 'width: 200px',
    field: (row) => row.data.common.meta.altered?.at,
  });
  // Return columns array
  return colArr;
});

/**
 * Displays a confirmation dialog to the user for deleting a Firestore document.
 * Based on the user's confirmation, it either executes the delete handler or cancels the operation.
 *
 * @param {fd.FirestoreDocument<fd.IFirestoreDocumentData>} document - The Firestore document to be deleted.
 */
function confirmDeletion(
  document: fd.FirestoreDocument<fd.IFirestoreDocumentData>
): void {
  showConfirmationDialog(
    comp.i18n.t('dialog.delete.title', {
      object: comp.i18n.t(`${props.scope}.object`),
    }),
    comp.i18n.t('dialog.delete.message', {
      article: comp.i18n.t(`${props.scope}.article`),
      object: comp.i18n.t(`${props.scope}.object`),
      name: document.data.common.name,
    }),
    'warning',
    undefined,
    (value) => {
      // Check user decision
      if (value === 'okay') {
        // Start deletion process
        runTask(async () => {
          // Run deletion handler if specified
          if (props.deleteHandler) {
            props.deleteHandler(document);
          }
        });
      }
    }
  );
}
</script>
