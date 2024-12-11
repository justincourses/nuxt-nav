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
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-indigo-600 dark:text-sky-400 text-xl font-semibold drop-shadow-[0_0_8px_rgba(99,102,241,0.3)] dark:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)] hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{{ resource.title }}</h3>
              <span class="text-xs text-emerald-500 dark:text-emerald-400 mr-2 drop-shadow-[0_0_6px_rgba(16,185,129,0.3)] dark:drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">{{ resource.category }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ resource.summary }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
