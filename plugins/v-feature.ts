import { isFeatureEnabled } from '../composables/useFeatureFlag';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('feature', {
    beforeMount(_, binding, vnode) {
      const feature = binding.value;
      if (!isFeatureEnabled(feature)) {
        vnode.el.hidden = true;
      }
    }
  });
});
