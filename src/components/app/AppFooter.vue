<template>
  <!-- Footer -->
  <q-footer class="app-footer">
    <!-- Footer DIV -->
    <div>
      <!-- Footer Row -->
      <div class="row items-center">
        <!-- Footer Left Column -->
        <div class="col-3 text-left text-hint">
          <!-- Copyright Notice -->
          <span v-html="$t('application.copyright')" />
        </div>
        <!-- Footer Center Column -->
        <div class="col-6 text-center social-media-button">
          <!-- Email Button -->
          <button-icon
            icon="bi-envelope-fill"
            :tooltip="$t('tooltip.socialMedia.email')"
            href="mailto:dirkmichaelnm@gmail.com?subject=Cloud DWH Architect"
            target="_blank"
          />
          <!-- Discord -->
          <button-icon
            icon="bi-discord"
            :tooltip="$t('tooltip.socialMedia.discord')"
            href="https://discord.gg/nepJ6jZEAr"
            target="_blank"
          />
          <!-- Twitch -->
          <button-icon
            icon="bi-twitch"
            :tooltip="$t('tooltip.socialMedia.twitch')"
            href="https://www.twitch.tv/khrenn"
            target="_blank"
          />
          <!-- Linked In -->
          <button-icon
            icon="bi-linkedin"
            :tooltip="$t('tooltip.socialMedia.linkedin')"
            href="https://www.linkedin.com/in/dirk-michael-7b651636/"
            target="_blank"
          />
          <!-- Instagram -->
          <button-icon
            icon="bi-instagram"
            :tooltip="$t('tooltip.socialMedia.instagram')"
            href="https://www.instagram.com/dirk_michael_nm/"
            target="_blank"
          />
          <!-- Threads -->
          <button-icon
            icon="bi-threads"
            :tooltip="$t('tooltip.socialMedia.threads')"
            href="https://www.threads.net/@dirk_michael_nm"
            target="_blank"
          />
          <!-- Twitter / X -->
          <button-icon
            icon="bi-twitter-x"
            :tooltip="$t('tooltip.socialMedia.twitter')"
            href="https://twitter.com/dmic2501"
            target="_blank"
          />
        </div>
        <!-- Footer Right Column -->
        <div class="col-3 text-right text-hint">
          <!-- Version Info -->
          {{
            $t('application.version', {
              major: versionInfo.major,
              minor: versionInfo.minor,
              patch: versionInfo.patch,
              build: versionInfo.build,
            })
          }}
        </div>
      </div>
    </div>
  </q-footer>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.app-footer {
  padding: 4px 8px;
  background-color: transparent;
}

.social-media-button {
  color: $text-hint-light;
}

.body--dark .social-media-button {
  color: $text-hint-dark;
}
</style>

<script setup lang="ts">
import { versionInfo } from 'src/scripts/config/version';
import ButtonIcon from 'components/common/ButtonIcon.vue';
</script>
