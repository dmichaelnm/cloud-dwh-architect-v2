<template>
  <!-- Overview Container -->
  <overview-container
    :scope="EFirestoreDocumentType.Project"
    :columns="[
      {
        name: 'owner',
        label: $t('enumeration.memberRole.owner'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => (row as Project).getOwner()?.name
      },
      {
        name: 'manager',
        label: $t('enumeration.memberRole.manager'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => (row as Project).getManager()?.name
      },
      {
        name: 'role',
        label: $t('project.label.ownRole'),
        align: 'left',
        headerStyle: 'width: 200px',
        field: (row) => $t(`enumeration.memberRole.${(row as Project).getRole()}`)
      }
    ]"
  />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import OverviewContainer from 'components/app/main/OverviewContainer.vue';
import { EFirestoreDocumentType } from 'src/scripts/application/FirestoreDocument';
import { Project } from 'src/scripts/application/Project';
</script>
