<!-- eslint-disable vue/valid-template-root -->

<script setup lang="ts">
const config = useRuntimeConfig();

onMounted(() => {
    const token = config.public.cloudflareWebAnalyticsToken;
    if (!token) {
        return;
    }

    const beaconData = JSON.stringify({ token, spa: true });
    const scriptUrl = 'https://static.cloudflareinsights.com/beacon.min.js';

    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', scriptUrl);
    scriptElement.setAttribute('data-cf-beacon', beaconData);
    scriptElement.setAttribute('defer', '');
    document.body.appendChild(scriptElement);
});
</script>

<template></template>
