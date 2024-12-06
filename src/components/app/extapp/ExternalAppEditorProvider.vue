<template>
  <!-- Message Component -->
  <message-component :message="$t('externalApp.provider.message')">
    <!-- Main DIV -->
    <div class="q-col-gutter-y-md">
      <!-- Provider Select Row -->
      <div class="row q-col-gutter-x-sm">
        <!-- Provider Select Column -->
        <div class="col-3">
          <!-- Provider Select -->
          <select-value
            v-model="_modelValue.provider"
            :options="getExternalApplicationProviders()"
            :label="$t('externalApp.label.provider')"
            :read-only="isEditMode || isReadOnly"
            translate
          />
        </div>
      </div>
      <!-- Amazon S3 Credentials Row -->
      <div class="row" v-if="_modelValue.provider === EExternalAppProvider.S3">
        <!-- Amazon S3 Credentials Column -->
        <div class="col">
          <!-- Amazon S3 Message Component -->
          <message-component :message="$t('externalApp.provider.s3.message')">
            <!-- Amazon S3 DIV -->
            <div>
              <!-- Region Select Row -->
              <div class="row q-col-gutter-x-sm">
                <!-- Region Select Column -->
                <div class="col-3">
                  <!-- Region Select -->
                  <select-value
                    v-model="(_modelValue.credentials as s3.TProviderCredentialsS3).region"
                    :options="s3.getAWSRegions()"
                    :label="$t('externalApp.provider.s3.region')"
                    :read-only="isReadOnly"
                  >
                    <!-- Template for Region option -->
                    <template v-slot:option="props">
                      <!-- Item -->
                      <q-item clickable v-close-popup v-bind="props.itemProps">
                        <!-- Icon Section -->
                        <q-item-section side>
                          <q-icon :name="props.opt.icon" />
                        </q-item-section>
                        <!-- Label Section -->
                        <q-item-section>
                          <div>{{ props.opt.label }}</div>
                          <div class="text-hint text-region">
                            ({{ props.opt.value }})
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                  </select-value>
                </div>
                <!-- Bucket Name Column -->
                <div class="col-3">
                  <!-- Bucket Name -->
                  <input-value
                    v-model="(_modelValue.credentials as s3.TProviderCredentialsS3).bucket"
                    :label="$t('externalApp.provider.s3.bucket')"
                    :read-only="isReadOnly"
                    mandatory
                  />
                </div>
                <!-- Access Key Id Column -->
                <div class="col-3">
                  <!-- Access Key Id -->
                  <input-value
                    v-model="(_modelValue.credentials as s3.TProviderCredentialsS3).accessKeyId"
                    :label="$t('externalApp.provider.s3.accessKeyId')"
                    :read-only="isReadOnly"
                    type="password"
                    mandatory
                  />
                </div>
                <!-- Secret Access Key Column -->
                <div class="col-3">
                  <!-- Secret Access Key -->
                  <input-value
                    v-model="(_modelValue.credentials as s3.TProviderCredentialsS3).secretAccessKey"
                    :label="$t('externalApp.provider.s3.secretAccessKey')"
                    :read-only="isReadOnly"
                    type="password"
                    mandatory
                  />
                </div>
              </div>
            </div>
          </message-component>
        </div>
      </div>
      <!-- Snowflake Credentials Row-->
      <div
        class="row"
        v-if="_modelValue.provider === EExternalAppProvider.Snowflake"
      >
        <!-- Snowflake Credentials Column -->
        <div class="col">
          <!-- Snowflake Message Component -->
          <message-component
            :message="$t('externalApp.provider.snowflake.message')"
          >
            <!-- Snowflake DIV -->
            <div>
              <!-- Account, Username & Password Row -->
              <div class="row q-col-gutter-x-sm">
                <!-- Account Column -->
                <div class="col-3">
                  <!-- Account -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).account"
                    :label="$t('externalApp.provider.snowflake.account')"
                    :read-only="isReadOnly"
                    mandatory
                  />
                </div>
                <!-- Username Column -->
                <div class="col-3">
                  <!-- Username -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).username"
                    :label="$t('externalApp.provider.snowflake.username')"
                    :read-only="isReadOnly"
                    mandatory
                    upper-case
                  />
                </div>
                <!-- Password Column -->
                <div class="col-3">
                  <!-- Password -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).password"
                    :label="$t('externalApp.provider.snowflake.password')"
                    :read-only="isReadOnly"
                    type="password"
                    mandatory
                  />
                </div>
              </div>
              <!-- Optional Parameter Row -->
              <div class="row q-col-gutter-x-sm">
                <!-- Database Column -->
                <div class="col-3">
                  <!-- Database -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).database"
                    :label="$t('externalApp.provider.snowflake.database')"
                    :read-only="isReadOnly"
                    upper-case
                  />
                </div>
                <!-- Warehouse Column -->
                <div class="col-3">
                  <!-- Warehouse -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).warehouse"
                    :label="$t('externalApp.provider.snowflake.warehouse')"
                    :read-only="isReadOnly"
                    upper-case
                  />
                </div>
                <!-- Role Column -->
                <div class="col-3">
                  <!-- Role -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).role"
                    :label="$t('externalApp.provider.snowflake.role')"
                    :read-only="isReadOnly"
                    upper-case
                  />
                </div>
                <!-- Schema Column -->
                <div class="col-3">
                  <!-- Schema -->
                  <input-value
                    v-model="(_modelValue.credentials as snflk.TProviderCredentialsSnowflake).schema"
                    :label="$t('externalApp.provider.snowflake.schema')"
                    :read-only="isReadOnly"
                    upper-case
                  />
                </div>
              </div>
            </div>
          </message-component>
        </div>
      </div>
      <!-- Test Button Row -->
      <div class="row" v-if="!isReadOnly">
        <!-- Test Button Column -->
        <div class="col text-right">
          <!-- Test Button -->
          <button-push
            :label="$t('externalApp.label.testConnection')"
            @click="testConnection"
          />
        </div>
      </div>
    </div>
  </message-component>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.text-region {
  font-size: 8pt;
}
</style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import * as s3 from 'src/scripts/provider/s3';
import * as snflk from 'src/scripts/provider/snowflake';
import MessageComponent from 'components/common/MessageComponent.vue';
import SelectValue from 'components/common/SelectValue.vue';
import InputValue from 'components/common/InputValue.vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import { computed } from 'vue';
import { getExternalApplicationProviders } from 'src/scripts/utilities/options';
import { EditorExternalAppData } from 'src/scripts/ui/externalApp';
import { EExternalAppProvider } from 'src/scripts/provider/common';
import { post } from 'src/scripts/utilities/functions';

