export const usePageTitle = (subtitle?: string, description?: string) => {
  const baseTitle = 'Web 开发课程资源'
  const homePageTitle = `${baseTitle} | Web 开发工具、资源与技术教程`
  const baseDescription = 'Web 开发课程相关的工具、资源、技术和教程的综合性资源网站，为开发者提供实用的学习参考'

  const title = subtitle
    ? `${subtitle} | ${baseTitle}`
    : homePageTitle

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: description || baseDescription
      }
    ]
  })

  return {
    title
  }
}
