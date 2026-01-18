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
            @update:model-value="handleSearch"
            class="border-gray-200 dark:border-gray-700"
          />
        </UFormGroup>

        <!-- Tags Filter -->
        <UFormGroup class="w-64">
          <USelectMenu
            v-model="selectedTags"
            :options="tagOptions"
            multiple
            placeholder="选择标签"
            @update:model-value="handleSearch"
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
        <NuxtLink :to="item._path" class="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-xl transition-shadow">
          <div class="relative w-full aspect-square">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>

          <div class="p-4">
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-xl font-bold hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {{ item.title }}
              </h3>
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
        </NuxtLink>
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

usePageTitle('学习资源', '精选优质的学习资源和开发工具，帮助开发者提升技能、提高效率，打造更好的开发体验');

const route = useRoute()
const router = useRouter()

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

// Computed options for UI components
const tagOptions = computed(() => tags.value.map(tag => ({ label: tag, value: tag })))

// Form state
const formState = reactive({
  keyword: searchKeyword,
  category: selectedCategory,
  tags: selectedTags
})

// Update URL when filter changes
const updateUrlQuery = () => {
  const query: Record<string, string | string[]> = {}

  if (searchKeyword.value) {
    query.keyword = searchKeyword.value
  }

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  }

  if (selectedTags.value.length > 0) {
    query.tags = selectedTags.value
  }

  // Replace URL without triggering a page reload
  router.replace({ query })
}

// Watch for filter changes and update URL
watch([searchKeyword, selectedCategory, selectedTags], () => {
  updateUrlQuery()
}, { deep: true })

// Define handleAppend first
const handleAppend = () => {
  if (currentIndex.value >= listData.value.length) return

  const nextItems = listData.value.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage
  )
  displayedItems.value = [...displayedItems.value, ...nextItems]
  currentIndex.value += itemsPerPage
}

// Scroll handler
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = window.innerHeight || document.documentElement.clientHeight

  if (scrollHeight - scrollTop <= clientHeight + 100) {
    handleAppend()
  }
}

// Debounced search function
const handleSearch = useDebounceFn(async () => {
  currentIndex.value = 0
  displayedItems.value = []

  let query = queryContent('resources').only(['_id', '_path', 'title', 'summary', 'category', 'tags', 'image'])
  const hasFilters = searchKeyword.value || selectedCategory.value || selectedTags.value.length > 0

  // Apply filters if any exist
  if (searchKeyword.value) {
    query = query.where({
      $or: [
        { title: { $icontains: searchKeyword.value } },
        { summary: { $icontains: searchKeyword.value } },
        { description: { $icontains: searchKeyword.value } },
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

  // Execute the query
  const { data } = await useAsyncData(`resources-${Date.now()}`, () => query.find())

  if (data.value) {
    listData.value = [...data.value]
    handleAppend()
  }
}, 300)

// Reset function
const handleReset = async () => {
  searchKeyword.value = ''
  selectedCategory.value = ''
  selectedTags.value = []

  // Use initial data for reset
  if (initialData.value) {
    listData.value = [...initialData.value]
    displayedItems.value = []
    currentIndex.value = 0
    handleAppend()
  }
}

// Fetch and process initial data
const { data: initialData } = await useAsyncData('initial-resources', () =>
  queryContent('resources')
    .only(['_id', '_path', 'title', 'summary', 'category', 'tags', 'image'])
    .find()
)

// Initialize categories and tags
if (initialData.value && initialData.value.length > 0) {
  const categorySet = new Set<string>()
  const tagSet = new Set<string>()

  initialData.value.forEach((item: any) => {
    if (item.category) categorySet.add(item.category)
    if (item.tags) item.tags.forEach((tag: string) => tagSet.add(tag))
  })

  categories.value = Array.from(categorySet).sort()
  tags.value = Array.from(tagSet).sort()

  // Set initial data
  listData.value = [...initialData.value]

  // Apply URL query parameters if they exist
  const { keyword, category, tags: urlTags } = route.query

  if (keyword && typeof keyword === 'string') {
    searchKeyword.value = keyword
  }

  if (category && typeof category === 'string') {
    selectedCategory.value = category
  }

  if (urlTags) {
    // Handle both single tag and array of tags
    const tagArray = Array.isArray(urlTags)
      ? urlTags.filter((tag): tag is string => typeof tag === 'string')
      : typeof urlTags === 'string'
        ? [urlTags]
        : []

    // Only set tags that actually exist in our tag list
    selectedTags.value = tagArray.filter(tag => tags.value.includes(tag))
  }

  // If any filters were applied from URL, trigger search
  if (keyword || category || urlTags) {
    handleSearch()
  }
}

// Load initial items
watchEffect(() => {
  if (listData.value.length > 0 && displayedItems.value.length === 0) {
    handleAppend()
  }
})

// Setup scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Cleanup scroll listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
