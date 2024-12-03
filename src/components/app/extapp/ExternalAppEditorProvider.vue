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
      <div class="row" v-if="_modelValue.provider === pv.EExternalAppProvider.S3">
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
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsS3).region"
                    :options="pv.getAWSRegions()"
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
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsS3).bucket"
                    :label="$t('externalApp.provider.s3.bucket')"
                    :read-only="isReadOnly"
                    mandatory
                  />
                </div>
                <!-- Access Key Id Column -->
                <div class="col-3">
                  <!-- Access Key Id -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsS3).accessKeyId"
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
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsS3).secretAccessKey"
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
        v-if="_modelValue.provider === pv.EExternalAppProvider.Snowflake"
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
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).account"
                    :label="$t('externalApp.provider.snowflake.account')"
                    :read-only="isReadOnly"
                    mandatory
                  />
                </div>
                <!-- Username Column -->
                <div class="col-3">
                  <!-- Username -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).username"
                    :label="$t('externalApp.provider.snowflake.username')"
                    :read-only="isReadOnly"
                    mandatory
                  />
                </div>
                <!-- Password Column -->
                <div class="col-3">
                  <!-- Password -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).password"
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
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).database"
                    :label="$t('externalApp.provider.snowflake.database')"
                    :read-only="isReadOnly"
                  />
                </div>
                <!-- Warehouse Column -->
                <div class="col-3">
                  <!-- Warehouse -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).warehouse"
                    :label="$t('externalApp.provider.snowflake.warehouse')"
                    :read-only="isReadOnly"
                  />
                </div>
                <!-- Role Column -->
                <div class="col-3">
                  <!-- Role -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).role"
                    :label="$t('externalApp.provider.snowflake.role')"
                    :read-only="isReadOnly"
                  />
                </div>
                <!-- Schema Column -->
                <div class="col-3">
                  <!-- Schema -->
                  <input-value
                    v-model="(_modelValue.credentials as pv.TProviderCredentialsSnowflake).schema"
                    :label="$t('externalApp.provider.snowflake.schema')"
                    :read-only="isReadOnly"
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
          <button-push :label="$t('externalApp.label.testConnection')" />
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
import * as pv from 'src/scripts/utilities/provider';
import MessageComponent from 'components/common/MessageComponent.vue';
import SelectValue from 'components/common/SelectValue.vue';
import InputValue from 'components/common/InputValue.vue';
import ButtonPush from 'components/common/ButtonPush.vue';
import { computed } from 'vue';
import { getExternalApplicationProviders } from 'src/scripts/utilities/options';
import { EditorExternalAppData } from 'src/scripts/ui/externalApp';
import { EDocumentOperation, useComposables } from 'src/scripts/utilities/common';

// Get composable components
const comp = useComposables();

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
    ? comp.session.editorParameter.operation === EDocumentOperation.Edit
    : false
);

// Flag resolving to true, if editor is in read only, otherwise false
const isReadOnly = computed(() =>
  comp.session.editorParameter
    ? comp.session.editorParameter.operation === EDocumentOperation.View
    : false
);

</script>
