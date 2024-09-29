<script setup lang="ts">
import { ICONS } from '~/const';

const props = defineProps({
    data: { type: Object, default: null },
    class: { type: String, default: null },
});
const model = defineModel({ default: [] as string[] });

const isModalOpen = ref(false);
const showModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };

const displayText = computed(() => {
    if (model.value.length === 0) {
        return 'all';
    }

    if (model.value.length === 1) {
        return model.value[0];
    }

    let text = '';
    for (let i = 0; i < model.value.length; i++) {
        if (i > 0) {
            text += ', ';
        }
        text += model.value[i];
    }
    return text;
});

const onSelect = (selected: string[]) => {
    model.value = selected;
};
</script>

<template>
    <div :class="combineClasses('inline-block', 'relative', props.class)">
        <Hotkey hotkey="KeyF" @pressed="showModal" />
        <Button class="w-full h-full" align="justify" :title="displayText" @click="showModal">
            <Icon class="min-w-4" :name="ICONS.LIST_CHECKS" />
            <span class="me-1">State:</span>
            <span class="grow text-start inline-block align-top max-h-full text-nowrap text-ellipsis overflow-hidden">
                {{ displayText }}
            </span>
            <HotkeyHint hotkey="F" />
        </Button>
    </div>

    <div v-if="isModalOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <GoroutinesStateFilterModal :data="props.data" :selected="model" @select="onSelect" @close="closeModal" />
    </div>
</template>