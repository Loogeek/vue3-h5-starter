# AGENTS.md - Vue3 H5 Template 项目规范

> 本文档是项目的项目规范主入口（Single Source of Truth），适用于所有 AI 编码工具。
> 行为边界与安全红线补充定义在 `CONSTITUTION.md`。
> 工具专属入口文件负责引导 AI 先读取本文件：
> - Claude Code: `CLAUDE.md`
> - Cursor: `.cursor/rules/project.mdc`
> - GitHub Copilot: `.github/copilot-instructions.md`
>
> 最后更新：2026-04

---

## 项目概述

基于 Vue 3 的移动端 H5 应用脚手架模板，提供开箱即用的移动端开发体验。

**适用场景：** 移动端 H5 应用、微信公众号网页、混合 App 内嵌页面

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue | 3.5+ |
| 构建工具 | Vite | 8.x |
| 语言 | TypeScript | 5.6+ |
| 状态管理 | Pinia | 2.x |
| 路由 | Vue Router | 4.x |
| UI 组件库 | Vant | 4.x |
| CSS 框架 | Tailwind CSS | 4.x |
| 数据请求 | TanStack Query | 5.x |
| 工具函数 | VueUse | 14.x |
| 包管理器 | pnpm | - |
| Node.js | - | >= 22.21.1 |

## 目录结构

```
src/
├── api/          # API 接口定义
├── assets/       # 静态资源（图片、字体等）
├── components/   # 公共组件（跨页面复用）
├── composables/  # Composable hooks（含 TanStack Query hooks）
├── enums/        # 枚举类型定义
├── hooks/        # 自定义 Composition API hooks
├── layout/       # 布局组件
├── plugins/      # 插件配置（TanStack Query 等）
├── router/       # 路由配置
├── store/        # Pinia 状态管理
├── styles/       # 全局样式
├── typings/      # TypeScript 类型定义
├── utils/        # 工具函数
├── views/        # 页面组件（文件路由）
├── App.vue       # 根组件
├── main.ts       # 应用入口
└── settings.ts   # 应用配置
```

### 文件路由

本项目使用 `unplugin-vue-router` 实现文件路由，`src/views/` 目录结构自动映射为路由：

- `src/views/(home)/index.vue` → `/`（括号分组不参与 URL）
- `src/views/(home)/query/[id].vue` → `/query/:id`（动态参数）
- `src/views/(home)/routes/[slug].vue` → `/routes/:slug`（动态参数）
- `src/views/tools/index.vue` → `/tools`
- `src/views/**/components/` 目录不会生成路由

---

## 编码规范

### Vue 组件

- **必须使用** `<script setup lang="ts">` 语法
- **必须使用** Composition API，禁止 Options API
- 组件文件名：PascalCase（`UserProfile.vue`）
- 页面文件名：kebab-case（`user-profile/index.vue`）
- block 顺序：`<script>` → `<template>` → `<style>`

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  update: [value: string]
  close: []
}>()

