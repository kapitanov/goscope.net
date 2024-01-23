<script setup lang="ts">
import { GoroutineProfile } from '~/pprof/goroutines/parser';
import { fetch } from '~/pprof/goroutines/fetcher';

const router = useRouter();
const props = defineProps({
    url: { type: String, default: '' }
});
const busy = ref<boolean>(true);
const error = ref<any | null>(null);
const data = ref<GoroutineProfile | null>(null);

onMounted(async () => {
    busy.value = true;
    error.value = null;

    try {
        data.value = await fetch(props.url);
    } catch (err: any) {
        error.value = err;
    } finally {
        busy.value = false;
    }
});

const onReset = () => {
    router.push('/goroutines');
};
</script>
<template>
    <div>
        <div v-if="data" class="flex items-center mb-4">
            <div class="flex gap-2 items-bottom">
                <h1 class="text-3xl sm:text-xl font-semibold">Goroutines viewer</h1>
                <span class="text-gray-500 px-2 py-1">
                    Displaying data from <span class="font-mono">{{ props.url }}</span>
                </span>
            </div>
        </div>

        <GoroutinesViewer v-if="data" :data="data" @reset="onReset" />

        <ErrorPresenter :error="error" />

        <div v-if="busy" class="flex items-center justify-center">
            <Spinner />
        </div>
    </div>
</template>