<script setup lang="ts">
/* eslint-disable no-console */
import { googleAnalyticsToken } from '../config';

const { gtag, initialize, disableAnalytics, enableAnalytics } = useGtag();
const router = useRouter();

const hasGoogleAnalyticsToken = googleAnalyticsToken !== undefined;

const enableScreen = useState<boolean>('google-analytics');
enableScreen.value = hasGoogleAnalyticsToken;

onMounted(() => {
  if (hasGoogleAnalyticsToken) {
    initialize(googleAnalyticsToken);
  }
});

const enableGoogleAnalytics = (enable: boolean) => {
  if (enable) {
    enableAnalytics(googleAnalyticsToken);
    console.log(`Google Analytics enabled (${googleAnalyticsToken})`);
  } else {
    disableAnalytics(googleAnalyticsToken);
    console.log('Google Analytics disabled');
  }

  enableScreen.value = false;
};

router.afterEach(() => {
  gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: router.currentRoute.value.path,
    page_title: document.title
  });
});
</script>
<template>
  <GdprConsentScreen :enable="enableScreen" @accepted="enableGoogleAnalytics(true)" @declined="enableGoogleAnalytics(false)">
    <slot></slot>
  </GdprConsentScreen>
</template>
