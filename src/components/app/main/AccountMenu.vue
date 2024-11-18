<template>
  <!-- Account Menu DIV -->
  <div>
    <!-- Account Menu Row -->
    <div class="row">
      <!-- Account Menu Button Column -->
      <div class="col-auto">
        <!-- Account Menu Button -->
        <button-icon icon="settings">
          <!-- Menu -->
          <q-menu style="width: 200px">
            <!-- Logout Item -->
            <menu-item
              :label="$t('auth.label.logout')"
              icon="logout"
              @click="emit('logout')"
            />
          </q-menu>
        </button-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import ButtonIcon from 'components/common/ButtonIcon.vue';
import MenuItem from 'components/common/MenuItem.vue';

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Logout event */
  (event: 'logout'): void;
}>();
</script>
