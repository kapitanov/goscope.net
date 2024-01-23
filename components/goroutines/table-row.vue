<script setup lang="ts">
interface TableControl {
  onExpand(handler: () => void): void;
  onCollapse(handler: () => void): void;
};

defineProps({
  item: { type: Object, default: null }
});
const expanded = ref(false);
const tableControl = inject<TableControl>('TableControl');
if (tableControl) {
  tableControl.onExpand(() => expanded.value = true);
  tableControl.onCollapse(() => expanded.value = false);
}

const toggleHandler = () => {
  expanded.value = !expanded.value;
};
</script>
<template>
  <tr>
    <td class="px-2 py-1 font-mono">
      {{ item.id }}
    </td>
    <td class="px-2 py-1 font-mono text-nowrap">
      {{ item.state }}
    </td>
    <td class="px-2 py-1 font-mono" :title="item.stack[0].file">
      <a href="" class="hover:text-cyan-700 hover:underline decoration-cyan-700" @click.prevent="toggleHandler">
        {{ item.stack[0].function }}
      </a>
    </td>
  </tr>
  <tr :style="{ visibility: expanded ? 'visible' : 'collapse' }">
    <td />
    <td />
    <td class="px-2 pb-1 font-mono">
      <ul class="border-s-2 border-cyan-900">
        <li v-for="frame in item.stack" :key="frame.id" class="flex flex-col ms-2">
          <span class="text-cyan-900">
            {{ frame.function }}
          </span>
          <span class="ms-4">
            {{ frame.file }}:{{ frame.line }} {{ frame.offset }}
          </span>
        </li>
      </ul>
    </td>
  </tr>
</template>
