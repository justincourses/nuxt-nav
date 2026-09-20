<script setup lang="ts">
const excludedPartners = ['请咖啡', 'Rewardful', 'Temu', '长桥证券', 'Fiverr', 'Quick Fox', 'quickfox']

const { data: partners } = await useAsyncData('landing-partners', () => queryContent('partner').skip(0)
  .where({ tags: { $not: { $contains: '小报童' } } })
  .find()
)

const filteredPartners = computed(() => {
  return partners.value?.filter(partner => {
    const title = partner.title?.trim()
    return !excludedPartners.some(excluded => excluded.toLowerCase() === title?.toLowerCase())
  }) || []
})
</script>

<template>
  <div class="partner-section my-20">
    <h2 class="text-xl font-bold text-slate-500 hover:text-slate-600 dark:hover:text-sky-400 transition-colors text-center"
      title="查看更多合作伙伴">
      <NuxtLink to="/partner">
        赞助
      </NuxtLink>
    </h2>
    <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
      <a
        v-for="partner in filteredPartners"
        :key="partner._id"
        :href="partner.ref"
        :title="partner.summary"
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 rounded-full bg-gray-100 text-slate-500 hover:bg-gray-200 hover:text-slate-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-sky-400 transition-colors w-full text-center truncate block"
      >
        {{ partner.title }}
      </a>
    </div>
  </div>
</template>
