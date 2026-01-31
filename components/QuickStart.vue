<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '~/const';

const props = defineProps({
  id: { type: String, default: '' }
});

const visible = ref<boolean>(true);
onMounted(() => {
  const v = localStorage.getItem(`quickstart-dismissed-${props.id}`);
  if (v && v !== '') {
    visible.value = false;
  }
});

const dismiss = () => {
  visible.value = false;
  localStorage.setItem(`quickstart-dismissed-${props.id}`, 'true');

  useTrackEvent('tutorial_complete', { content_id: props.id });
};
</script>

<template>
  <div v-if="visible" class="border-t border-b border-cyan-800 -mx-8 my-8 px-8 py-8 bg-cyan-50">
    <slot></slot>

    <div class="flex justify-center mt-8">
      <div>
        <Button @click="dismiss"> <Icon :name="ICONS.X" class="w-4 h-4 mr-1" /> Dismiss this guide </Button>
      </div>
    </div>
  </div>
</template>
