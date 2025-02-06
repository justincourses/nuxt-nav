# Web 开发课程资源导航

Web 开发课程相关的工具、资源、技术和教程的综合性资源导航网站，为开发者提供实用的学习参考。

## 参与贡献

如果你想为项目做出贡献，请先阅读 [贡献指南](./CONTRIBUTING.md)。

## 开发环境设置

1. 克隆项目后，首先安装依赖：

```bash
npm install
```

2. 配置环境变量：
   - 复制 `.env.example` 为 `.env`
   - 更新以下环境变量：
     - `NUXT_RESEND_API_KEY`: Resend API 密钥（访问 https://resend.com 注册账号，在 API Keys 页面生成）
     - `NUXT_RESEND_FROM_EMAIL`: 发送邮件的邮箱地址
     - `NUXT_RESEND_TO_EMAIL`: 接收邮件的邮箱地址

3. 启动开发服务器：

可以使用以下两种方式之一：

```bash
# 方式 1：直接启动
npm run dev

# 方式 2：使用脚本启动（包含依赖安装）
sh dev.sh
```

开发服务器将在 `http://localhost:3000` 启动。

## 生产环境构建

构建生产环境应用：

```bash
npm run build
```

本地预览生产环境构建：

```bash
npm run preview
```

## 部署说明

### Cloudflare Pages 部署

1. 在 Cloudflare Pages 创建新项目
2. 连接 Git 仓库
3. 构建设置：
   - 框架预设：选择 "Nuxt"
   - 环境变量：添加 `.env` 中的所有变量

### Vercel 部署

1. 在 Vercel 导入项目
2. 构建设置会自动配置
3. 环境变量：
   - 在项目设置中添加 `.env` 中的所有变量
   - 确保在所有环境（Production/Preview/Development）中都配置了环境变量
