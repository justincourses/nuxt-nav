<script setup>
const features = [
  {
    title: "课程理念",
    description:
      "不搞八股学习、整点实用的。真正希望你学会的课程，理论和动手实战相结合。拥抱 AI 辅助编程、但坚持人类主导。",
    icon: "ph:book-open-duotone",
  },
  {
    title: "渐进学习",
    description:
      "先借助 AI 辅助快速完成项目功能，后根据实践逐渐补全相关知识，0基础的新手也可以学习。",
    icon: "ph:lightbulb-duotone",
  },
  {
    title: "授课方式",
    description:
      "录播视频课（主要，一周三次）。图文笔记教程（辅助，搭配视频）。课程评论、微信群、私信支持（定期回复）。",
    icon: "ph:video-camera-duotone",
  },
  {
    title: "技术栈",
    description:
      "Nuxt 3、Vue 3 及相关生态。Github、Vercel、CloudFlare、Supabase 等工具链平台的合理运用。基于 Docker 的构建和部署。",
    icon: "ph:stack-duotone",
  },
  {
    title: "课程目标",
    description:
      "由浅入深地掌握 Web 从开发到上线的全过程。在课程中尽快达成阶段性进展，从最小的可交付物开始，迭代渐进式开发。最终掌握端到端发布 Web App。",
    icon: "ph:target-duotone",
  },
  {
    title: "实战项目",
    description:
      "小型项目全程实战展示。大型项目核心模块开发展示。移动端的打包和发布。",
    icon: "ph:code-duotone",
  },
];
</script>

<template>
  <div class="mt-16 md:mt-0">
    <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      全栈开发实战课程
    </h2>
    <p class="text-lg mt-4 text-slate-600">
      一门真正从实践出发的 Web 开发课程，让你快速掌握现代全栈开发技能。
    </p>
  </div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
    <div v-for="item of features" class="flex gap-4 items-start">
      <div class="mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0 flex items-center justify-center">
        <Icon class="text-white" :name="item.icon" />
      </div>
      <div class="pt-1.5">
        <h3 class="font-semibold text-lg">{{ item.title }}</h3>
        <p class="text-slate-500 mt-2 leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
