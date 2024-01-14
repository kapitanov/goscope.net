<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ICONS } from '../../const';

defineProps({
  data: { type: Object, default: null }
});
const emit = defineEmits(['reset']);
</script>

<template>
  <form class="flex gap-2 mt-4 mb-2">
    <Button @click="emit('reset')">
      <Icon :name="ICONS.RESET" />
      <span>Try another stack trace</span>
    </Button>
    <button type="submit" style="display: none" />
  </form>

  <GoroutinesTable :data="data" />
</template>
