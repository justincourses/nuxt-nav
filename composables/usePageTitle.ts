export interface PageSeoOptions {
  /** Full custom <title> overriding `${subtitle} | ${baseTitle}` when provided. */
  seoTitle?: string
  /** Relative or absolute image path for og:image and twitter:image. */
  image?: string
  /** Open Graph type (e.g. 'article'). */
  ogType?: 'website' | 'article'
}

export const usePageTitle = (
  subtitle?: string,
  description?: string,
  options?: PageSeoOptions
) => {
  const baseTitle = 'Web 开发课程资源'
  const homePageTitle = `${baseTitle} | Web 开发工具、资源与技术教程`
  const baseDescription = 'Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考'

  const title = options?.seoTitle?.trim() || (
    subtitle ? `${subtitle} | ${baseTitle}` : homePageTitle
  )
  const metaDescription = description || baseDescription
  const siteUrl = useSiteConfig().url.replace(/\/+$/, '')

  const resolveImageUrl = (img?: string) => {
    if (!img) return undefined
    if (/^https?:\/\//i.test(img)) return img
    const normalized = img.startsWith('/') ? img : `/${img}`
    return `${siteUrl}${normalized}`
  }

  const imageUrl = resolveImageUrl(options?.image)

  const meta: Array<Record<string, string>> = [
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    }
  ]

  if (options?.ogType) {
    meta.push({
      property: 'og:type',
      content: options.ogType
    })
  }

  if (imageUrl) {
    meta.push(
      {
        property: 'og:image',
        content: imageUrl
      },
      {
        name: 'twitter:image',
        content: imageUrl
      }
    )
  }

  useHead({
    title,
    meta
  })

  return {
    title
  }
}
