# vue3-h5-starter

[English](./README.md) / 简体中文

一个基于 Vue 3 生态的移动端 H5 应用模板，适用于移动端网页、微信公众号页面和混合 App 内嵌页面。

[![license](https://img.shields.io/github/license/Loogeek/vue3-h5-starter)](./LICENSE)
[![version](https://img.shields.io/github/package-json/v/Loogeek/vue3-h5-starter)](./package.json)
[![repo size](https://img.shields.io/github/repo-size/Loogeek/vue3-h5-starter)](https://github.com/Loogeek/vue3-h5-starter)
[![issues](https://img.shields.io/github/issues/Loogeek/vue3-h5-starter)](https://github.com/Loogeek/vue3-h5-starter/issues)

## 项目介绍

`vue3-h5-starter` 是一个面向移动端 H5 项目的 Vue 3 脚手架。它把移动端项目常用的基础能力放在一起：路由、状态管理、服务端数据请求、本地 Mock、移动端组件、视口适配、开发调试工具，以及方便 AI 协作的项目规范。

项目根路径同时也是官网首页。这个首页可以直接部署成公开站点，内置示例覆盖请求缓存、动态路由、列表滚动恢复、深色模式、图标和开发工具等常见场景。

推荐填写到 GitHub About 的描述：

> A Vue 3 mobile H5 starter template with Vite 8, Tailwind CSS v4, Vant 4, Pinia, TanStack Query, built-in examples, and AI-ready conventions.

## 特性

- Vue 3.5、Vite 8、TypeScript、pnpm
- 基于 `unplugin-vue-router` 的文件路由
- API 自动导入和组件自动注册
- Vant 4 移动端组件库
- Tailwind CSS v4，并支持 `px` 到 `vmin` 的移动端视口适配
- Pinia 管理客户端状态，TanStack Query 管理服务端状态
- Axios 封装、请求示例和本地 Mock 接口
- 深色模式、本地 SVG 图标和 Iconify 图标
- VConsole、Vue DevTools、Code Inspector 开发调试工具
- Vitest、Vue Test Utils、happy-dom 测试配置
- 面向 Codex、Claude Code、Cursor、GitHub Copilot 的 AI 协作入口文件
- 官网式首页和内置示例入口

## 官网

首页位于 `/`，直接使用项目源码构建。它会介绍模板定位、展示技术栈、跳转 GitHub 仓库，并提供内置示例入口。

项目已包含 `netlify.toml`，Netlify 可以使用 `pnpm build` 构建，并发布 `dist/`。

## 内置能力

### UI 框架

- [Vant](https://vant-ui.github.io/vant/) - 移动端 Vue 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS
- [Iconify](https://iconify.design/) - 图标组件
- 通过 `vite-plugin-svg-icons` 支持本地 SVG 图标

### 插件

- [Vue Router](https://router.vuejs.org/) 文件路由
- [Pinia](https://pinia.vuejs.org/) 状态管理
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview) 服务端状态管理
- [VueUse](https://vueuse.org/) 组合式工具函数
- [vite-plugin-mock-dev-server](https://vite-plugin-mock-dev-server.netlify.app/) 本地 Mock 接口
- `vite-plugin-vconsole`、`vite-plugin-vue-devtools`、`vite-plugin-compression`、`@vitejs/plugin-legacy`

### 编码风格

- Vue 3 Composition API 和 `<script setup lang="ts">`
- ESLint 自动修复流程
- pnpm 安装约束
- Husky 和 Commitlint 提交约束

### AI 协作

- `AGENTS.md` - 项目规范入口
- `CONSTITUTION.md` - 安全边界和行为约束
- `CLAUDE.md`、`.cursor/rules/project.mdc`、`.github/copilot-instructions.md` - 不同 AI 工具的入口文件
- `.agents/skills` - 本地 Vue、Router、Pinia、Testing 等技能文件

## 快速开始

> 需要 Node.js 22.21.1+ 和 pnpm。

```bash
git clone https://github.com/Loogeek/vue3-h5-starter.git
cd vue3-h5-starter
nvm use
npm install -g pnpm
pnpm install
pnpm dev
```

## 使用

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

构建产物位于 `dist/`。项目已内置最小 `netlify.toml`，可作为单页应用部署到 Netlify。

### 预览

```bash
pnpm preview
```

## 内置示例

- `/query` - TanStack Query 列表、详情、创建流程
- `/routes` - 文件路由和动态路由参数
- `/scroll-cache` - keep-alive 列表滚动恢复
- `/tools` - 图标、深色模式、AI 协作和开发工具

### 检查

```bash
pnpm lint
pnpm type-check
pnpm test:run
```

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `VITE_PUBLIC_PATH` | 应用部署基础路径 |
| `VITE_BASE_API` | 默认 API 前缀 |
| `VITE_PROXY_TARGET` | 开发环境可选代理目标，配置后会代理 `/dev-api` |
| `VITE_CDN_DEPS` | 是否通过 `vite-plugin-cdn2` 启用 CDN 加速 |

## 目录概览

```text
src/
├── api/          # API 接口定义
├── components/   # 公共组件
├── composables/  # 可复用 composables 和 TanStack Query hooks
├── hooks/        # 自定义 hooks
├── plugins/      # 插件配置
├── router/       # 路由入口
├── store/        # Pinia stores
├── styles/       # 全局样式
├── utils/        # 工具函数
└── views/        # 文件路由页面
```

## 使用清单

基于这个模板创建新项目时，建议先更新以下内容：

- 更新 `package.json` 里的 `name`、`version`、`description`
- 更新 `index.html` 里的页面标题和应用元信息
- 更新 `public/` 和 `src/assets/` 里的图标与视觉资源
- 更新环境变量和代理配置
- 移除不需要的示例页面、Mock 数据或文档
- 更新 `LICENSE` 里的作者信息

## 说明

- Tailwind CSS v4 面向现代浏览器；如果必须兼容较老的内嵌 WebView，建议在开工前评估是否使用 Tailwind CSS v3。
- Mock 服务只在开发环境启用。
- CDN 加速默认关闭，由 `VITE_CDN_DEPS` 控制。

## 许可证

[MIT](./LICENSE) License
