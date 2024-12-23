<script setup lang="ts">
interface Resource {
  _id: string
  title: string
  summary: string
  category: string
  url: string
  icon?: string
}

const { data: rsources } = await useAsyncData<Resource[]>('rsources', () => queryContent('resources')
  .find()
  .then(items => items.map(item => ({
    _id: item._id,
    title: item.title as string,
    summary: item.summary as string,
    category: item.category as string,
    url: item.url as string,
    icon: item.icon || undefined
  })))
)

const router = useRouter()
const searchQuery = ref('')

const filteredResources = computed(() => {
  if (!searchQuery.value || !rsources.value) return rsources.value

  const query = searchQuery.value.toLowerCase()
  return rsources.value.filter((resource: Resource) =>
    resource.title.toLowerCase().includes(query) ||
    resource.summary.toLowerCase().includes(query) ||
    resource.category.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  if (!searchQuery.value) return
  router.push(`/resources?keyword=${encodeURIComponent(searchQuery.value)}`)
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 px-4 py-12 font-[sans-serif]">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-500 hover:text-slate-600 dark:hover:text-sky-400 transition-colors text-center mb-8"
        title="查看更多学习资源">
        <NuxtLink to="/resources">
          学习资源
        </NuxtLink>
      </h2>

      <!-- Search Box -->
      <div class="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] mb-6">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search Something..."
          class="w-full outline-none bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm px-4 py-3"
          aria-label="Search resources"
          @keyup.enter="handleSearch"
        />
        <button
          type='button'
          class="flex items-center justify-center bg-[#007bff] hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors px-5"
          aria-label="Search"
          @click="handleSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-white">
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </button>
      </div>

      <div class="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-8" v-if="rsources">
        <a
          v-for="resource in filteredResources"
          :key="resource._id"
          :href="resource.url"
          :title="resource.summary"
          class="p-6 flex gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 p-3 rounded-md shrink-0">
            <Icon :name="(resource.icon || '').toLowerCase()" class="w-full h-full" />
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
