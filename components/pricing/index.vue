<script setup>
defineProps(["plan"]);
</script>

<template>
  <div>
    <div :class="[
        'flex flex-col w-full order-first lg:order-none border-2 py-5 px-6 rounded-md transition-all duration-300',
        plan.popular ? [
          'border-blue-600 shadow-lg scale-105 z-10',
          'py-8 px-8',
        ] : [
          'border-[#D8DEE9] border-opacity-50',
          'scale-95 opacity-85',
        ]
      ]">
      <!-- 热门标签 -->
      <div v-if="plan.popular" class="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
        <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
          热门选择
        </span>
      </div>

      <div class="text-center">
        <h4 :class="[
            'text-lg font-medium',
            plan.popular ? 'text-blue-600' : 'text-gray-400'
          ]">
          {{ plan.name }}
        </h4>
        <div class="mt-3">
          <p :class="[
              'text-4xl font-bold md:text-4xl relative',
              plan.popular ? 'text-slate-800 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
            ]">
            {{ plan.price }}<sup v-if="plan.popular"
              class="text-sm text-blue-600 relative top-[-1em] left-[0.1em]">*</sup>
          </p>
          <p v-if="plan.originalPrice" class="mt-1 text-xl font-medium text-gray-400 line-through">
            {{ plan.originalPrice }}
          </p>
        </div>
      </div>

      <ul class="grid mt-8 text-left gap-y-4">
        <li v-for="item of plan.features" :class="[
            'flex items-start gap-3',
            plan.popular ? 'text-gray-800' : 'text-gray-600'
          ]">
          <LandingTick :className="[
              'w-6 h-6',
              plan.popular ? 'text-blue-600' : 'text-gray-400'
            ]" />
          <span v-if="typeof item === 'string'">{{ item }}</span>
          <span v-else>
            <a v-if="item.link" :href="item.link" target="_blank"
              class="text-blue-600 hover:text-blue-800 hover:underline">
              {{ item.text }}
            </a>
            <span v-else>{{ item.text }}</span>
          </span>
        </li>
      </ul>
      <div class="flex flex-col mt-8">
        <LandingLink :href="plan.button.link || '#'" size="lg" :block="true"
          :styleName="plan.popular ? 'primary' : 'outline'" target="_blank" rel="noopener">
          {{ plan.button.text }}
        </LandingLink>
        <div v-if="plan.popular" class="mt-2 text-xs text-center text-slate-500 dark:text-slate-500">
          <p>
            <small>* 在不同国家/地区将根据当地汇率及税率计算价格</small>
          </p>
          <p class="mt-1">
            <NuxtLink to="/pricing/promo" class="text-blue-600 hover:text-blue-800 hover:underline ml-1">
              🎊 查看优惠活动 🎁
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
