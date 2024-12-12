<template>
  <!-- Main DIV -->
  <div class="q-col-gutter-y-md">
    <!-- External App Selection Message Component Row -->
    <div class="row">
      <div class="col">
        <!-- External App Message Component -->
        <message-component
          :message="$t('storageLoc.editor.message.externalAppSelection')"
        >
          <div class="row">
            <!-- External App Selection Row -->
            <div class="col-6">
              <!-- External App Selection -->
              <select-value
                v-model="_modelValue.externalApp"
                :options="externalAppOptions"
                :label="$t('externalApp.label.name')"
              />
            </div>
          </div>
        </message-component>
      </div>
    </div>
    <!-- Path Input Row -->
    <div class="row">
      <div class="col">
        <!-- Path Message Component -->
        <message-component
          :message="$t('storageLoc.editor.message.pathSelection')"
        >
          <div class="row">
            <!-- Path Input Column -->
            <div class="col-6">
              <!-- Path Input -->
              <input-value
                v-model="_modelValue.path"
                :label="$t('storageLoc.label.path')"
                button-icon="search"
                @button-click="showFolders"
              />
            </div>
          </div>
        </message-component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import SelectValue from 'components/common/SelectValue.vue';
import MessageComponent from 'components/common/MessageComponent.vue';
import InputValue from 'components/common/InputValue.vue';
import { EditorStorageLocationData } from 'src/scripts/ui/storageLocation';
import { computed } from 'vue';
import { Project } from 'src/scripts/application/Project';
import { post } from 'src/scripts/utilities/functions';

// Get composable components
const comp = cm.useComposables();
// Get run task composable function
const runTask = cm.useRunTask();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorStorageLocationData;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorStorageLocationData): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorStorageLocationData) => emit('update:modelValue', value),
});

// Computes a list of selectable options for external apps that support storage location operations based on the
// currently active project.
const externalAppOptions = computed(() => {
  // Create options array
  const options: cm.TSelectOption[] = [];
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get storage location capable apps
    const apps = project.getStorageLocationCapableApps();
    // Iterate over all apps and add options
    for (const app of apps) {
      options.push({
        value: app.id,
        label: app.data.common.name,
        icon: `img:icons/${app.data.provider}.png`,
      });
    }
  }
  // Return options array
  return options;
});

function showFolders(): void {
  // Get current project
  const project = comp.session.project as Project;
  if (project) {
    // Get external application
    const externalApp = project.getExternalApplication(
      _modelValue.value.externalApp as string
    );
    if (externalApp) {
      runTask(async () => {
        const result = await post('getFolders', {
          provider: externalApp.data.provider,
          credentials: externalApp.data.credentials,
        });
        console.log(result);
      });
    }
  }
}
</script>
