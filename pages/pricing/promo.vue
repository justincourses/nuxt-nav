<script setup>
definePageMeta({
  layout: "landing",
});

usePageTitle('限时优惠', '限时优惠活动页面，展示当前可用的优惠码和折扣信息，把握机会享受优惠价格');

const promos = [
  {
    title: "圣诞特惠",
    code: "XMAS2024",
    discount: "5折",
    price: "¥324",
    expiry: "2024年12月25日 23:59 (UTC+9)",
    isHeadline: true,
    // description: "购买课程，即可免费加入日本生活交流社群",
    links: [
      {
        text: "人工购买",
        url: "https://buy.stripe.com/fZe9AW506dnr3IY6oq?prefilled_promo_code=XMAS2024",
        primary: true
      },
      {
        text: "自助购买",
        url: "https://app.justincourse.com/membership-checkout/?pmpro_level=2&pmpro_discount_code=XMAS2024",
        primary: false
      }
    ]
  },
  {
    title: "新年活动",
    code: "NEWYEAR2025",
    discount: "6折",
    price: "¥388.8",
    expiry: "2025年2月28日 23:59 (UTC+9)",
    isHeadline: false
  }
];
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Headline Promo -->
    <div v-for="promo in promos.filter(p => p.isHeadline)" :key="promo.code" class="mb-12">
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl p-8">
        <h2 class="text-3xl font-bold text-white mb-4">{{ promo.title }}</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div class="text-gray-800 dark:text-gray-200 space-y-4">
            <p class="text-2xl font-semibold">优惠码：<span class="font-mono">{{ promo.code }}</span></p>
            <p class="text-xl">折扣：{{ promo.discount }}（折后价 {{ promo.price }}）</p>
            <p>有效期至：{{ promo.expiry }}</p>
            <p v-if="promo.description" class="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{{
              promo.description }}</p>
            <div class="flex gap-4 mt-6">
              <a v-for="link in promo.links" :key="link.url" :href="link.url" target="_blank" :class="[
                   'inline-flex items-center px-6 py-3 text-base  hover:opacity-80 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                   link.primary
                     ? 'text-white bg-black hover:bg-slate-700 focus:bg-slate-500'
                     : 'text-black bg-gray-200 hover:bg-gray-300 focus:ring-gray-500'
                 ]" tabindex="0" :aria-label="link.text">
                {{ link.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Promos -->
    <div class="grid md:grid-cols-1 gap-8">
      <div v-for="promo in promos.filter(p => !p.isHeadline)" :key="promo.code"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-gray-600">
        <h3 class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">{{ promo.title }}</h3>
        <div class="space-y-3">
          <p class="text-xl font-semibold">优惠码：<span class="font-mono text-indigo-500 dark:text-indigo-400">{{
              promo.code }}</span></p>
          <p class="text-gray-600 dark:text-gray-400">折扣：{{ promo.discount }}（折后价 {{ promo.price }}）</p>
          <p class="text-gray-500 dark:text-gray-500">有效期至：{{ promo.expiry }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
