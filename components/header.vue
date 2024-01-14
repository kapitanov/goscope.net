<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as C from '../const';
const ICONS = C.ICONS;
</script>

<template>
  <nav class="flex items-center justify-between">
    <div class="flex flex-1">
      <NuxtLink href="/" class="flex gap-x-2 items-center">
        <Icon :name="ICONS.GOLANG" size="4em" class="text-cyan-900" />
      </NuxtLink>
      <NuxtLink href="/" class="flex gap-x-2 items-center">
        <span class="text-3xl sm:text-2xl text-foreground">{{
          C.APP_NAME
        }}</span>
      </NuxtLink>
    </div>
    <div class="flex gap-x-12 justify-end">
      <CircleButton :href="C.GITHUB_URL" target="_blank">
        <Icon :name="ICONS.GITHUB" />
      </CircleButton>
    </div>
  </nav>
</template>
