<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import * as C from '../const';
useHead({ ...C.HEAD, title: C.APP_NAME });

const isModalOpen = ref(false);

class ModalOverlay {
  constructor() {
    this.modal = null;
  }

  show(modal) {
    this.modal = modal;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
  }

  click() {
    this.modal?.closed();
  }

  hide() {
    isModalOpen.value = false;
    document.body.style.overflow = 'initial';
    this.modal = null;
  }
}
const modalOverlay = new ModalOverlay();
provide('ModalOverlay', modalOverlay);
</script>
<template>
  <NuxtErrorBoundary>
    <template #error="{ error }">
      <ErrorPresenter :error="error" />
    </template>

    <GoogleAnalytics>
      <header class="sticky top-0 w-full h-16 border-b border-gray-500 bg-white px-8 mb-8 z-10">
        <PageHeader />
      </header>

      <main>
        <section class="px-8 pb-8 min-h-[100vh]">
          <NuxtPage />
        </section>

        <footer class="w-100 px-8 pb-8">
          <PageFooter />
        </footer>

        <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity z-20"
          @click="
            () => {
              modalOverlay.click();
            }
          "
        ></div>
      </main>
    </GoogleAnalytics>
  </NuxtErrorBoundary>
</template>
