<script setup lang="ts">
import { GoroutineProfile } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  selected: { type: Array, default: null }
});
const emit = defineEmits(['select', 'close']);
const items = ref([]);
const rebuildItems = () => {
  const data = props.data as GoroutineProfile;
  if (!data) {
    items.value = [];
    return;
  }

  const m = new Map<string, number>();
  for (const goroutine of data.items) {
    m.set(goroutine.state, m.get(goroutine.state) ?? 0 + 1);
  }

  items.value = Array.from(m.entries())
    .map(([state, count]) => {
      let selected = true;
      if (props.selected && props.selected.length > 0) {
        selected = props.selected.includes(state);
      }
      return {
        state,
        count,
        selected
      };
    })
    .sort((a, b) => a.state.localeCompare(b.state));
};
watch(() => props.data, rebuildItems);
watch(() => props.selected, rebuildItems);
effect(() => {
  rebuildItems();
});

const onSubmit = () => {
  let result = [];
  for (const item of items.value) {
    if (item.selected) {
      result.push(item.state);
    }
  }

  if (result.length === items.value.length) {
    result = [];
  }

  emit('select', result);
  emit('close');
};

const selectAll = () => {
  for (const item of items.value) {
    item.selected = true;
  }

  onSubmit();
};

const selectRunnable = () => {
  for (const item of items.value) {
    item.selected = item.state === 'runnable' || item.state === 'running';
  }

  onSubmit();
};

const selectNonRunnable = () => {
  for (const item of items.value) {
    item.selected = item.state !== 'runnable' && item.state !== 'running';
  }

  onSubmit();
};
</script>

<template>
  <ModalContainer @close="emit('close')">
    <form class="flex flex-col w-full" @submit.prevent="onSubmit">
      <Hotkey hotkey="KeyA" @pressed="selectAll" />
      <Hotkey hotkey="KeyR" @pressed="selectRunnable" />
      <Hotkey hotkey="KeyN" @pressed="selectNonRunnable" />
      <Hotkey hotkey="Enter" @pressed="onSubmit" />
      <Hotkey hotkey="Escape" @pressed="emit('close')" />

      <div class="bg-white p-4">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Filter goroutines by their state</h3>
        <div class="mt-2">
          <div class="flex flex-row gap-1">
            <Button size="xs" class="min-w-32 grow" @click="selectAll">
              All
              <HotkeyHint hotkey="A" />
            </Button>
            <Button size="xs" class="min-w-32 grow" @click="selectRunnable">
              Runnable only
              <HotkeyHint hotkey="R" />
            </Button>
            <Button size="xs" class="min-w-32 grow" @click="selectNonRunnable">
              Non-runnable only
              <HotkeyHint hotkey="N" />
            </Button>
          </div>
          <div class="flex flex-col mt-4 overflow-y-auto min-h-[250px] max-h-[250px]">
            <template v-for="item in items" :key="item.state">
              <div
                class="flex flex-row rounded border border-1 border-white p-1 mb-1 cursor-pointer hover:border-cyan-600"
                @click="
                  () => {
                    item.selected = !item.selected;
                  }
                "
              >
                <div class="me-1 align-middle">
                  <Icon v-if="item.selected" :name="ICONS.CHECK_SQUARE" />
                  <Icon v-if="!item.selected" :name="ICONS.SQUARE" />
                </div>
                <div class="grow align-middle">
                  {{ item.state }}
                </div>
                <div class="rounded bg-cyan-700 text-white p-1 text-xs align-middle min-w-8 text-center">
                  {{ item.count }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 p-4 flex">
        <div class="grow"></div>
        <Button type="submit" size="sm" class="min-w-32 ms-1 h-full">
          <Icon :name="ICONS.CHECK" /> OK
          <HotkeyHint hotkey="Enter" />
        </Button>
        <Button size="sm" class="min-w-32 ms-1 h-full" @click="emit('close')">
          <Icon :name="ICONS.X" /> Cancel
          <HotkeyHint hotkey="Escape" />
        </Button>
      </div>
    </form>
  </ModalContainer>
</template>
