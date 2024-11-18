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
        <menu-item :label="$t('project.label.newProject')" hide-icon />
        <!-- Project Overview Item -->
        <menu-item :label="$t('project.label.overview')" hide-icon />
      </q-menu>
    </q-btn>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.project-button {
  background-color: $button-control-light;
  color: $text-light;
}

.body--dark .project-button {
  background-color: $button-control-dark;
  color: $text-dark;
}
</style>

<script setup lang="ts">
import MenuItem from 'components/common/MenuItem.vue';
import { computed } from 'vue';
import { useComposables } from 'src/scripts/utilities/common';

// Get composable functions
const comp = useComposables();

const selectedProjectName = computed(() =>
  comp.session.project !== null
    ? comp.session.project.data.common.name
    : comp.i18n.t('project.label.noProject')
);
</script>
