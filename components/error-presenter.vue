<script setup lang="ts">
import { ICONS } from '../const';

const props = defineProps({
    error: { type: Object, default: null },
    dismissable: { type: Boolean, default: false }
});
const emit = defineEmits(['dismiss']);
const slots = useSlots();
const closeButtonClass = {
    'text-red-900': true,
    'hover:text-red-700': true,
};
</script>
<template>
    <div v-if="error" class="border-2 rounded border-red-200 bg-red-200 p-2 flex flex-col gap-2">
        <div class="flex gap-1">
            <p class="grow">{{ props.error }}</p>
            <button v-if="dismissable" :class="closeButtonClass" @click="emit('dismiss')">
                <Icon :name="ICONS.X" />
            </button>
        </div>
        <div v-if="slots.default">
            <div class="border-t border-red-700 bg-red-200 pt-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>