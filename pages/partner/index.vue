<template>
  <div class="max-w-4xl mx-auto pt-8">
    <CommonSectionhead class="mb-12">
      <template v-slot:title>赞助</template>
      <template v-slot:desc>我们与众多优秀的企业和组织建立了长期稳定的合作关系，共同为用户提供更好的服务</template>
    </CommonSectionhead>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      <div
        v-for="item in partners"
        :key="item._path || item.url"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
      >
        <NuxtLink :to="item._path || item.url" class="block relative w-full aspect-square overflow-hidden">
          <img :src="item.image" :alt="item.title" loading="lazy" class="w-full h-full object-cover" />
        </NuxtLink>

        <div class="p-4 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <NuxtLink :to="item._path || item.url" class="text-xl font-bold hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              {{ item.title }}
            </NuxtLink>
          </div>

          <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ item.summary }}
          </p>

          <p class="text-gray-600 dark:text-gray-400 line-clamp-2 mt-auto pt-3">
            <span
              class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">
              {{ item.category }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'partner'
})

usePageTitle('合作伙伴', '展示我们的合作伙伴和他们的成功案例，了解如何通过合作实现共赢');

const { data: partners } = await useAsyncData('partners', () =>
  queryContent('partner').find()
)
</script>
