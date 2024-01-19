<script setup lang="ts">
const props = defineProps<{
    error: any;
}>();
const slots = useSlots();
</script>
<template>
    <div v-if="error" class="border-2 rounded border-red-200 bg-red-200 p-2">
        <p>{{ props.error }}</p>
        <div v-if="slots.default">
            <div class="mt-2 border-t border-red-700 bg-red-200 pt-2 mt-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>