const isLoading = ref(false)
const displayCount = computed(() => `Count: ${props.count}`)
</script>
```

### 组件拆分

- 单个 `.vue` 文件**建议不超过 800 行**，超过时拆分子组件
- 页面子组件放在**同级 `components/` 目录**（不会生成路由）
  - 例：`src/views/user/components/UserAvatar.vue`
- `src/components/` 仅存放**跨页面复用**的公共组件
- 拆分时机：可复用 UI 片段、独立业务逻辑块、复杂表单/列表
- 非 UI 的可复用逻辑 → `composables/` 或 `hooks/`

### TypeScript

- 所有变量和函数参数必须声明类型
- `interface` 定义对象类型，`type` 定义联合类型
- 避免 `any`，必要时使用 `unknown`
- 类型定义文件放在 `src/typings/`

### 样式

- 优先使用 Tailwind CSS 原子类
- 必要时使用 scoped Less
- px 单位会被 PostCSS 自动转换为 vmin，按 375px 设计稿编写即可

### Pinia 状态管理

使用 Composition API 风格（Setup Store）：

```typescript
export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials: LoginParams) {
    // ...
  }

  function logout() {
    token.value = ''
    userInfo.value = null
  }

  return { token, userInfo, isLoggedIn, login, logout }
})
```

### 数据请求

- 使用 TanStack Query（useQuery / useMutation）管理服务端状态
- Query hooks 放在 `src/composables/`
- 底层使用 `src/utils/http/` 的 axios 封装

### API 自动导入

项目已配置 `unplugin-auto-import` 和 `unplugin-vue-components`，以下无需手动导入：

- **Vue**: `ref`, `reactive`, `computed`, `watch`, `onMounted` 等
- **Vue Router**: `useRouter`, `useRoute`
- **Pinia**: `storeToRefs`
- **VueUse**: 所有 composables
- **TanStack Query**: `useQuery`, `useMutation`, `useInfiniteQuery`, `useQueryClient` 等
- **Vant 组件**: 模板中直接使用 `<van-button>` 等
- **Vant 方法**: `showToast`, `showDialog`, `showNotify` 等

### 安全规则

- 禁止在代码中硬编码 API 密钥、密码等敏感信息
- API 调用必须包含错误处理
- 禁止向未知第三方发送数据

### 行为约束

- 只修改完成任务所需的最少代码
- 不进行超出需求范围的重构
- 重大变更前询问用户确认
- 使用中文沟通

### AI 执行原则

- **先思考再编码**：先明确假设、歧义和权衡，不清楚时先澄清
- **简洁优先**：避免推测性功能、过早抽象和无必要配置
- **目标驱动**：先定义成功标准和验证方式，再开始实现
- 详细约束以 `CONSTITUTION.md` 为准

---

## 包管理器

**必须**使用 pnpm，禁止使用 npm、yarn。

## 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动开发服务器
pnpm build          # 构建生产版本
pnpm preview        # 预览生产构建
pnpm type-check     # 类型检查
pnpm lint           # ESLint 检查 + 格式化
pnpm release        # 版本发布
```

## 环境配置

| 文件 | 用途 |
|------|------|
| `.env.development` | 开发环境变量 |
| `.env.production` | 生产环境变量 |
| `.env.test` | 测试环境变量 |

环境变量必须以 `VITE_` 前缀开头才能在代码中访问：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 开发工具

| 工具 | 说明 |
|------|------|
| VConsole | 开发模式自动启用，移动端调试（Console / 网络 / DOM / 存储） |
| Vue DevTools | 组件树 / Pinia 状态 / 路由 / 性能分析 |
| Code Inspector | 点击元素定位源码（Mac: `Option+Shift+Click`，Win: `Alt+Shift+Click`） |

---

## Agent 定义

以下定义了项目中可用的 AI Agent 角色及其职责，所有 AI 工具均可参考。

### code-reviewer — 代码审查

**触发：** 用户请求代码审查、提交前检查、PR 审核

- 检查 TypeScript 类型定义完整性
- 验证 Composition API 规范、组件命名、目录结构
- 检查 `.vue` 文件是否超 800 行
- 安全审查：硬编码敏感信息、API 错误处理、XSS 隐患

输出格式：

```markdown
## 代码审查报告

### 问题
- [ ] [严重] 文件:行号 - 问题描述
- [ ] [建议] 文件:行号 - 优化建议

### 总结
通过/需要修改
```

### component-builder — 组件开发

**触发：** 创建新组件、重构现有组件

- 使用 `<script setup lang="ts">` 创建 Vue SFC
- 正确定义 Props / Emits 类型
- 遵循组件拆分规范
- 优先使用 Tailwind CSS + Vant 4

### bug-hunter — 问题诊断

**触发：** Bug 报告、控制台错误、功能异常

诊断流程：收集信息 → 定位问题 → 分析原因 → 提供方案 → 验证修复

### doc-writer — 文档编写

**触发：** 新功能文档、文档更新

- 使用中文编写，包含代码示例
- 确保文档与代码同步

---

## AI 辅助开发注意事项

1. **遵循现有代码风格** — 参考 `src/` 下现有组件写法
2. **使用项目已有工具** — 优先使用 VueUse、Vant 等已集成的库
3. **文件路由约定** — 新页面放在 `src/views/` 对应目录
4. **类型安全** — 所有新代码必须通过 TypeScript 类型检查
5. **样式方案** — 优先 Tailwind CSS，必要时 scoped Less
6. **先澄清再实现** — 对模糊需求先列出假设与方案，不要静默猜测
7. **避免过度工程化** — 单次使用的逻辑优先直接实现，必要时再抽象
8. **先定义验证方式** — 复杂任务先明确成功标准、测试或检查方法
