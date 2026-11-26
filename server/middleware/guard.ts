// Answers paths that are not real pages with a small static 404 before Vue SSR runs.
// A full SSR render costs 10–300ms of CPU (the Workers free plan allows 10ms), and
// /partner/* and /resources/* used to render a 200 "Document not found" page for any
// slug, so scanners could burn CPU on endless made-up paths.
// The page list comes from nuxt.config.ts (runtimeConfig.guard), built from content/.

const NOT_FOUND_HTML = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>页面不存在 | Web 开发课程资源</title>
<style>
  :root { color-scheme: light dark; --fg: #0f172a; --muted: #64748b; --bg: #fff; --accent: #0284c7; }
  @media (prefers-color-scheme: dark) { :root { --fg: #f1f5f9; --muted: #94a3b8; --bg: #0f172a; --accent: #38bdf8; } }
  body { margin: 0; background: var(--bg); color: var(--fg);
         font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; }
  main { text-align: center; padding: 20vh 16px 24px; }
  h1 { font-size: 64px; margin: 0; }
  p { color: var(--muted); margin: 8px 0 24px; }
  a { color: var(--accent); text-decoration: none; margin: 0 12px; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
<main>
  <h1>404</h1>
  <p>你访问的页面不存在</p>
  <a href="/">返回首页</a><a href="/resources">学习资源</a><a href="/partner">赞助</a>
</main>
</body>
</html>`

const PAYLOAD_SUFFIX = '/_payload.json'

let knownPages: Set<string> | undefined
let passthrough: Set<string> | undefined

export default defineEventHandler((event) => {
  if (import.meta.dev) return

  const { guard } = useRuntimeConfig(event)
  knownPages ??= new Set(guard.knownPages)
  passthrough ??= new Set(guard.passthroughSegments)

  const url = getRequestURL(event)
  let path = url.pathname
  // Client-side navigation to a prerendered page loads /<page>/_payload.json.
  if (path.endsWith(PAYLOAD_SUFFIX)) path = path.slice(0, -PAYLOAD_SUFFIX.length) || '/'

  if (knownPages.has(path)) return
  if (passthrough.has(path.split('/')[1] ?? '')) return

  // /partner/ihezu/ -> /partner/ihezu (one canonical URL per page)
  if (path.length > 1 && path.endsWith('/') && knownPages.has(path.slice(0, -1))) {
    return sendRedirect(event, path.slice(0, -1) + url.search, 301)
  }

  setResponseStatus(event, 404)
  setResponseHeaders(event, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'public, max-age=600',
    'x-robots-tag': 'noindex',
  })
  return NOT_FOUND_HTML
})
