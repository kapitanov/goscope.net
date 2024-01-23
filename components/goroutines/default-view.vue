<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { GoroutineProfile } from '~/pprof/goroutines/parser';

const data = ref<GoroutineProfile | null>(null);

const onData = (value: GoroutineProfile) => {
  data.value = value;
};

const onReset = () => {
  data.value = null;
};

const activeTab = ref<string>('text');
const onSelectTab = (tab: string) => {
  activeTab.value = tab;
};
</script>
<template>
  <div>
    <div class="flex flex-col md:flex-row items-start md:items-center mb-4 gap-4">
      <div class="flex">
        <h1 class="text-3xl sm:text-xl font-semibold">Goroutines viewer</h1>
        <span v-if="data?.url" class="text-gray-500 px-2 py-1">
          Displaying data from <span class="font-mono">{{ data.url }}</span>
        </span>
        <span v-if="data?.text" class="text-gray-500 px-2 py-1">
          Displaying data from manually entered text
        </span>
      </div>

      <TabBar v-if="!data" class="grow " :active="activeTab" @select="onSelectTab">
        <TabItem name="text">
          From Text
        </TabItem>
        <TabItem name="url">
          From URL
        </TabItem>
      </TabBar>
    </div>


    <div v-if="!data">
      <div class="mt-4">
        <strong>Goroutines viewer</strong> is a tool to view all goroutines in your
        application at once. It takes a snapshot of all goroutines (taken from
        PPROF) and displays them in a table form, allowing you to filter it and view
        goroutines state at glance.
      </div>

      <div class="mt-4">
        <GoroutinesAbout />
      </div>

      <div class="mt-4">
        <GoroutinesTextInput v-if="activeTab === 'text'" @data="onData" />
        <GoroutinesUrlInput v-if="activeTab === 'url'" @data="onData" />
      </div>
    </div>

    <GoroutinesViewer v-if="data" :data="data" @reset="onReset" />
  </div>
</template>
