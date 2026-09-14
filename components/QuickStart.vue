<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '~/const';

const props = defineProps({
  id: { type: String, default: '' }
});

const storageKey = `quickstart-dismissed-${props.id}`;
const visible = ref<boolean>(true);

onMounted(() => {
  visible.value = localStorage.getItem(storageKey) !== 'true';
});

const hide = () => {
  visible.value = false;
  localStorage.setItem(storageKey, 'true');

  useTrackEvent('tutorial_complete', { content_id: props.id });
};

const show = () => {
  visible.value = true;
  localStorage.setItem(storageKey, 'false');

  useTrackEvent('tutorial_start', { content_id: props.id });
};
</script>

<template>
  <div v-if="visible" class="border-t border-b border-cyan-800 dark:border-cyan-700 -mx-8 my-8 px-8 py-8 bg-cyan-50 dark:bg-cyan-950">
    <slot></slot>

    <div class="flex justify-center mt-8">
      <div>
        <Button @click="hide"> <Icon :name="ICONS.X" class="w-4 h-4 mr-1" /> Hide this guide </Button>
      </div>
    </div>
  </div>
  <div v-else class="my-4">
    <Button @click="show"> <Icon :name="ICONS.QUESTION" class="w-4 h-4 mr-1" /> Show guide </Button>
  </div>
</template>
