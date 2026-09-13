<script setup lang="ts">
import FieldFilterModal from './FieldFilterModal.vue';
import { FieldFilterArgs } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  class: { type: String, default: null }
});
const model = defineModel<FieldFilterArgs | null>({ default: null });

const isModalOpen = ref(false);
const showModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};

const displayText = computed(() => {
  if (!model.value || model.value.values.length === 0) {
    return 'any';
  }

  if (model.value.values.length === 1) {
    return `${model.value.key}: ${model.value.values[0]}`;
  }

  return `${model.value.key}: ${model.value.values.length} values`;
});

const onSelect = (selected: FieldFilterArgs | null) => {
  model.value = selected;
};
</script>

<template>
  <div :class="combineClasses('inline-block', 'relative', props.class)">
    <Hotkey hotkey="KeyF" @pressed="showModal" />
    <Button class="w-full h-full" align="justify" :title="displayText" @click="showModal">
      <Icon class="min-w-4" :name="ICONS.FUNNEL" />
      <span class="me-1">Field:</span>
      <span class="grow text-start inline-block align-top max-h-full text-nowrap text-ellipsis overflow-hidden">
        {{ displayText }}
      </span>
      <HotkeyHint hotkey="F" />
    </Button>
  </div>

  <div v-if="isModalOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <FieldFilterModal :data="props.data" :selected="model" @select="onSelect" @close="closeModal" />
  </div>
</template>
