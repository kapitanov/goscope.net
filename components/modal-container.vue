<script setup lang="ts">
const modalOverlay = inject('ModalOverlay');
const emit = defineEmits(['close']);
onMounted(() => {
    modalOverlay.show({
        closed: () => {
            emit('close');
        }
    });
});
onUnmounted(() => {
    modalOverlay.hide();
});
</script>

<template>
    <Teleport to="main">
        <div class="fixed z-30 left-0 top-0 flex flex-row justify-center h-full w-full pointer-events-none">
            <div class="max-w-[500px] min-w-[500px] flex flex-col justify-center h-full">
                <div class="max-h-[500px] min-h-[500px] overflow-y-auto mt-12">
                    <div class="flex shadow-xl bg-white rounded border border-1 border-gray-500 overflow-hidden pointer-events-auto">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>