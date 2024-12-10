<script setup>
definePageMeta({
  layout: "landing",
});

usePageTitle('课程价格', '查看课程的详细定价方案，提供免费版、标准版和个性化辅导三种选择，满足不同学习需求');

const pricing = [
  {
    name: "免费版",
    price: "免费",
    popular: false,
    features: [
      "公开平台的课程视频",
      "基于 GitHub 的课程源码",
      "基于 X 的动态更新",
      "学员问答精华沉淀",
      "项目成果网站上线",
      {
        text: "基于 Notion 的公开笔记",
        link: "https://s.zhaikr.com/c-learn-resources"
      },
      {
        text: "免费 TG 群",
        link: "https://s.zhaikr.com/c-telegram"
      },
    ],
    button: {
      text: "免费微信群",
      link: "/contact/qr-free",
    },
  },
  {
    name: "标准版",
    price: "¥324",
    originalPrice: "¥648",
    popular: true,
    features: [
      "课程授权为一次买断",
      "课程内部笔记 Space Access",
      "课程全部视频 Early Access",
      "课程全部源码 Early Access",
      "学员问答精华沉淀 Early Access",
      "内部讨论和技术指导微信群",
    ],
    button: {
      text: "立即加入",
      link: "https://buy.stripe.com/fZe9AW506dnr3IY6oq?prefilled_promo_code=XMAS2024",
    },
  },
  {
    name: "个性化辅导",
    price: "Let's Talk",
    popular: false,
    features: [
      "个性化课程定制",
      "一对一辅导",
      "专属项目指导",
      "定制化学习计划",
      "24/7 专属支持",
    ],
    button: {
      text: "联系我们",
      link: "/contact",
    },
  },
];
</script>

<template>
  <div class="pricing-page">
    <CommonSectionhead>
      <template v-slot:title>课程价格</template>
      <template v-slot:desc>原价只是游戏里氪一单的价格，竟然还要打折</template>
    </CommonSectionhead>

    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
      <!-- 免费版：移动端 order-2，PC端 md:order-1 -->
      <div class="order-2 md:order-1">
        <Pricing :plan="pricing[0]" />
      </div>

      <!-- 标准版：移动端 order-1，PC端 md:order-2 -->
      <div class="order-1 md:order-2">
        <Pricing :plan="pricing[1]" />
      </div>

      <!-- 个性化辅导：移动端和PC端都是最后 order-3 -->
      <div class="order-3">
        <Pricing :plan="pricing[2]" />
      </div>
    </div>
  </div>
</template>
