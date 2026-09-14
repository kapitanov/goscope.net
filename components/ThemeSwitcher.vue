<script setup lang="ts">
import * as C from '../const';

const ICONS = C.ICONS;

const colorMode = useColorMode();

const NEXT_PREFERENCE: Record<string, 'light' | 'dark' | 'system'> = {
  light: 'dark',
  dark: 'system',
  system: 'light'
};

const icon = computed(() => {
  switch (colorMode.preference) {
    case 'light':
      return ICONS.THEME_LIGHT;
    case 'dark':
      return ICONS.THEME_DARK;
    default:
      return ICONS.THEME_AUTO;
  }
});

const label = computed(() => `Theme: ${colorMode.preference} (click to switch)`);

const cycle = () => {
  colorMode.preference = NEXT_PREFERENCE[colorMode.preference] || 'light';
};
</script>

<template>
  <CircleButton :title="label" @click="cycle">
    <Icon :name="icon" />
  </CircleButton>
</template>
