<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="max-w-4xl mx-auto pt-8">
      <ContentDoc :head="false" v-slot="{ doc }">
        <div class="flex justify-center">
          <nav aria-label="Breadcrumb">
            <UBreadcrumb :links="breadcrumbLinks(doc?.title ?? '')" divider="i-heroicons-chevron-right"
              class="text-sm text-gray-500 dark:text-gray-400 mb-8" />
          </nav>
        </div>

        <!-- Hero Section -->
        <div class="relative bg-gradient-to-r from-purple-900 to-indigo-800 py-16 font-[sans-serif] rounded-xl overflow-hidden">
          <div class="absolute inset-0">
            <img v-if="doc.image" :src="doc.image" :alt="doc.title" class="w-full h-full object-cover opacity-50" />
          </div>

          <div class="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
            <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
              {{ doc.title }}

            </h1>
            <small v-if="doc.category" class="inline-block text-indigo-300 text-sm my-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-300/30">{{ doc.category }}</small>
            <p class="text-lg md:text-xl mb-12 text-gray-200">{{ doc.summary }}</p>
            <a :href="doc.ref" target="_blank" rel="sponsored noopener noreferrer"
              class="inline-block bg-white/70 text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100/70 transition-colors duration-200 no-underline"
              aria-label="在新窗口中了解更多" tabindex="0">
              立即访问
            </a>
          </div>
        </div>

        <!-- Content Section -->
        <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg mt-8 shadow-sm">
          <article class="prose dark:prose-invert max-w-none">
            <!-- 内容正文 -->
            <ContentRenderer :value="doc" />

            <!-- 常见问题 -->
            <section v-if="doc.faq?.length" class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 not-prose">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">常见问题</h2>
              <dl class="space-y-6">
                <div v-for="(item, index) in doc.faq" :key="index" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5">
                  <dt class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {{ item.question }}
                  </dt>
                  <dd class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {{ item.answer }}
                  </dd>
                </div>
              </dl>
            </section>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mt-8">
              <span v-for="tag in doc.tags" :key="tag"
                class="text-sm rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-sky-600 dark:text-sky-300 dark:border-sky-500/15 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors duration-200">
                #{{ tag }}
              </span>
            </div>
          </article>
        </div>
      </ContentDoc>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'partner',
  key: (route) => route.fullPath,
})

const breadcrumbLinks = (currentTitle: string) => [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: '赞助',
    icon: 'i-heroicons-users',
    to: '/partner'
  },
  {
    label: currentTitle,
    icon: 'i-heroicons-document-text'
  }
]

const route = useRoute()
const siteUrl = useSiteConfig().url.replace(/\/+$/, '')
const normalizedPath = route.path.replace(/\/+$/, '') || '/'

const { data: doc } = await useAsyncData(
  `partner-${normalizedPath}`,
  () => queryContent().where({ _path: normalizedPath }).findOne()
)
if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

usePageTitle(
  doc.value?.title,
  doc.value?.description || doc.value?.summary,
  {
    seoTitle: doc.value?.seoTitle,
    image: doc.value?.image,
    ogType: 'article',
  }
)

if (doc.value) {
  const pageUrl = `${siteUrl}${normalizedPath}`
  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '赞助',
          item: `${siteUrl}/partner`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: doc.value.title,
          item: pageUrl,
        },
      ],
    },
  ]

  if (Array.isArray(doc.value.faq) && doc.value.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: doc.value.faq.map((item: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  useHead({
    script: schemas.map((schema, index) => ({
      key: `partner-jsonld-${index}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    })),
  })
}
</script>
