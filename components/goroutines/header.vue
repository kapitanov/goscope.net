<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="flex items-center mb-4">
    <div class="flex gap-2 lg:items-end lg:flex-row flex-col">
      <h1 class="md:text-2xl text-xl font-semibold">Goroutines viewer</h1>
      <div class="text-gray-500 text-balance break-all">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
