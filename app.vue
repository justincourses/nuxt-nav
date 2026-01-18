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

const toastRef = ref();
const { setToastRef } = useCustomToast();

onMounted(() => {
  setToastRef(toastRef.value);
});
</script>
