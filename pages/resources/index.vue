<template>
  <div class="max-w-4xl mx-auto pt-8">
    <CommonSectionhead class="mb-12">
      <template v-slot:title>学习资源</template>
      <template v-slot:desc>精选优质的学习资源和开发工具，帮助开发者提升技能、提高效率，打造更好的开发体验</template>
    </CommonSectionhead>

    <!-- Filter Section -->
    <UForm :state="formState" class="mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-4">
        <!-- Keyword Search -->
        <UFormGroup class="w-64">
          <UInput
            v-model.trim="searchKeyword"
            placeholder="搜索资源..."
            icon="i-heroicons-magnifying-glass-20-solid"
            @input="handleSearch"
            class="border-gray-200 dark:border-gray-700"
          />
        </UFormGroup>

        <!-- Category Filter -->
        <UFormGroup class="w-48">
          <USelect
            v-model="selectedCategory"
            :options="[{ label: '全部分类', value: '' }, ...categories.map(c => ({ label: c, value: c }))]"
            placeholder="选择分类"
            @change="handleSearch"
            class="border-gray-200 dark:border-gray-700"
          />
        </UFormGroup>

        <!-- Tags Filter -->
        <UFormGroup class="w-64">
          <USelectMenu
            v-model="selectedTags"
            :options="tags"
            multiple
            placeholder="选择标签"
            @change="handleSearch"
            class="border-gray-200 dark:border-gray-700"
          >
            <template #label>
              <span v-if="selectedTags.length === 0">选择标签</span>
              <span v-else>已选择 {{ selectedTags.length }} 个标签</span>
            </template>
          </USelectMenu>
        </UFormGroup>

        <!-- Reset Button -->
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-arrow-path-20-solid"
          @click="handleReset"
          class="self-end"
        >
          重置筛选
        </UButton>
      </div>
    </UForm>

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

            <div class="flex flex-wrap gap-2 mt-2">
              <span
                class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10">
                {{ item.category }}
              </span>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="text-sm rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-gray-600 dark:text-gray-400 dark:border-gray-500/15 dark:bg-gray-500/10"
              >
                {{ tag }}
              </span>
            </div>
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

import { useDebounceFn } from '@vueuse/core'

usePageTitle('合作伙伴', '展示我们的合作伙伴和他们的成功案例，了解如何通过合作实现共赢');

const itemsPerPage = 6
const displayedItems = ref<any[]>([])
const listData = ref<any[]>([])
const currentIndex = ref(0)

// Filter states
const searchKeyword = ref('')
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])
const categories = ref<string[]>([])
const tags = ref<string[]>([])

// Form state
const formState = reactive({
  keyword: searchKeyword,
  category: selectedCategory,
  tags: selectedTags
})

// Debounced search function
const handleSearch = useDebounceFn(async () => {
  currentIndex.value = 0
  displayedItems.value = []

  let query = queryContent('resources')
  const hasFilters = searchKeyword.value || selectedCategory.value || selectedTags.value.length > 0

  if (hasFilters) {
    // Apply keyword search
    if (searchKeyword.value) {
      query = query.where({
        $or: [
          { title: { $icontains: searchKeyword.value } },
          { summary: { $icontains: searchKeyword.value } },
          { description: { $icontains: searchKeyword.value } },
          { body: { $icontains: searchKeyword.value } },
          { category: { $icontains: searchKeyword.value } }
        ]
      })
    }

    // Apply category filter
    if (selectedCategory.value) {
      query = query.where({ category: selectedCategory.value })
    }

    // Apply tags filter
    if (selectedTags.value.length > 0) {
      query = query.where({ tags: { $containsAny: selectedTags.value } })
    }
  }

  // Execute the query
  const { data } = await useAsyncData(`resources-${Date.now()}`, () => query.find())

  if (data.value) {
    listData.value = [...data.value]
    handleAppend()
  }
}, 300)

// 添加滚动监听
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = window.innerHeight || document.documentElement.clientHeight

  if (scrollHeight - scrollTop <= clientHeight + 100) {
    handleAppend()
  }
}

const handleAppend = () => {
  if (currentIndex.value >= listData.value.length) return

  const nextItems = listData.value.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage
  )
  displayedItems.value = [...displayedItems.value, ...nextItems]
  currentIndex.value += itemsPerPage
}

// Reset function
const handleReset = async () => {
  searchKeyword.value = ''
  selectedCategory.value = ''
  selectedTags.value = []

  // Fetch all data again when resetting
  const { data: allData } = await useAsyncData('reset-resources', () => queryContent('resources').find())
  if (allData.value) {
    listData.value = [...allData.value]
    displayedItems.value = []
    currentIndex.value = 0
    handleAppend()
  }
}

// Initial data fetch and filter options setup
const initializeData = async () => {
  // First fetch all data to extract categories and tags
  const { data: allData } = await useAsyncData('all-resources', () => queryContent('resources').find())

  if (allData.value && allData.value.length > 0) {
    // Extract unique categories and tags
    const categorySet = new Set<string>()
    const tagSet = new Set<string>()

    allData.value.forEach((item: any) => {
      if (item.category) categorySet.add(item.category)
      if (item.tags) item.tags.forEach((tag: string) => tagSet.add(tag))
    })

    categories.value = Array.from(categorySet).sort()
    tags.value = Array.from(tagSet).sort()

    // Set initial data
    listData.value = [...allData.value]
    displayedItems.value = [] // Clear displayed items
    currentIndex.value = 0 // Reset index
    handleAppend() // Load initial items
  }
}

// Initialize data and setup scroll listener
onMounted(() => {
  initializeData()
  window.addEventListener('scroll', handleScroll)
})

// Cleanup scroll listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
