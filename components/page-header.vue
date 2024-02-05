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
        <span class="hidden sm:inline text-xl sm:text-2xl md:text-3xl text-foreground">
          {{ C.APP_NAME }}
        </span>
        <span class="inline sm:hidden text-xl text-foreground">
          {{ C.APP_NAME_SHORT }}
        </span>
        <Beta>
          <span class="w-8 h-8 rounded-full bg-cyan-800 text-white flex items-center place-items-center">
            <Icon :name="ICONS.BETA" class="m-auto" />
          </span>
        </Beta>
      </NuxtLink>

    </div>
    <div class="flex gap-x-12 justify-end">
      <CircleButton :href="C.GITHUB_URL" target="_blank">
        <Icon :name="ICONS.GITHUB" />
      </CircleButton>
    </div>
  </nav>
</template>
