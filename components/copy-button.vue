<script setup lang="ts">
import { ICONS } from '../const';
const props = defineProps({
  text: { type: String, default: '' },
  title: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: '' },
  class: { type: String, default: '' },
  color: { type: String, default: '' }
});
const snackbar = useSnackbar();
const disabled = ref(false); /* eslint-disable-line vue/no-dupe-keys */
const slots = useSlots();
const copyHandler = async () => {
  try {
    disabled.value = true;
    await navigator.clipboard.writeText(props.text);
    snackbar.add({
      text: 'Copied to clipboard',
      type: 'success'
    });
  } catch (err: any) {
    snackbar.add({
      text: `Failed to copy: ${err.message || err}`,
      type: 'error'
    });
  } finally {
    disabled.value = false;
  }
};
</script>

<template>
  <Button
    :title="props.title"
    :disabled="props.disabled || disabled"
    :size="props.size"
    :color="props.color"
    :class="props.class"
    @click="copyHandler"
  >
    <slot></slot>
    <Icon v-if="!slots.default" :name="ICONS.COPY" />
  </Button>
</template>
