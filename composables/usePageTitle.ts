export const usePageTitle = (subtitle?: string, description?: string) => {
  const baseTitle = 'Web 开发从入门到上线'
  const homePageTitle = `${baseTitle} ｜ 从零开始学习使用 AI 进行 Web 全栈开发`
  const baseDescription = '从零开始学习 Web 开发，掌握前端技术栈，完成项目从开发到上线的全过程'

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
