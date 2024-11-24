<template>
  <div style="display: block">
    <!-- Button -->
    <q-btn
      :label="selectedProjectName"
      :ripple="false"
      padding="4px 16px"
      class="project-button"
      align="left"
      icon-right="arrow_drop_down"
      unelevated
      dense
      no-caps
    >
      <!-- Menu -->
      <q-menu anchor="bottom left" self="top left">
        <!-- New Project Menu Item -->
        <menu-item
          :label="$t('project.label.newProject')"
          hide-icon
          @click="
            openEditor(
              EFirestoreDocumentType.Project,
              EDocumentOperation.Create
            )
          "
        />
        <!-- Project Overview Item -->
        <menu-item :label="$t('project.label.overview')" hide-icon />
        <!-- Separator -->
        <q-separator v-if="hasProjects" />
        <!-- Project Items -->
        <menu-item
          v-for="prj in comp.session.projects"
          :key="prj.id"
          :label="prj.data.common.name"
          hide-icon
          @click="onProjectSelected(prj.id)"
        />
      </q-menu>
    </q-btn>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.project-button {
  background-color: $button-control-light;
  color: $text-light;
  font-size: 10pt;
}

.body--dark .project-button {
  background-color: $button-control-dark;
  color: $text-dark;
}
</style>

<script setup lang="ts">
import MenuItem from 'components/common/MenuItem.vue';
import { computed } from 'vue';
import {
  EDocumentOperation,
  useComposables,
  useRouting,
} from 'src/scripts/utilities/common';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';

// Get composable functions
const comp = useComposables();
// Get routing functions
const { openEditor } = useRouting();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Project selected event */
  (event: 'select', value: string): void;
}>();

// Computes the selected project's name or a default message if no project is
// selected.
const selectedProjectName = computed(() =>
  comp.session.project !== null
    ? comp.session.project.data.common.name
    : comp.i18n.t('project.label.noProject')
);

// Computes whether there are any projects available in the session store.
const hasProjects = computed(() => comp.session.projects.length > 0);

/**
 * Handles the action when a project is selected by updating the current project
 * ID in the session account and emitting a 'select' event.
 *
 * @param {string} id - The ID of the selected project.
 */
function onProjectSelected(id: string): void {
  if (comp.session.account) {
    // Set project ID on account
    comp.session.account.data.state.currentProject = id;
    // Send event
    emit('select', id);
  }
}
</script>
