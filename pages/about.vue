<script setup>
definePageMeta({
  layout: "landing",
});

usePageTitle('关于课程、关于我', '了解课程内容、学习方法和讲师背景，我们致力于帮助你掌握 Web 开发技能');
</script>

<template>
  <div class="about-page">
    <CommonSectionhead>
      <template v-slot:title>关于课程、关于我</template>
      <template v-slot:desc>我是真的想要教会你做项目</template>
    </CommonSectionhead>

    <div class="flex flex-col gap-12">
      <div class="font-sans bg-gray-100 px-4 py-12">
        <div class="grid lg:grid-cols-1 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="text-left">
            <h2 class="text-gray-800 text-3xl font-bold mb-6">楔子</h2>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="text-left">
            <p class="mb-4 text-base text-gray-500 text-justify">我时常回忆自己正经学习编程刚起步的时候，互联网上还没有知识付费这一说，一般来说，学习技术有几个渠道：去培训班交钱学习、在网上找免费资源下载、买书学习。</p>
            <p class="mb-4 text-base text-gray-500 text-justify">很幸运的是，当时我找到了一套叫做《亚当学院》的免费教程，是一套非常良心的教程，主要是介绍了基于 W3C 标准的前端开发技术（通俗地说就是 div+css、jQuery、css，那时候的 IDE 还是 Notepad++），作者还贴心地搞了个 QQ 群来供大家交流。</p>
            <p class="mb-4 text-base text-gray-500 text-justify">当时的我在石油系统上班（关系户），深切体会到自己是不太可能融入到那个体系中成为一个自己从小就讨厌的人，所以打算尽快转行，而与电脑所相关的一切，正是我从中学起就感兴趣的。</p>
            <p class="text-base text-gray-500 text-justify">我的干劲很大，每天上班时，就摸鱼看视频学习、做笔记，下班后，就回家根据所学知识学习写自己的小项目，并且结合 Wordpress，开始接一些商业定制的单子。在免费教程学完之际，我就已经完成了 2 个基于 Wordpress 的商业定制，当我确认这个收入已经超越了上班的工资后，就立刻打报告离职、成为了一个独立开发者（2009 左右），后来创过业、上过班，但一直走在自己喜欢的这条程序员之路上。</p>
          </div>
          <div>
            <img src="/images/about/1.png" alt="楔子" class="rounded-lg object-contain w-full h-full" />
          </div>
        </div>
      </div>

      <hr class="border-slate-200 dark:border-slate-700 w-full" />

      <div class="font-sans bg-gray-100 px-4 py-12">
        <div class="grid lg:grid-cols-1 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="text-left lg:text-right">
            <h2 class="text-gray-800 text-3xl font-bold mb-6">开始</h2>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="order-2 lg:order-2">
            <p class="mb-4 text-base text-gray-500 text-justify">很早以前，我在职的时候，也打算出关于 Web 开发的教程，因为在公司内部，本身就包含了新员工培训的部分，Web 这块是由我来负责的。</p>
            <p class="mb-4 text-base text-gray-500 text-justify">只不过，企业培训不太一样，因为是工作，很多事情可以无限简化，通过任务派发的方式来安排学习，并且企业招聘是有门槛的，所以大家的水平会有一个托底（虽然也会有实习生，但是一般对基本知识的掌握会有一定的要求），授课过程相对于网上公开授课简单很多，并且需要投入的也都是工作时间。</p>
            <p class="text-base text-gray-500 text-justify">并且，我之前一直认为，网上的教材太多了，根本犯不着我来讲课。可是我发现，太多的人被生涩难懂的官方文档、欲言又止的博客文章、以及各种营销型开发教程所坑害，正如同我看见很多人想要移居日本时，只能搜索和查看非常不靠谱的信息时那样。于是我就想，为什么我不录一套系统的 Web 开发教程给大家？让部分朋友少走一点弯路也是好的。</p>
          </div>
          <div class="order-1 lg:order-1">
            <img src="/images/about/2.png" alt="开始" class="rounded-lg object-contain w-full h-full" />
          </div>
        </div>
      </div>

      <hr class="border-slate-200 dark:border-slate-700 w-full" />

      <div class="font-sans bg-gray-100 px-4 py-12">
        <div class="grid lg:grid-cols-1 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="text-left">
            <h2 class="text-gray-800 text-3xl font-bold mb-6">课程构想</h2>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div class="text-left">
            <div class="space-y-2 text-base text-gray-500">
              <div class="flex items-start gap-2">
                <Icon name="heroicons:banknotes" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">课程不教你快速赚钱的办法，只教会你工具的选择和使用，因为我相信这才是实实在在能教和学的东西</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="heroicons:users" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">课程面向的是有一定产品思维、对技术有热情，但是没有编程实践经验，希望通过学习摸到门道少走弯路的人</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="heroicons:academic-cap" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">技术栈由浅入深进行选择，原则是先教大家可以快速出成果的东西，后续再层层加码，拓展一些有意思的实用功能</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="heroicons:cpu-chip" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">一定会积极拥抱 AI 辅助开发，但我相信复杂的项目中核心的部分依然需要人的智慧来主导</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="heroicons:rocket-launch" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">课程会有主线，那就是开发一个附带 Landing Page 的导航站，并把它逐渐扩展为一个全功能的网站</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="heroicons:heart" class="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                <span class="text-justify">我们会成为课程相关的开源项目的第一批共同维护者，相应的，是同学、网友、也是朋友</span>
              </div>
            </div>
          </div>
          <div>
            <img src="/images/about/3.png" alt="课程构想" class="rounded-lg object-contain w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
