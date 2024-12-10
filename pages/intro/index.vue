<script setup lang="ts">
definePageMeta({
  layout: 'intro'
})

usePageTitle('课程介绍', '详细了解课程内容、教学方式和学习路径，帮助你规划自己的学习之旅');

const sections = [
  {
    label: '启动 Kickoff',
    icon: 'i-heroicons-rocket-launch',
    items: [
      {
        title: '环境配置',
        description: '完整的开发环境配置指南',
        content: [
          '开发有关的基本操作讲解',
          {
            title: 'Node:',
            items: ['原生安装', 'nvm 安装', 'nvm 配置']
          },
          {
            title: 'NPM 配置',
            items: ['淘宝源配置']
          },
          {
            title: 'Chrome 及插件',
            items: ['Vue 插件', 'Nuxt 插件']
          },
          {
            title: '开发工具 IDE：',
            items: ['主力：Cursor + Plus', '平替：VSCode + Codeium']
          },
          {
            title: '平台账号：',
            items: ['部署和域名相关', 'GitHub', 'Vercel', 'Cloudflare']
          }
        ]
      }
    ]
  },
  {
    label: '理论基础 Theories',
    icon: 'i-heroicons-academic-cap',
    items: [
      {
        title: 'Web 开发基础概念',
        description: '理解现代 Web 开发的核心概念',
        content: [
          '什么是客户端（前端）和服务端（后端）？',
          'Nuxt 和 Next',
          '什么是 SSR？',
          '什么是 Vue？',
          '什么是 Nodejs？',
          '什么是 Typescript？',
          '随时穿插「十万个为什么」'
        ]
      }
    ]
  },
  {
    label: '基础知识 Basics',
    icon: 'i-heroicons-book-open',
    items: [
      {
        title: '核心技术文档',
        description: '快速了解主要技术栈文档',
        content: [
          'HTML 核心文档 Quick Through',
          'CSS 核心文档 Quick Through',
          'Javascript 核心文档 Quick Through',
          'Vue 官方文档 Quick Through',
          'Nuxt 官方文档 Go Through'
        ]
      }
    ]
  },
  {
    label: '新手教程 Tutorial',
    icon: 'i-heroicons-light-bulb',
    items: [
      {
        title: '项目起步',
        description: '从零开始搭建项目',
        content: [
          '基于官方模版的本地开发',
          '基于 Vercel 的发布流程',
          '官方模版结构及本地启动'
        ]
      },
      {
        title: '项目进阶',
        description: '深入项目开发实践',
        content: [
          '组件化和模版的使用',
          '内容管理模块集成',
          '基于内容管理模块的实践',
          '流量分析：Vercel Analytics',
          '用户体验优化'
        ]
      }
    ]
  },
  {
    label: '实际项目 Projects',
    icon: 'i-heroicons-computer-desktop',
    defaultOpen: true,
    items: [
      {
        title: '课程官网迭代',
        description: '实战课程网站开发',
        content: [
          'FAQ 页面、Promo 页面',
          '合作伙伴页面',
          '课程大纲页面',
          '作品展示页面',
          '体验优化',
          'SEO 优化'
        ]
      },
      {
        title: '导航站项目',
        description: '开源导航站完整开发流程',
        content: [
          '基础技术栈（继承新手教程项目）',
          '产品功能设计',
          '技术架构设计',
          '核心功能 MVP 实现',
          '基于 AI 的内容准备',
          '自动化内容准备'
        ]
      },
      {
        title: '技术栈扩展',
        description: '集成更多现代 Web 技术',
        content: [
          '数据管理：Supabase',
          '用户管理：Supabase',
          '多语言：简体、英语、日语',
          '分析',
          '广告',
          '付费'
        ]
      }
    ]
  },
  {
    label: '进阶 Advance',
    icon: 'i-heroicons-arrow-trending-up',
    items: [
      {
        title: '移动端开发',
        description: '使用 Capacitor 构建移动应用',
        content: ['移动客户端 Mobile Apps（基于 Capacitor）']
      },
      {
        title: 'VPS 部署',
        description: '完整的服务器部署流程',
        content: [
          'Docker 相关',
          '本地构建',
          '基于 Github Action 构建',
          'Dockerhub',
          'VPS 初始化配置与安装',
          'VPS 应用发布'
        ]
      }
    ]
  },
  {
    label: '社区协作 Collaborate',
    icon: 'i-heroicons-user-group',
    items: [
      {
        title: '开源项目协作',
        description: '参与开源项目开发',
        content: [
          'GitHub 的 workflow',
          '核心：导航站源码',
          '其他：开发属于学员自己的有意思的开源项目'
        ]
      }
    ]
  }
]
</script>

<template>
  <div class="intro-page">
    <div class="mx-auto max-w-4xl">
      <LandingSectionhead>
        <template v-slot:title>课程简介</template>
        <template v-slot:desc>以下课程结构是目前预想中的简要版本，课程期间会根据学员反馈做内容方向、篇幅、细节、顺序等方面的调整，以
          <a class="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline decoration-2 underline-offset-2"
            href="https://indie-startups.notion.site/" target="_blank" rel="noopener noreferrer">课程内部笔记中的实际 Schedule
            和课程结构</a>
          为准</template>
      </LandingSectionhead>

      <UAccordion :items="sections" class="mt-16">
        <template #item="{ item, index, open }">
          <div>
            <div v-if="open" class="p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(section, sectionIndex) in item.items" :key="sectionIndex"
                  class="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg flex flex-col">
                  <div class="p-4 flex-grow">
                    <h3 class="text-xl font-semibold mb-3">{{ section.title }}</h3>
                    <ul class="space-y-2">
                      <template v-for="(content, contentIndex) in section.content" :key="contentIndex">
                        <li v-if="typeof content === 'string'" class="ml-4 flex items-center">
                          <UIcon name="i-heroicons-check-circle" class="text-green-500 mr-2 flex-shrink-0" />
                          <span>{{ content }}</span>
                        </li>
                        <li v-else class="ml-4">
                          <div class="font-medium mb-1">{{ content.title }}</div>
                          <ul class="ml-4 space-y-1">
                            <li v-for="(subItem, subIndex) in content.items" :key="subIndex" class="flex items-center">
                              <UIcon name="i-heroicons-check-circle" class="text-green-500 mr-2 flex-shrink-0" />
                              <span>{{ subItem }}</span>
                            </li>
                          </ul>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ section.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<style scoped>
.dark .backdrop-blur-md {
  background-color: rgba(31, 41, 55, 0.3);
}
</style>
