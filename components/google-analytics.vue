<script setup lang="ts">
import { googleAnalyticsToken } from '../config';

const { gtag, setConsent } = useGtag();
const router = useRouter();

const hasGoogleAnalyticsToken = googleAnalyticsToken !== undefined;

const enableScreen = useState<boolean>('google-analytics');
enableScreen.value = hasGoogleAnalyticsToken;

const enableGoogleAnalytics = (enable: boolean) => {
    if (hasGoogleAnalyticsToken && enable) {
        setConsent({ id: googleAnalyticsToken, hasConsent: true });
        console.log(`Google Analytics enabled (${googleAnalyticsToken})`); /* eslint-disable-line no-console */
    } else {
        setConsent({ id: googleAnalyticsToken, hasConsent: false });
        console.log('Google Analytics disabled');  /* eslint-disable-line no-console */
    }

    enableScreen.value = false;
};

router.afterEach(() => {
    gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: router.currentRoute.value.path,
        page_title: document.title,
    });
});
</script>
<template>
    <GdprConsentScreen :enable="enableScreen" @accepted="enableGoogleAnalytics(true)"
        @declined="enableGoogleAnalytics(false)">
        <slot></slot>
    </GdprConsentScreen>
</template>
