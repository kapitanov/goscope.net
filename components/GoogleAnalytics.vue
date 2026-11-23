<script setup lang="ts">
import { googleAnalyticsToken } from '../config';

const { gtag, initialize, disableAnalytics, enableAnalytics } = useGtag();
const router = useRouter();

const hasGoogleAnalyticsToken = !!googleAnalyticsToken;
const analyticsEnabled = ref(false);

const enableScreen = useState<boolean>('google-analytics');
enableScreen.value = hasGoogleAnalyticsToken;

const enableGoogleAnalytics = (enable: boolean) => {
  if (!hasGoogleAnalyticsToken) {
    enableScreen.value = false;
    return;
  }

  if (enable) {
    initialize(googleAnalyticsToken);
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    enableAnalytics(googleAnalyticsToken);
    analyticsEnabled.value = true;
  } else {
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    disableAnalytics(googleAnalyticsToken);
    analyticsEnabled.value = false;
  }

  enableScreen.value = false;
};

if (import.meta.client) {
  router.afterEach(() => {
    if (!analyticsEnabled.value) {
      return;
    }

    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: router.currentRoute.value.path,
      page_title: document.title
    });
  });
}
</script>
<template>
  <GdprConsentScreen :enable="enableScreen" @accepted="enableGoogleAnalytics(true)" @declined="enableGoogleAnalytics(false)">
    <slot></slot>
  </GdprConsentScreen>
</template>
