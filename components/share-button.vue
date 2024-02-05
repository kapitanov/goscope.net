<script setup lang="ts">
import { ICONS } from '../const';
const props = defineProps({
    url: { type: String, default: '' },
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: '' },
    class: { type: String, default: '' },
    color: { type: String, default: '' },
});
const snackbar = useSnackbar();
const disabled = ref(false); /* eslint-disable-line vue/no-dupe-keys */
const slots = useSlots();
const shareHandler = async () => {
    try {
        disabled.value = true;
        await navigator.share({
            url: props.url
        });
    } catch (err: any) {
        snackbar.add({
            text: `Failed to share: ${err.message || err}`,
            type: 'error',
        });
    } finally {
        disabled.value = false;
    }
};
</script>
<template>
    <Button :title="props.title" :disabled="props.disabled || disabled" :size="props.size" :color="props.color"
        :class="props.class" @click="shareHandler">
        <slot></slot>
        <Icon v-if="!slots.default" :name="ICONS.SHARE" />
    </Button>
</template>