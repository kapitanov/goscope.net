<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ICONS } from '../const';
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <div class="mb-4 bg-cyan-900 rounded">
      <div class="flex flex-col text-center mb-4">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-100">
          <Icon :name="ICONS.GOLANG" size="2em" /> scope
        </h1>
        <h2 class="text-2xl sm:text-4xl font-bold text-gray-100">
          Let's explore your Go programs!
        </h2>
        <div class="mt-6 text-lg text-gray-300">
          This is a collection of interactive visualizations to help you
          understand how your Go programs work.
        </div>
      </div>
    </div>

    <HeroBlock
      image-src="/img/goroutines-preview.png"
      title-text="Goroutines viewer"
      button-text="Explore goroutines"
      href="/goroutines"
    >
      <div>
        Dig into goroutines of your program:

        <ul class="list-disc ms-8">
          <li>View all goroutines at glance</li>
          <li>Find out state of each goroutine</li>
          <li>Idendify a goroutine by its stack trace</li>
        </ul>
      </div>
    </HeroBlock>
  </div>
</template>
