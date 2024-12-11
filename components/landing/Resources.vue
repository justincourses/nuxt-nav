<script setup lang="ts">
const { data: rsources } = await useAsyncData('rsources', () => queryContent('resources')
  .find()
)
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 px-4 py-12 font-[sans-serif]">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-500 hover:text-slate-600 dark:hover:text-sky-400 transition-colors text-center mb-16"
        title="查看更多学习资源">
        <NuxtLink to="/resources">
          学习资源
        </NuxtLink>
      </h2>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-8" v-if="rsources">
        <a
          v-for="resource in rsources"
          :key="resource._id"
          :href="resource.url"
          :title="resource.summary"
          class="p-6 flex gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 p-3 rounded-md shrink-0">
            <Icon :name="resource.icon?.toLowerCase()" class="w-full h-full" />
          </div>
          <div>
            <h3 class="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-3">{{ resource.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ resource.summary }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
