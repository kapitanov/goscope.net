<script setup lang="ts">
import { ICONS } from '../const';
defineProps({
  imageSrc: { type: String, default: '' },
  titleText: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  href: { type: String, default: '' },
  demoText: { type: String, default: '' },
  demoHref: { type: String, default: '' },
  mirror: { type: Boolean, default: false }
});
</script>

<template>
  <div class="mb-4 bg-gray-200 rounded">
    <div class="flex m-4 mb-0">
      <h3 class="font-bold text-2xl sm:text-2xl">
        {{ titleText }}
      </h3>
    </div>
    <div class="flex flex-col lg:flex-row gap-4 p-4">
      <div v-if="!mirror" class="w-full lg:w-6/12">
        <a :href="href">
          <img :src="imageSrc" />
        </a>
      </div>
      <div class="grow flex flex-col gap-1">
        <div class="text-lg text-gray-600 grow mb-4">
          <slot />
        </div>
        <div v-if="demoHref" class="flex gap-4 w-100 flex-col sm:flex-row">
          <Button :nuxt-link="true" :href="href" class="w-full sm:w-6/12">
            <span>{{ buttonText }}</span>
            <Icon :name="ICONS.ARROW_RIGHT" />
          </Button>
          <Button :nuxt-link="true" :href="demoHref" class="w-full sm:w-6/12">
            <span>{{ demoText }}</span>
            <Icon :name="ICONS.ARROW_RIGHT" />
          </Button>
        </div>
        <div v-else class="flex w-100">
          <Button :nuxt-link="true" :href="href">
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