// Get composable components
const comp = cm.useComposables();
// Get run task composable function
const runTask = cm.useRunTask();
// Get message dialog composable functions
const { showSuccessDialog, showErrorDialog } = cm.useMessageDialog();

// Defines the properties of this component
const props = defineProps<{
  /** Model value */
  modelValue: EditorExternalAppData;
}>();

// Defines the events that can be emitted by this component
const emit = defineEmits<{
  /** Model update event */
  (event: 'update:modelValue', value: EditorExternalAppData): void;
}>();

// The internal model value of this component
const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: EditorExternalAppData) => emit('update:modelValue', value),
});

// Flag resolving to true, if editor is in edit mode, otherwise false
const isEditMode = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === cm.EDocumentOperation.Edit
    : false
);

// Flag resolving to true, if editor is in read only, otherwise false
const isReadOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === cm.EDocumentOperation.View
    : false
);

/**
 * Initiates a test connection to an external application and handles the result.
 *
 * This function sends a test request to the external application specified by the current model value.
 * If the connection is successful, a success dialog is displayed with information from the result.
 * If the connection fails, a failure dialog is shown with the error message if the error code matches 'connection-failed'.
 * Any other errors are considered unexpected.
 */
function testConnection(): void {
  // Start the process
  runTask(
    async () => {
      // Post the request
      const result = await post<EditorExternalAppData, string>(
        'testConnection',
        _modelValue.value
      );
      // Show success dialog
      showSuccessDialog(
        comp.i18n.t('externalApp.dialog.testConnection.success.title'),
        comp.i18n.t('externalApp.dialog.testConnection.success.message'),
        result
      );
    },
    (error: any) => {
      // Check error code
      if (error.code === 'connection-failed') {
        // Show specific failure dialog
        showErrorDialog(
          comp.i18n.t('externalApp.dialog.testConnection.failure.title'),
          comp.i18n.t('externalApp.dialog.testConnection.failure.message'),
          error.message
        );
        return true;
      }
      // Show unexpected error
      return false;
    }
  );
}
</script>
