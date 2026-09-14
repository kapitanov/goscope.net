<script setup lang="ts">
import * as C from '../const';

const ICONS = C.ICONS;
const pwa = usePWA();
</script>

<template>
  <CircleButton v-if="pwa?.showInstallPrompt" title="Install app" @click="pwa.install()">
    <Icon :name="ICONS.INSTALL" />
  </CircleButton>
</template>
