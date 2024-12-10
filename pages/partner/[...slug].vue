<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="max-w-4xl mx-auto pt-8">
      <ContentDoc v-slot="{ doc }">
        <div class="flex justify-center">
          <nav aria-label="Breadcrumb">
            <UBreadcrumb :links="breadcrumbLinks(doc?.title ?? '')" divider="i-heroicons-chevron-right"
              class="text-sm text-gray-500 dark:text-gray-400 mb-8" />
          </nav>
        </div>

        <!-- Hero Section -->
        <div class="relative bg-gradient-to-r from-purple-900 to-indigo-800 py-16 font-[sans-serif] rounded-xl overflow-hidden">
          <div class="absolute inset-0">
            <img v-if="doc.image" :src="doc.image" :alt="doc.title" class="w-full h-full object-cover opacity-50" />
          </div>

          <div class="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
            <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
              {{ doc.title }}

            </h1>
            <small v-if="doc.category" class="inline-block text-indigo-300 text-sm my-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-300/30">{{ doc.category }}</small>
            <p class="text-lg md:text-xl mb-12 text-gray-200">{{ doc.summary }}</p>
            <a :href="doc.ref" target="_blank" rel="noopener noreferrer"
              class="inline-block bg-white/70 text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100/70 transition-colors duration-200 no-underline"
              aria-label="在新窗口中了解更多" tabindex="0">
              立即访问
            </a>
          </div>
        </div>

        <!-- Content Section -->
        <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg mt-8 shadow-sm">
          <article class="prose dark:prose-invert max-w-none">
            <!-- 内容正文 -->
            <ContentRenderer :value="doc" />

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mt-8">
              <span v-for="tag in doc.tags" :key="tag"
                class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors duration-200">
                #{{ tag }}
              </span>
            </div>
          </article>
        </div>
      </ContentDoc>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'partner'
})

const breadcrumbLinks = (currentTitle: string) => [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '合作伙伴',
    icon: 'i-heroicons-users',
    to: '/partner'
  },
  {
    label: currentTitle,
    icon: 'i-heroicons-document-text'
  }
]

const { data: doc } = await useAsyncData('doc', () => queryContent().where({ _path: useRoute().path }).findOne())
usePageTitle(doc.value?.title, doc.value?.summary);
</script>
