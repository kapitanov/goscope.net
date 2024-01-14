<script setup lang="ts">
const props = defineProps({
  placeholder: { type: String, default: '' },
  type: { type: String, default: '' }
});

const inputClass = {
  'bg-white': true,
  rounded: true,
  'hover:outline-cyan-700': true,
  'focus:outline-cyan-700': true,
  'px-2': true,
  'py-1': true
};
</script>

<template>
  <div>
    <input v-if="!type || type == 'inline'" type="text" :placeholder="props.placeholder" :class="inputClass">
    <input v-if="type == 'wide'" type="text" :placeholder="props.placeholder" :class="{ 'w-full': true, ...inputClass }">

    <textarea v-if="type === 'textarea'" :placeholder="props.placeholder"
      :class="{ 'w-full': true, 'h-64': true, ...inputClass }" />
  </div>
</template>
