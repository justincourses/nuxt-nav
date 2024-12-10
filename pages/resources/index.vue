<template>
  <div class="max-w-4xl mx-auto pt-8">
    <CommonSectionhead class="mb-12">
      <template v-slot:title>合作伙伴</template>
      <template v-slot:desc>我们与众多优秀的企业和组织建立了长期稳定的合作关系，共同为用户提供更好的服务</template>
    </CommonSectionhead>

    <masonry-wall
      :items="displayedItems"
      :column-width="180"
      :max-columns="3"
      :gap="24"
      :padding="24"
      @append="handleAppend"
    >
      <template #default="{ item }">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
          <div class="relative w-full aspect-square">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>

          <div class="p-4">
            <div class="flex items-center gap-2 mb-3">
              <NuxtLink :to="item.url" class="text-xl font-bold hover:text-sky-600 dark:hover:text-sky-400">
                {{ item.title }}
              </NuxtLink>
            </div>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ item.summary }}
            </p>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
              <span
                class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">
                {{ item.category }}
              </span>
            </p>
          </div>
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'resources',
  ssr: false
})

usePageTitle('合作伙伴', '展示我们的合作伙伴和他们的成功案例，了解如何通过合作实现共赢');

const itemsPerPage = 6
const displayedItems = ref<any[]>([])
const listData = ref<any[]>([])
const currentIndex = ref(0)

// 添加滚动监听
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = window.innerHeight || document.documentElement.clientHeight

  // 当滚动到底部时触发加载
  if (scrollHeight - scrollTop <= clientHeight + 100) { // 提前100px触发加载
    handleAppend()
  }
}

// 在组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 在组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleAppend = () => {
  if (currentIndex.value >= listData.value.length) return

  const nextItems = listData.value.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage
  )
  // Instead of pushing to array, create a new array with all items
  displayedItems.value = [...displayedItems.value, ...nextItems]
  currentIndex.value += itemsPerPage
}

// 使用 queryContent 直接获取数据
const { data } = await useAsyncData('resources', () =>
  queryContent('resources').find()
)

// 监听数据变化
watch(() => data.value, (newData) => {
  if (newData && newData.length > 0) {
    listData.value = [...newData] // Create new array
    currentIndex.value = 0
    displayedItems.value = [] // Reset displayed items
    handleAppend()
  }
}, { immediate: true })
</script>
