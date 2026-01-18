import { defineNuxtConfig } from 'nuxt/config'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-resend",
  ],

  // Site Configuration
  site: {
    url: "https://nav.justincourse.com",
    name: "Web 开发课程资源导航",
    description:
      "Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考",
  },

  sitemap: {
    exclude: ["/submit/**"],
    urls: ["/resources", "/partner", "/about", "/contact"],
    strictNuxtContentPaths: true,
    sources: [
      '/api/__sitemap__/urls'
    ],
    defaults: {
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  app: {
    head: {
      title: "Web 开发课程资源导航",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考",
        },
        { property: "og:url", content: "https://nav.justincourse.com/" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Web 开发课程资源导航" },
        {
          property: "og:description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考",
        },
        {
          property: "og:image",
          content: "https://nav.justincourse.com/og-image-0.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:domain", content: "nav.justincourse.com" },
        { property: "twitter:url", content: "https://nav.justincourse.com/" },
        { name: "twitter:title", content: "Web 开发课程资源导航" },
        {
          name: "twitter:description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考",
        },
        {
          name: "twitter:image",
          content: "https://nav.justincourse.com/og-image-0.png",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-YLXX3YMC04",
          async: true,
        },
        {
          children: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YLXX3YMC04');`,
        },
      ],
    },
  },

  compatibilityDate: "2024-11-05",

  colorMode: {
    classSuffix: "",
    fallback: "light", // 默认颜色模式
    preference: "system", // 优先使用系统颜色模式
    dataValue: "theme",
  },

  content: {
    highlight: {
      theme: "github-dark",
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },
});
