<template>
  <div class="max-w-4xl mx-auto pt-8">
    <ContentDoc v-slot="{ doc }">
      <article class="prose dark:prose-invert max-w-none">
        <div class="overflow-hidden">
          <img v-if="doc.image" :src="doc.image" :alt="doc.title"
            class="w-full h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105 mb-8 mt-0" />
        </div>
        <div class="flex justify-center">
          <nav aria-label="Breadcrumb">
            <UBreadcrumb :links="breadcrumbLinks(doc?.title ?? '')" divider="i-heroicons-chevron-right"
              class="text-sm text-gray-500 dark:text-gray-400 mb-8" />
          </nav>
        </div>
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-0">Q:
            {{ doc.title }}</h1>
            <span
              class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">{{
              doc.category }}</span>
          </div>
        </div>
        <div class="px-4 bg-white/90 dark:bg-gray-900/90 rounded-lg border border-sky-100 dark:border-sky-500/30 mb-8 shadow-sm">
          <p class="text-gray-800 dark:text-gray-200">
            <span class="font-medium text-sky-600 dark:text-sky-400">A: </span>{{ doc.summary }}
          </p>
        </div>
        <ContentRenderer :value="doc" />
        <div class="flex flex-wrap gap-2 mt-8">
          <span v-for="tag in doc.tags" :key="tag"
            class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors duration-200">
            #{{ tag }}
          </span>
        </div>
      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cms'
})

const breadcrumbLinks = (currentTitle: string) => [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '问答 FAQ',
    icon: 'i-heroicons-question-mark-circle',
    to: '/faq'
  },
  {
    label: currentTitle,
    icon: 'i-heroicons-document-text'
  }
]

const { data: doc } = await useAsyncData('doc', () => queryContent().where({ _path: useRoute().path }).findOne())
usePageTitle(doc.value?.title, doc.value?.summary);
</script>
