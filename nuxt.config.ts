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
    "nuxt-icon",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
  ],

  app: {
    head: {
      title: "Web 开发课程资源",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考",
        },
        { property: "og:url", content: "https://justincourse.com/" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Web 开发课程资源" },
        {
          property: "og:description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考",
        },
        {
          property: "og:image",
          content: "https://justincourse.com/og-image-0.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:domain", content: "justincourse.com" },
        { property: "twitter:url", content: "https://justincourse.com/" },
        { name: "twitter:title", content: "Web 开发课程资源" },
        {
          name: "twitter:description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考",
        },
        {
          name: "twitter:image",
          content: "https://justincourse.com/og-image-0.png",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        { src: "/tracking.js" },
        {
          src: "//cdn.trackdesk.com/tracking.js",
          async: true
        },
        {
          children: `(function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
          trackdesk('yoko', 'click');`,
          type: 'text/javascript'
        }
      ],
    },
  },

  compatibilityDate: "2024-11-05",

  site: {
    url: "https://justincourse.com",
    name: "Web 开发课程资源",
    description:
      "Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考",
    defaultLocale: "zh",
    identity: {
      type: "Organization",
      name: "JustinCourse",
      logo: "https://justincourse.com/og-image-0.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "@interjc",
      creator: "@interjc",
    },
    trailingSlash: true,
    indexable: true,
    robots: {
      index: true,
      follow: true,
    },
    sitemap: {
      urls: [],
      excludeUrls: ["/admin", "/private"],
      hostname: "https://justincourse.com",
      gzip: true,
      xsl: true,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 1.0,
      defaults: {
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    },
  },

  colorMode: {
    classSuffix: "",
    fallback: "light", // 默认颜色模式
    preference: "system", // 优先使用系统颜色模式
    dataValue: "theme",
  },

  content: {
    highlight: {
      theme: 'github-dark'
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  }
});
