<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Header from './Header.vue';
import About from './About.vue';
import Viewer from './Viewer.vue';
import TextInput from './TextInput.vue';
import UrlInput from './UrlInput.vue';
import { GoroutineProfile } from './impl';

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
    <Header>
      <span v-if="data?.url">
        Displaying data from <span class="font-mono">{{ data.url }}</span>
      </span>
      <span v-if="data?.text"> Displaying data from manually entered text </span>
      <TabBar v-if="!data" class="grow" :active="activeTab" @select="onSelectTab">
        <TabItem name="text"> From Text </TabItem>
        <TabItem name="url"> From URL </TabItem>
      </TabBar>
    </Header>

    <div v-if="!data">
      <div class="mt-4">
        <strong>Goroutines viewer</strong> is a tool to view all goroutines in your application at once. It takes a snapshot of all goroutines (taken
        from PPROF) and displays them in a table form, allowing you to filter it and view goroutines state at glance.
      </div>

      <div class="mt-4">
        <About />
      </div>

      <div class="mt-4">
        <TextInput v-if="activeTab === 'text'" @data="onData" />
        <UrlInput v-if="activeTab === 'url'" @data="onData" />
      </div>
    </div>

    <Viewer v-if="data" :data="data" @reset="onReset" />
  </div>
</template>
