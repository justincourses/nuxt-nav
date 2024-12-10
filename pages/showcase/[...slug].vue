<template>
  <div class="max-w-4xl mx-auto pt-8">
    <ContentDoc v-slot="{ doc }">
      <article class="prose dark:prose-invert max-w-none">
        <div class="flex justify-center">
          <nav aria-label="Breadcrumb">
            <UBreadcrumb :links="breadcrumbLinks(doc?.title ?? '')" divider="i-heroicons-chevron-right"
              class="text-sm text-gray-500 dark:text-gray-400 mb-8" />
          </nav>
        </div>
        <div class="bg-gradient-to-r from-blue-700 to-[#B06AB3] font-sans mb-8 rounded-lg overflow-hidden">
          <div class="relative h-[400px] w-full">
            <img v-if="doc.image" :src="doc.image" :alt="doc.title"
              class="w-full h-full mt-0 object-cover transition-transform duration-300 hover:scale-105" />
          </div>

          <div class="container mx-auto flex flex-col justify-center items-center text-center px-6 py-12">
            <div class="flex items-center gap-4 mb-4">
              <h1 class="text-white sm:text-4xl text-3xl font-bold m-0 first-letter:uppercase">{{ doc.author }}'s page</h1>
              <span class="text-sm rounded-full bg-white/20 px-3 py-1 text-white first-letter:uppercase">{{ doc.category }}</span>
            </div>
            <p class="text-white/90 text-base text-center mb-8">{{ doc.summary }}</p>

            <a :href="doc.siteurl" target="_blank" rel="noopener noreferrer"
              class="bg-white text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100 transition-colors duration-200 no-underline"
              aria-label="Visit site">
              立即访问
            </a>
          </div>
        </div>
      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'showcase'
})

const breadcrumbLinks = (currentTitle: string) => [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '学员作品 Showcase',
    icon: 'i-heroicons-photo',
    to: '/showcase'
  },
  {
    label: currentTitle,
    icon: 'i-heroicons-document-text'
  }
]

const { data: doc } = await useAsyncData('doc', () => queryContent().where({ _path: useRoute().path }).findOne())
usePageTitle(doc.value?.title, doc.value?.summary);
</script>
