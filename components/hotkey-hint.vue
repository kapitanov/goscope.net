<script setup lang="ts">
const props = defineProps({
  hotkey: { type: String, default: '' }
});
const isMacOS = /(Mac|iPhone|iPod|iPad)/i.test(navigator && navigator.platform || '');
const commandButton = isMacOS ? '\u2318' : 'Ctrl';


const hotkey = computed(() => {
  let key = (props.hotkey as string);
  let ctrl = false;
  if (key.toLowerCase().startsWith('ctrl+')) {
    ctrl = true;
    key = key.slice('ctrl+'.length);
  }
  return { key, ctrl };
});

</script>

<template>
  <ClientOnly>
    <span class="flex items-center ms-2 opacity-50">
      <span v-if="hotkey.ctrl">{{ commandButton }}+</span>
      <span>{{ hotkey.key }}</span>
    </span>
  </ClientOnly>
</template>
