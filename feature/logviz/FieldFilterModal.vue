<script setup lang="ts">
import { FieldFilterArgs, LogEntries } from './impl';
import { ICONS } from '~/const';

const props = defineProps({
  data: { type: Object, default: null },
  selected: { type: Object, default: null }
});
const emit = defineEmits(['select', 'close']);

const keys = ref<{ key: string; count: number }[]>([]);
const selectedKey = ref('');
const items = ref<{ value: string; count: number; selected: boolean }[]>([]);

const rebuildKeys = () => {
  const data = props.data as LogEntries;
  const m = new Map<string, number>();
  if (data) {
    for (const entry of data.items) {
      for (const field of entry.fields) {
        m.set(field.key, (m.get(field.key) ?? 0) + 1);
      }
    }
  }

  keys.value = Array.from(m.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => a.key.localeCompare(b.key));

  if (!keys.value.some((k) => k.key === selectedKey.value)) {
    const preselected = props.selected as FieldFilterArgs | null;
    selectedKey.value = preselected && keys.value.some((k) => k.key === preselected.key) ? preselected.key : (keys.value[0]?.key ?? '');
  }
};

const rebuildItems = () => {
  const data = props.data as LogEntries;
  if (!data || !selectedKey.value) {
    items.value = [];
    return;
  }

  const m = new Map<string, number>();
  for (const entry of data.items) {
    const value = entry.fields.find((f) => f.key === selectedKey.value)?.value;
    if (value === undefined) {
      continue;
    }

    m.set(value, (m.get(value) ?? 0) + 1);
  }

  const preselected = props.selected as FieldFilterArgs | null;
  const preselectedValues = preselected && preselected.key === selectedKey.value ? preselected.values : [];

  items.value = Array.from(m.entries())
    .map(([value, count]) => ({
      value,
      count,
      selected: preselectedValues.length === 0 ? true : preselectedValues.includes(value)
    }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};

effect(() => {
  rebuildKeys();
});
effect(() => {
  rebuildItems();
});

const selectKey = (key: string) => {
  selectedKey.value = key;
};

const onSubmit = () => {
  if (!selectedKey.value) {
    emit('select', null);
    emit('close');
    return;
  }

  const values = items.value.filter((item) => item.selected).map((item) => item.value);
  const result: FieldFilterArgs | null = values.length === 0 || values.length === items.value.length ? null : { key: selectedKey.value, values };

  emit('select', result);
  emit('close');
};

const selectAll = () => {
  for (const item of items.value) {
    item.selected = true;
  }

  onSubmit();
};

const selectNone = () => {
  for (const item of items.value) {
    item.selected = false;
  }

  onSubmit();
};
</script>

<template>
  <ModalContainer @close="emit('close')">
    <form class="flex flex-col w-full" @submit.prevent="onSubmit">
      <Hotkey hotkey="KeyA" @pressed="selectAll" />
      <Hotkey hotkey="Enter" @pressed="onSubmit" />
      <Hotkey hotkey="Escape" @pressed="emit('close')" />

      <div class="bg-white p-4">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Filter log entries by a field</h3>

        <div v-if="keys.length === 0" class="mt-2 text-gray-500">No structured fields were found in this input.</div>

        <div v-else class="mt-2">
          <div class="flex flex-row flex-wrap gap-1">
            <Button
              v-for="k in keys"
              :key="k.key"
              size="xs"
              :color="k.key === selectedKey ? 'default' : ''"
              class="min-w-24 grow"
              :class="{ 'opacity-50': k.key !== selectedKey }"
              @click="selectKey(k.key)"
            >
              {{ k.key }}
              <span class="rounded bg-cyan-900 text-white px-1 text-xs">{{ k.count }}</span>
            </Button>
          </div>

          <div class="flex flex-row gap-1 mt-2">
            <Button size="xs" class="min-w-32 grow" @click="selectAll">
              All values
              <HotkeyHint hotkey="A" />
            </Button>
            <Button size="xs" class="min-w-32 grow" @click="selectNone"> No values </Button>
          </div>

          <div class="flex flex-col mt-4 overflow-y-auto min-h-[200px] max-h-[200px]">
            <template v-for="item in items" :key="item.value">
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
                <div class="grow align-middle break-all">
                  {{ item.value }}
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
