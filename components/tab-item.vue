<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: '' }
});

const activeTab = inject<string>('activeTab');

const selectTab = inject<(tab: string) => void>('selectTab');
const onClick = () => {
  selectTab && selectTab(props.name);
};

const activeClass = {
  'text-xl': true,
  'text-cyan-700': true,
  'border-b-2': true,
  'border-cyan-700': true
};
const inactiveClass = {
  'text-xl': true,
  'text-black': true,
  'hover:text-cyan-700': true
};
</script>
<template>
  <li>
    <a
      href=""
      :class="activeTab === props.name ? activeClass : inactiveClass"
      @click.prevent="onClick"
    >
      <slot></slot>
    </a>
  </li>
</template>
