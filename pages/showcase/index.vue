<template>
  <div class="max-w-4xl mx-auto pt-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">学员作品</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">展示我们优秀学员的项目作品和实践成果</p>
    </div>

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
            <NuxtLink :to="item.url">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
            </NuxtLink>
          </div>

          <div class="p-4">
            <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
              <small>
                <a :href="item.siteurl" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors underline">
                {{ item.category }} site</a> by
                <span class="text-sky-600 dark:text-sky-400">@{{ item.author }}</span>
              </small>
            </p>
          </div>
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'showcase',
  ssr: false
})

usePageTitle('学员作品展示', '展示我们优秀学员的项目作品和实践成果，见证学习效果和技能提升');

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
const { data } = await useAsyncData('showcases', () =>
  queryContent('showcase').find()
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
