<template>
  <div class="relative min-h-screen">
    <NuxtLayout>
      <NuxtPage />
      <Toast ref="toastRef" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCustomToast } from '~/composables/useCustomToast';

// Self-referencing canonical + og:url / twitter:url for every page (query and hash dropped).
const route = useRoute();
const siteUrl = useSiteConfig().url.replace(/\/+$/, '');
const canonicalUrl = computed(() => {
  const path = route.path.replace(/\/+$/, '');
  return `${siteUrl}${path}`.replace(/^(https?:\/\/[^/]+)$/, '$1/');
});
useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { property: 'og:url', content: canonicalUrl },
    { property: 'twitter:url', content: canonicalUrl },
  ],
});

const toastRef = ref();
const { setToastRef } = useCustomToast();

onMounted(() => {
  setToastRef(toastRef.value);
});
</script>
