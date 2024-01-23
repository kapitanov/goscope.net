<script setup lang="ts">
const props = defineProps({
    enable: { type: Boolean, default: false, required: true },
});
const emit = defineEmits(['accepted', 'declined']);
const show = ref<boolean>(false);

const resolve = (accepted: boolean) => {
    if (process.client) {
        localStorage.setItem('gdpr-consent', accepted.toString());
    }

    if (accepted) {
        emit('accepted');
    } else {
        emit('declined');
    }

    show.value = false;
};

const accept = () => resolve(true);
const decline = () => resolve(false);

if (props.enable) {
    const storedValue = (process.client && localStorage.getItem('gdpr-consent')) || null;
    if (storedValue !== null) {
        resolve(storedValue === 'true');
    } else {
        nextTick(() => {
            show.value = true;
        });
    }
}
</script>
<template>
    <ClientOnly>
        <div v-if="show">
            <slot></slot>
            <div class="fixed bottom-0 left-0 top-0 right-0 z-10 bg-white/50"> </div>
            <div
                class="z-20 sticky bottom-0 left-0 right-0 border-t border-white bg-cyan-900 text-white p-8 flex flex-col md:flex-row">
                <div class="grow flex flex-col">
                    <h1 class="text-2xl font-bold">
                        Cookies
                    </h1>
                    <p>
                        We use our own cookies and third-party cookies so that we can display this website correctly and
                        better
                        understand how this website is used, with a view to improving the services we offer.
                    </p>
                </div>
                <div class="flex gap-1 items-end mt-2 md:mt-0 md:ms-2">
                    <Button @click="accept">Accept</Button>
                    <Button @click="decline">Decline</Button>
                </div>
            </div>
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </ClientOnly>
</template>
