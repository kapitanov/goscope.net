<script setup lang="ts">
import { ICONS } from '../const';
defineProps({
  imageSrc: { type: String, default: '' },
  titleText: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  href: { type: String, default: '' },
  mirror: { type: Boolean, default: false }
});
</script>

<template>
  <div class="mb-4 bg-gray-200 rounded">
    <div class="flex flex-row gap-4 p-4">
      <div v-if="!mirror" class="w-6/12">
        <NuxtImg :src="imageSrc" placeholder />
      </div>
      <div class="grow flex flex-col gap-1">
        <h3 class="font-bold text-2xl sm:text-2xl">
          {{ titleText }}
        </h3>
        <div class="text-lg text-gray-600 grow">
          <slot />
        </div>
        <div>
          <Button nuxt-link="true" :href="href">
            <span>{{ buttonText }}</span>
            <Icon :name="ICONS.ARROW_RIGHT" />
          </Button>
        </div>
      </div>
      <div v-if="!!mirror" class="w-6/12">
        <NuxtImg :src="imageSrc" placeholder />
      </div>
    </div>
  </div>
</template>
