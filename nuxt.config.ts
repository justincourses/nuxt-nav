import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

// Every real page, built from content/ at build time. Used for prerendering and by
// server/middleware/guard.ts, which answers anything else with a cheap 404.
const fromHere = (p: string) => fileURLToPath(new URL(p, import.meta.url))
const contentPages = ['partner', 'resources'].flatMap((section) =>
  readdirSync(fromHere(`./content/${section}`))
    .filter((file) => file.endsWith('.md'))
    .map((file) => `/${section}/${file.replace(/\.md$/, '').toLowerCase()}`)
)
const knownPages = ['/', '/partner', '/resources', '/about', '/contact', '/submit', ...contentPages]
// First path segments that never render a page: public/ entries, Nuxt internals, API routes.
const passthroughSegments = [
  ...readdirSync(fromHere('./public')),
  '_nuxt', '__nuxt_error', '__nuxt_island', '_ipx', 'api', '__sitemap__', 'sitemap.xml',
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    guard: { knownPages, passthroughSegments },
  },

  // Link the CSS bundle instead of inlining ~220KB of it into every HTML response.
  features: { inlineStyles: false },

  nitro: {
    prerender: {
      // Content only changes on deploy, so render every real page once at build time:
      // visitors get static files and the Pages Function burns no CPU on them.
      // Except /resources: it is ssr:false (an SPA shell that is cheap to serve), and a
      // prerendered payload breaks its initial query when opened as /resources?keyword=…
      routes: [...knownPages.filter((p) => p !== '/resources'), '/sitemap.xml'],
      crawlLinks: false,
      // Write partner/ihezu.html, not partner/ihezu/index.html: otherwise Cloudflare Pages
      // 308-redirects /partner/ihezu to /partner/ihezu/, away from the canonical URL.
      autoSubfolderIndex: false,
    },
    // _routes.json allows 100 rules; one wildcard keeps every image out of the Function.
    cloudflare: { pages: { routes: { exclude: ['/images/*'] } } },
  },
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
      htmlAttrs: { lang: "zh-CN" },
      title: "Web 开发课程资源导航",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考",
        },
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
