<template>
  <div class="relative min-h-screen flex flex-col">
    <CommonNavbar />
    <main class="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
      <p class="text-6xl font-extrabold text-slate-800 dark:text-slate-100">{{ error.statusCode }}</p>
      <p class="mt-4 text-lg text-slate-500 dark:text-slate-400">
        {{ is404 ? '你访问的页面不存在' : '页面出错了，请稍后再试' }}
      </p>
      <div class="mt-8 flex gap-4">
        <UButton color="sky" @click="handleError({ redirect: '/' })">返回首页</UButton>
        <UButton color="gray" variant="soft" @click="handleError({ redirect: '/resources' })">学习资源</UButton>
      </div>
    </main>
    <CommonFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: is404.value ? '页面不存在 | Web 开发课程资源' : '出错了 | Web 开发课程资源',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const handleError = (options: { redirect: string }) => clearError(options)
</script>
