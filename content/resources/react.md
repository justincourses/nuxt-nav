---
title: React
summary: 用于构建 Web 和原生用户界面的库
image: /images/content/3d-printing-3758154_1920.jpg
icon: logos:react
tags:
  - Frontend
  - Framework
  - JavaScript
  - UI库
category: 框架
description: React 是由 Meta（原 Facebook）开发的用户界面库，当前版本 v19.2。通过组件化、声明式编程和强大的生态系统，让构建交互式用户界面变得简单高效。
ref: https://react.dev/
---

React 是用于构建 Web 和原生用户界面的 JavaScript 库，以其组件化、声明式和高性能的特点而广受欢迎。

## 核心优势

### 1. 组件化开发
- **独立组件** - 将 UI 拆分为独立的可复用组件
- **组合性** - 像搭积木一样组合组件构建复杂界面
- **封装性** - 每个组件管理自己的状态和逻辑
- **可维护** - 组件独立开发、测试和维护

### 2. 声明式编程
- **JSX 语法** - 在 JavaScript 中编写类 HTML 标记
- **直观易懂** - 代码即文档，易于理解和维护
- **类型安全** - 配合 TypeScript 提供完整类型检查
- **开发体验** - 优秀的开发者工具和错误提示

### 3. 最新特性（React 19）
- **React Compiler** - 自动优化性能，无需手动 memo
- **Server Components** - 在服务端渲染组件，减少客户端 JS
- **Server Actions** - 直接调用服务端函数，无需构建 API
- **并发特性** - Suspense、Transitions 等提升用户体验
- **Hooks** - useState、useEffect 等让函数组件功能完整

### 4. 强大生态

**全栈框架**
- **Next.js** - Vercel 推荐的全栈 React 框架
- **Remix** - 专注于 Web 标准的现代框架
- **React Router** - 官方推荐的客户端路由方案

**状态管理**
- Redux、Zustand、Jotai
- TanStack Query（数据获取）
- Recoil（原子化状态）

**UI 组件库**
- Material-UI、Ant Design
- Chakra UI、Radix UI
- shadcn/ui、Tailwind UI

## 主要功能

**组件系统**
- 函数组件和类组件
- Props 数据传递
- Children 组件嵌套
- Fragment 多节点渲染

**Hooks API**
- useState - 状态管理
- useEffect - 副作用处理
- useContext - 跨组件通信
- useRef - DOM 引用
- useMemo / useCallback - 性能优化
- useReducer - 复杂状态管理
- Custom Hooks - 自定义逻辑复用

**高级特性**
- Suspense - 异步组件加载
- Error Boundaries - 错误处理
- Portals - 跨层级渲染
- Lazy Loading - 代码分割
- Streaming SSR - 流式服务端渲染

## 使用场景

**Web 应用**
- 单页应用（SPA）
- 多页应用（MPA）
- 服务端渲染（SSR）
- 静态站点生成（SSG）
- 渐进式 Web 应用（PWA）

**原生应用**
- **React Native** - iOS 和 Android 应用
- **Expo** - 快速构建原生应用
- 桌面应用（Electron）
- 跨平台方案

**其他场景**
- 组件库开发
- 微前端架构
- 数据可视化
- 管理后台系统

## 性能优化

**编译器优化**
- React Compiler 自动优化
- 无需手动使用 memo
- 自动依赖追踪

**渲染优化**
- 虚拟 DOM Diff 算法
- 批量更新机制
- 并发渲染
- 优先级调度

**开发工具**
- React DevTools - 组件调试
- Profiler - 性能分析
- Strict Mode - 开发时检查
- Fast Refresh - 热更新

## 学习资源

**官方文档**
- [快速开始](https://react.dev/learn) - 交互式教程
- [API 参考](https://react.dev/reference/react) - 完整 API 文档
- [React Hooks](https://react.dev/reference/react/hooks) - Hooks 详解
- [示例代码](https://react.dev/learn/describing-the-ui) - 实用示例

**进阶资源**
- [Thinking in React](https://react.dev/learn/thinking-in-react) - React 思维方式
- [React Conf](https://react.dev/community) - 官方技术大会
- [React Blog](https://react.dev/blog) - 最新动态
- [社区指南](https://react.dev/community) - 社区资源

## 社区生态

**全球社区**
- 每月 200 万+ 开发者访问文档
- Meta 内部 10 万+ React 组件
- 被 Nike、华盛顿邮报等顶级公司使用
- 活跃的社区贡献和插件生态

**企业采用**
- Meta（Facebook、Instagram）
- Netflix、Airbnb
- Uber、Discord
- Notion、Atlassian

React 不仅是一个库，更是一个架构、一个生态系统、一个社区。它让开发者能够使用相同的技能构建 Web 和原生应用，无论团队大小，都能获得一致的开发体验。
