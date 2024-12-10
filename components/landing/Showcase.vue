<script setup lang="ts">
interface ShowcaseItem {
  title: string
  summary: string
  image: string
  author?: string
  url: string
  siteurl: string
}

const { data: showcases } = await useAsyncData('showcases', () => queryContent('showcase')
  .find()
)

const carouselRef = ref()
const autoplayInterval = ref<NodeJS.Timeout>()
const isPaused = ref(false)
const selectedItem = ref(null)
const isModalOpen = ref(false)

const startAutoplay = () => {
  if (autoplayInterval.value) return

  autoplayInterval.value = setInterval(() => {
    if (!carouselRef.value || isPaused.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = undefined
  }
}

const handleMouseEnter = () => {
  isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}

const handleItemClick = (item: any) => {
  selectedItem.value = item
  isModalOpen.value = true
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="showcase-section my-16">
    <h2 class="text-2xl font-bold hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-center"
      title="查看更多学员作品">
      <NuxtLink to="/showcase">
        学员作品
      </NuxtLink>
    </h2>
    <UCarousel ref="carouselRef" :items="showcases || []" :ui="{ item: 'px-0' }" class="mt-8 group relative" wrap-around
      arrows @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <template #default="{ item }">
        <div class="block px-0 relative group/item cursor-pointer" @click="handleItemClick(item)">
          <div class="relative">
            <NuxtImg :src="item.image" :alt="item.title" class="w-full h-96 object-contain" />
            <div
              class="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <h3 class="text-white text-xl font-bold">{{ item.title }}</h3>
              <p class="text-white text-sm px-4 text-center">{{ item.summary }}</p>
            </div>
          </div>
        </div>
      </template>

      <template #prev="{ onClick, disabled }">
        <button :disabled="disabled" @click="onClick"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="heroicons:chevron-left" class="w-4 h-4" />
        </button>
      </template>

      <template #next="{ onClick, disabled }">
        <button :disabled="disabled" @click="onClick"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        </button>
      </template>
    </UCarousel>

    <UModal v-model="isModalOpen" :ui="{
      overlay: {
        background: 'bg-black/80',
      },
      container: 'mx-auto',
      base: 'relative flex flex-col',
      width: 'w-full',
      height: 'h-auto',
      padding: 'p-0'
    }">
      <div class="w-full aspect-video" v-if="selectedItem">
        <div class="relative w-full h-full font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
          <NuxtImg loading="eager" :src="(selectedItem as any).image" :alt="(selectedItem as any).title" class="absolute inset-0 w-full h-full object-cover" />

          <div class="relative z-50 h-full flex flex-col justify-center items-center text-center text-white p-8">
            <h2 class="sm:text-4xl text-2xl font-bold mb-6">{{ (selectedItem as any).title }}</h2>
            <p class="sm:text-lg text-base text-center text-gray-200 max-w-2xl">{{ (selectedItem as any).summary }}</p>
            <p class="mt-4 text-sm text-gray-300">作者: {{ (selectedItem as any).author || '匿名' }}</p>

            <div class="flex flex-col items-center gap-4 mt-12">
              <a :href="(selectedItem as any).siteurl" target="_blank" rel="noopener noreferrer"
                class="px-6 py-2 border-2 border-white text-white text-base font-medium rounded-lg hover:bg-white/20 transition duration-300">
                立即访问
              </a>
              <NuxtLink :to="(selectedItem as any).url"
                class="text-sm text-gray-300 hover:text-white transition-colors">
                查看详情
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
