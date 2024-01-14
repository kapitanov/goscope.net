<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { GITHUB_URL, ICONS } from '../const';
const year = new Date(Date.now()).getFullYear();
</script>

<template>
  <div class="border-t-2 pt-4">
    <div class="flex text-sm">
      <div class="w-6/12 flex justify-start">
        <span class="text-gray-800 flex items-center place-items-center gap-1">
          <Icon :name="ICONS.COPYRIGHT" />
          <span>{{ year }}</span>
          <span>by Albert Kapitanov</span>
        </span>
      </div>
      <div class="w-6/12 flex justify-end">
        <FooterLink :href="GITHUB_URL" target="_blank">
          <Icon :name="ICONS.GITHUB" />
          View on GitHub
        </FooterLink>
      </div>
    </div>
  </div>
</template>
