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
            class="border-gray-200 dark:border-gray-700"
          />
        </UFormGroup>

        <!-- Category Filter -->
        <UFormGroup class="w-48">
          <USelect
            v-model="selectedCategory"
            :options="[{ label: '全部分类', value: '' }, ...categories.map(c => ({ label: c, value: c }))]"
            placeholder="选择分类"
            class="border-gray-200 dark:border-gray-700"
          />
        </UFormGroup>

        <!-- Tags Filter -->
        <UFormGroup class="w-64">
          <USelectMenu
            v-model="selectedTags"
            :options="tagOptions"
            multiple
            value-attribute="value"
            placeholder="选择标签"
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
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
  layout: 'resources',
  // Keep SSR false for consistent hydration, although SSR true with proper hydration handling is better.
  // Given previous issues, we'll respect the existing config.
  ssr: false
})

usePageTitle('学习资源', '精选优质的学习资源和开发工具，帮助开发者提升技能、提高效率，打造更好的开发体验');

const route = useRoute()
const router = useRouter()

// --- Infinite Scroll State ---
const itemsPerPage = 6
const displayedItems = ref<any[]>([])
const listData = ref<any[]>([])
const currentIndex = ref(0)

// --- Filter State ---
// Initialize from URL query immediately
const searchKeyword = ref((route.query.keyword as string) || '')
const selectedCategory = ref((route.query.category as string) || '')

const getTagsFromQuery = (tagsQuery: string | string[] | null | undefined): string[] => {
  if (!tagsQuery) return []
  if (Array.isArray(tagsQuery)) {
    return tagsQuery.flatMap(t => (t || '').split(',')).filter(Boolean)
  }
  return (tagsQuery as string).split(',').filter(Boolean)
}

const selectedTags = ref<string[]>(getTagsFromQuery(route.query.tags))

const categories = ref<string[]>([])
const tags = ref<string[]>([])

// --- UI Helpers ---
const tagOptions = computed(() => tags.value.map(tag => ({ label: tag, value: tag })))
const formState = reactive({
  keyword: searchKeyword,
  category: selectedCategory,
  tags: selectedTags
})

// --- Data Fetching: Categories & Tags (Initial Load) ---
// We fetch ALL resources once to extract available categories and tags.
// This is efficient enough for moderate dataset sizes.
const { data: allResources } = await useAsyncData('all-resources-meta', () =>
  queryContent('resources')
    .only(['category', 'tags'])
    .find()
)

if (allResources.value) {
  const categorySet = new Set<string>()
  const tagSet = new Set<string>()

  allResources.value.forEach((item: any) => {
    if (item.category) categorySet.add(item.category)
    if (item.tags) item.tags.forEach((tag: string) => tagSet.add(tag))
  })

  categories.value = Array.from(categorySet).sort()
  tags.value = Array.from(tagSet).sort()
}

// --- Logic: User Input -> Update URL ---
// Using debounce to avoid rapid URL updates on typing
const updateUrl = useDebounceFn(() => {
  const query: Record<string, string | string[]> = {}

  if (searchKeyword.value) query.keyword = searchKeyword.value
  if (selectedCategory.value) query.category = selectedCategory.value
  if (selectedTags.value.length > 0) query.tags = selectedTags.value.join(',')

  router.replace({ query })
}, 300)

// Watch user inputs to trigger URL update
watch([searchKeyword, selectedCategory, selectedTags], () => {
  updateUrl()
}, { deep: true })

// --- Logic: URL Change -> Fetch Data ---
// This is the core logic. We watch the URL query and fetch data accordingly.
// This handles initial load, browser back/forward buttons, and user filter changes.
const fetchResources = async () => {
  // Reset pagination on new search
  currentIndex.value = 0
  displayedItems.value = []

  let query = queryContent('resources').only(['_id', '_path', 'title', 'summary', 'category', 'tags', 'image'])

  const keyword = route.query.keyword as string
  const category = route.query.category as string
  const currentTags = getTagsFromQuery(route.query.tags)

  // Apply Keyword Filter
  if (keyword) {
    query = query.where({
      $or: [
        { title: { $icontains: keyword } },
        { summary: { $icontains: keyword } },
        { description: { $icontains: keyword } },
        { category: { $icontains: keyword } }
      ]
    })
  }

  // Apply Category Filter
  if (category) {
    query = query.where({ category: category })
  }

  // Apply Tags Filter
  if (currentTags.length > 0) {
    query = query.where({ tags: { $containsAny: currentTags } })
  }

  // Execute Query
  // We use a unique key based on query params to ensure correct hydration matching if we were using SSR,
  // and to force re-evaluation.
  const queryKey = `resources-${JSON.stringify(route.query)}`
  const { data } = await useAsyncData(queryKey, () => query.find())

  if (data.value) {
    listData.value = [...data.value]
    handleAppend()
  } else {
    listData.value = []
  }
}

// Watch for route query changes immediately
watch(() => route.query, () => {
  fetchResources()
}, { immediate: true, deep: true })


// --- Pagination / Infinite Scroll Logic ---
const handleAppend = () => {
  if (currentIndex.value >= listData.value.length) return

  const nextItems = listData.value.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage
  )
  displayedItems.value = [...displayedItems.value, ...nextItems]
  currentIndex.value += itemsPerPage
}

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = window.innerHeight || document.documentElement.clientHeight

  if (scrollHeight - scrollTop <= clientHeight + 100) {
    handleAppend()
  }
}

// --- Reset Logic ---
const handleReset = () => {
  searchKeyword.value = ''
  selectedCategory.value = ''
  selectedTags.value = []
  // This will trigger the watch -> updateUrl -> route change -> fetchResources chain
}

// --- Lifecycle ---
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
