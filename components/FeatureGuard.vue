<script setup lang="ts">
const props = defineProps({
  feature: { type: String, default: '', required: true }
});
const enabled = useFeatureFlag(props.feature);
if (!enabled) {
  const router = useRouter();
  router.replace('/');
}
</script>
<template>
  <slot></slot>
</template>
