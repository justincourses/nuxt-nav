<template>
  <div class="relative min-h-screen">
    <NuxtLayout>
      <NuxtPage />
      <Toast ref="toastRef" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const toastRef = ref();
const { setToastRef } = useToast();

onMounted(() => {
  setToastRef(toastRef.value);
});
</script>
