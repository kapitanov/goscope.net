<script setup>
import * as C from '../const';
const ICONS = C.ICONS;
</script>

<template>
    <nav class="flex items-center justify-between">
        <div class="flex flex-1">
            <a href="/" class="flex gap-x-2 items-center text-3xl sm:text-2xl">
                <img class="h-8 w-auto" src="~/assets/img/logo.svg" alt="">
                <span class="text-foreground">{{ C.APP_NAME }}</span>
            </a>
        </div>
        <div class="flex gap-x-12 justify-end">
            <a :href="C.GITHUB_URL" class="w-12 h-12 rounded-full flex items-center place-items-center text-cyan-800 hover:bg-cyan-800 hover:text-white" target="_blank">
                <span class="text-3xl sm:text-2xl font-semibold leading-6 flex-1 text-center">
                    <Icon :name="ICONS.GITHUB" />
                </span>
            </a>
        </div>
    </nav>
</template>