<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '~/const';

const props = defineProps({
  gobackVisible: { type: Boolean, default: false },
  gobackLabel: { type: String, default: null }
});
const emit = defineEmits(['goback']);
</script>

<template>
  <div class="flex items-center mb-4">
    <div class="flex gap-2 lg:items-end lg:flex-row flex-col">
      <Button v-if="props.gobackVisible" align="center" class="grow lg:grow-0" @click="emit('goback')">
        <Icon :name="ICONS.RESET" />
        <span class="hidden md:inline">{{ props.gobackLabel }}</span>
      </Button>
      <h1 class="md:text-2xl text-xl font-semibold">Goroutines viewer</h1>
      <div class="text-gray-500 text-balance break-all">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
