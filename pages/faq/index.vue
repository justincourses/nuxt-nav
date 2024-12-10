<template>
  <div class="max-w-4xl mx-auto pt-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">常见问题</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">这里收集了大家经常遇到的问题和解答，希望能帮助到您</p>
    </div>

    <ContentList path="/faq" v-slot="{ list }">
      <div class="grid gap-6">
        <div v-for="item in list" :key="item._path" class="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="flex flex-row">
            <div class="relative w-48 h-48 shrink-0">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="flex-1 p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">
                  {{ item.category }}
                </span>
                <NuxtLink :to="item.url" class="text-xl font-bold hover:text-sky-600 dark:hover:text-sky-400">
                  {{ item.title }}
                </NuxtLink>
              </div>

              <p class="text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[3rem] mb-4">
                {{ item.summary }}
              </p>

              <div class="flex justify-between items-end">
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in item.tags" :key="tag" class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">
                    #{{ tag }}
                  </span>
                </div>
                <NuxtLink
                  :to="item.url"
                  class="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
                  aria-label="查看更多"
                  tabindex="0"
                >
                  <span class="inline-block align-middle">
                    查看更多
                    <Icon name="heroicons:chevron-right" class="inline-block w-4 h-4 align-text-bottom" />
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cms'
})

usePageTitle('常见问题', '解答学员常见问题，涵盖课程内容、学习方法、技术支持等各个方面');
</script>
