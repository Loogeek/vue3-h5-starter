# TanStack Query 使用指南

> 本文档介绍如何在 Vue 3 H5 项目中使用 TanStack Query 管理服务端状态。
>
> 示例页面入口：`/query`（开发环境运行后访问）

## 目录

- [为什么使用 TanStack Query](#为什么使用-tanstack-query)
- [核心概念速览](#核心概念速览)
- [项目中的调用链路](#项目中的调用链路)
- [快速上手：完整示例](#快速上手完整示例)
- [useQuery — 数据查询](#usequery--数据查询)
- [useMutation — 数据变更](#usemutation--数据变更)
- [useInfiniteQuery — 无限滚动](#useinfinitequery--无限滚动)
- [常见场景](#常见场景)
- [queryKey 设计规范](#querykey-设计规范)
- [与 Pinia 的职责划分](#与-pinia-的职责划分)
- [DevTools 调试工具](#devtools-调试工具)
- [更多资源](#更多资源)

---

## 为什么使用 TanStack Query

**传统做法的痛点：**

```vue
<!-- ❌ 每个组件重复写一遍 loading/error/data -->
<script setup lang="ts">
const loading = ref(false)
const users = ref([])
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    users.value = await fetchUsers()
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
})
</script>
```

**使用 TanStack Query 后：**

```vue
<!-- ✅ 一行搞定，loading/error/data 全自动 -->
<script setup lang="ts">
const { data: users, isLoading, error } = useUserList()
</script>
```

**核心能力一览：**

| 能力 | 说明 |
|------|------|
| 自动缓存 | 相同请求会优先返回内存里的缓存数据 |
| 请求去重 | 多个组件使用同一 `queryKey`，只发一次请求 |
| 状态统一 | `isLoading`、`error`、`data` 开箱即用，无需手写 |
| 后台刷新 | 数据过期后可能先显示旧缓存，再在后台补拉新数据 |
| DevTools | 开发环境可视化查看缓存状态 |

---

## 核心概念速览

### Query vs Mutation

| 概念 | 用途 | 对应 HTTP | 典型场景 |
|------|------|-----------|----------|
| **Query** | 读取数据 | GET | 获取用户列表、获取详情 |
| **Mutation** | 修改数据 | POST / PUT / DELETE | 创建用户、修改信息 |

### QueryKey（查询键）

唯一标识一个查询，决定了缓存的存储和查找方式：

```typescript
queryKey: ['users', 'list']           // 用户列表
queryKey: ['users', 'detail', '123']  // ID 为 123 的用户详情
queryKey: ['users', 'list', { page }] // 带分页参数的列表
```

### 缓存时间参数

```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 30 * 1000,     // 30s 内数据视为「新鲜」
  gcTime: 5 * 60 * 1000,    // 5 分钟后回收缓存（无组件使用时）
})
```

| 参数 | 含义 | 推荐值 |
|------|------|--------|
| `staleTime` | 数据视为新鲜的时间；超出后重新进入页面时，可能先显示缓存，再后台刷新 | 按业务需求设置，如 30s |
| `gcTime` | 缓存在内存中保留的时间 | 默认 5 分钟 |

---

## 项目中的调用链路

```
组件 → useQuery/useMutation → queryFn → http.request（Axios） → 后端 API / Mock
               ↕
         TanStack Query 缓存
```

- `src/utils/http/` 的 Axios 封装负责：请求拦截、Token 注入、错误码处理
- TanStack Query 在其之上负责：缓存管理、状态管理、请求去重

---

## 快速上手：完整示例

项目内置了一个完整的 TanStack Query 示例，包含 **列表页 → 详情页** 的缓存演示。

### 文件结构

```
mock/
└── user.mock.ts              # Mock 接口（用户列表 + 详情 + 创建）

src/
├── composables/
│   └── useUserQuery.ts       # Query hooks（useUserList / useUserDetail / useCreateUser）
└── views/(home)/query/
    ├── index.vue             # 列表页 — 展示缓存状态
    └── [id].vue              # 详情页 — 动态参数查询
```

### 示例截图


*页面底部的 TanStack Query DevTools 面板实时展示所有 Query 的缓存状态*

### 体验缓存效果

1. 访问 `/query` 查看用户列表（首次加载触发网络请求）
2. 点击某个用户进入详情页
3. 返回列表页 → 30 秒内通常直接使用缓存
4. 等待 30 秒后返回 → 数据已过期，可能先显示缓存，再在后台刷新

### Mock 接口定义

示例使用 `vite-plugin-mock-dev-server` 提供 Mock 接口，无需后端服务即可运行：

```typescript
// mock/user.mock.ts
import { defineMock } from 'vite-plugin-mock-dev-server'

export default [
  // 用户列表
  defineMock({
    url: '/dev-api/users',
    method: 'GET',
    delay: 600,
    body: { code: 0, message: 'success', data: [...] },
  }),

  // 用户详情（动态路由参数）
  defineMock({
    url: '/dev-api/users/:id',
    method: 'GET',
    delay: 400,
    body({ params }) {
      const user = users.find(u => u.id === params.id)
      return { code: 0, message: 'success', data: user }
    },
  }),
]
```

### API 函数

API 函数使用项目的 `http.request` 封装，保持与真实接口一致的写法：

```typescript
// src/composables/useUserQuery.ts
import { http } from '@/utils/http'

function fetchUsers() {
  return http.request<User[]>({ url: '/dev-api/users' })
}

function fetchUserById(id: string) {
  return http.request<User>({ url: `/dev-api/users/${id}` })
}
```

### Query Hook 封装

```typescript
// src/composables/useUserQuery.ts

/** 用户列表 */
export function useUserList() {
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: fetchUsers,
    staleTime: 30 * 1000,   // 30s 内优先使用新鲜缓存
  })
}

/** 用户详情（响应式参数） */
export function useUserDetail(userId: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => fetchUserById(toValue(userId)),
    enabled: () => !!toValue(userId),  // userId 有值才请求
    staleTime: 30 * 1000,
  })
}
```

### 组件中使用

```vue
<!-- src/views/(home)/query/index.vue -->
<script setup lang="ts">
import { useUserList } from '@/composables/useUserQuery'

const { data: users, isLoading, isRefetching, refetch } = useUserList()
</script>

<template>
  <!-- isLoading: 首次加载（无缓存） -->
  <van-skeleton v-if="isLoading" />

  <!-- isRefetching: 已经有缓存，同时后台正在补拉新数据 -->
  <van-tag v-if="isRefetching" type="warning">后台刷新中…</van-tag>

  <van-cell
    v-for="user in users"
    :key="user.id"
    :title="user.name"
    :label="user.email"
  />

  <van-button @click="() => refetch()">手动刷新</van-button>
</template>
```

---

## useQuery — 数据查询

### 基础用法

```typescript
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['user', '123'],
  queryFn: () => http.request<User>({ url: '/api/user/123' }),
})
```

### 返回值说明

| 属性 | 类型 | 说明 |
|------|------|------|
| `data` | `Ref<T>` | 查询返回的数据 |
| `isLoading` | `Ref<boolean>` | 首次加载中（无缓存数据时） |
| `isFetching` | `Ref<boolean>` | 任何请求进行中（包括后台刷新） |
| `isError` | `Ref<boolean>` | 请求出错 |
| `error` | `Ref<Error>` | 错误对象 |
| `dataUpdatedAt` | `Ref<number>` | 数据最后更新时间戳 |
| `refetch` | `Function` | 手动触发重新请求 |

> **`isLoading` vs `isFetching`：** `isLoading` 只在首次加载（没有缓存数据）时为 true；`isFetching` 在任何网络请求进行时都为 true（包括后台刷新）。通常用 `isLoading` 控制骨架屏，用 `isFetching` 显示刷新指示器。

### 响应式参数

queryKey 中包含 ref 时，参数变化会自动触发重新请求：

```vue
<script setup lang="ts">
const keyword = ref('')
const page = ref(1)

const { data } = useQuery({
  queryKey: ['users', 'list', { keyword, page }],
  queryFn: () => http.request({
    url: '/api/users',
    params: { keyword: keyword.value, page: page.value },
  }),
})
</script>

<template>
  <van-search v-model="keyword" placeholder="搜索用户" />
</template>
```

### 条件查询

使用 `enabled` 控制查询是否执行：

```typescript
const userId = ref('')

const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId.value),
  enabled: () => !!userId.value,  // 有值才请求
})
```

### 封装为 Composable（推荐）

```typescript
// src/composables/useUserInfo.ts
export function useUserInfo(userId: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => http.request<User>({ url: `/api/user/${toValue(userId)}` }),
    enabled: () => !!toValue(userId),
  })
}

// 组件中使用
const { data, isLoading } = useUserInfo(() => props.userId)
```

---

## useMutation — 数据变更

### 基础用法

```vue
<script setup lang="ts">
const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationFn: (data: CreateUserParams) =>
    http.request({ url: '/api/users', method: 'POST', data }),
  onSuccess: () => {
    showSuccessToast('创建成功')
    // 使列表缓存失效 → 自动重新请求
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
  onError: (error) => {
    showFailToast(error.message)
  },
})

function handleSubmit() {
  mutate({ name: '新用户', email: 'new@example.com' })
}
</script>

<template>
  <van-button :loading="isPending" @click="handleSubmit">
    创建用户
  </van-button>
</template>
```

### 返回值说明

| 属性 | 类型 | 说明 |
|------|------|------|
| `mutate` | `Function` | 触发变更（不等待结果） |
| `mutateAsync` | `Function` | 触发变更（返回 Promise） |
| `isPending` | `Ref<boolean>` | 变更进行中 |
| `isError` | `Ref<boolean>` | 变更出错 |
| `isSuccess` | `Ref<boolean>` | 变更成功 |
| `data` | `Ref<T>` | 变更返回的数据 |
| `reset` | `Function` | 重置状态 |

### 缓存失效策略

```typescript
const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationFn: updateUser,
  onSuccess: (data, variables) => {
    // 方式 1：使缓存失效 → 触发重新请求（最常用）
    queryClient.invalidateQueries({ queryKey: ['users', 'list'] })

    // 方式 2：直接设置缓存（不重新请求）
    queryClient.setQueryData(['users', 'detail', variables.id], data)

    // 方式 3：模糊匹配，使所有 users 开头的查询失效
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

### 使用 mutateAsync

```typescript
async function handleCreate() {
  try {
    const user = await mutateAsync({ name: '新用户' })
    router.push(`/user/${user.id}`)
  } catch {
    // 错误已在 onError 中处理
  }
}
```

---

## useInfiniteQuery — 无限滚动

### 配合 Vant List 组件

```vue
<script setup lang="ts">
interface PageData {
  list: User[]
  nextCursor: string | null
}

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['users', 'infinite'],
  queryFn: ({ pageParam }) =>
    http.request<PageData>({
      url: '/api/users',
      params: { cursor: pageParam },
    }),
  initialPageParam: '',
  getNextPageParam: lastPage => lastPage.nextCursor,
})

const allUsers = computed(() =>
  data.value?.pages.flatMap(page => page.list) ?? []
)
</script>

<template>
  <van-list
    :finished="!hasNextPage"
    :loading="isFetchingNextPage"
    @load="fetchNextPage()"
  >
    <van-cell v-for="user in allUsers" :key="user.id" :title="user.name" />
  </van-list>
</template>
```

---

## 常见场景

### 轮询

```typescript
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  refetchInterval: 30000,                // 每 30 秒自动刷新
  refetchIntervalInBackground: false,    // 页面不可见时停止
})
```

### 预加载

```typescript
const queryClient = useQueryClient()

// 鼠标悬停时预加载详情
function handleHover(userId: string) {
  queryClient.prefetchQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => fetchUserById(userId),
  })
}
```

### 乐观更新

```typescript
const { mutate } = useMutation({
  mutationFn: toggleLike,
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['post', postId] })
    const previous = queryClient.getQueryData(['post', postId])

    // 先更新 UI
    queryClient.setQueryData(['post', postId], (old: Post) => ({
      ...old, liked: !old.liked,
    }))

    return { previous }
  },
  onError: (_err, postId, context) => {
    // 出错时回滚
    queryClient.setQueryData(['post', postId], context?.previous)
  },
  onSettled: (_data, _error, postId) => {
    queryClient.invalidateQueries({ queryKey: ['post', postId] })
  },
})
```

### 并行查询

```vue
<script setup lang="ts">
const userQuery = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})

const ordersQuery = useQuery({
  queryKey: ['user', userId, 'orders'],
  queryFn: () => fetchUserOrders(userId),
})

const isLoading = computed(() =>
  userQuery.isLoading.value || ordersQuery.isLoading.value
)
</script>
```

### 依赖查询

```typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})

const { data: orders } = useQuery({
  queryKey: ['orders', user.value?.id],
  queryFn: () => fetchOrders(user.value!.id),
  enabled: () => !!user.value?.id,  // 等第一个查询完成后才执行
})
```

---

## queryKey 设计规范

### 命名约定

| 场景 | 格式 | 示例 |
|------|------|------|
| 资源列表 | `['资源', 'list', filters?]` | `['users', 'list', { role: 'admin' }]` |
| 单个资源 | `['资源', 'detail', id]` | `['users', 'detail', '123']` |
| 关联资源 | `['父资源', 父id, '子资源']` | `['user', '123', 'orders']` |
| 无限滚动 | `['资源', 'infinite', filters?]` | `['users', 'infinite', { keyword }]` |

### 缓存失效技巧

```typescript
// 精确失效
queryClient.invalidateQueries({ queryKey: ['users', 'detail', '123'] })

// 模糊匹配：所有 users 相关查询
queryClient.invalidateQueries({ queryKey: ['users'] })

// 精确匹配模式
queryClient.invalidateQueries({
  queryKey: ['users', 'list', { role: 'admin' }],
  exact: true,
})
```

---

## 与 Pinia 的职责划分

| 数据类型 | 管理工具 | 示例 |
|----------|----------|------|
| **服务端状态** | TanStack Query | 用户列表、订单数据、通知消息 |
| **客户端状态** | Pinia | 主题、侧边栏、表单临时数据 |
| **持久化客户端状态** | Pinia | 主题偏好、筛选条件、表单草稿 |

### 组合使用

```vue
<script setup lang="ts">
import { useDarkModeStore } from '@/store/modules/dark-mode'
import { useUserList } from '@/composables/useUserQuery'

// 客户端状态 → Pinia
const darkModeStore = useDarkModeStore()

// 服务端状态 → TanStack Query
const { data: users, isLoading } = useUserList()
</script>
```

> **何时用 Pinia 管理服务端数据？** 一般不推荐。更常见的做法是把主题偏好、临时筛选条件、表单草稿等纯客户端状态放进 Pinia，把接口数据继续交给 TanStack Query。

---

## DevTools 调试工具

项目已集成 [TanStack Query DevTools](https://tanstack.com/query/latest/docs/framework/vue/devtools)，开发环境下自动显示在页面底部。

### 功能

- 查看所有 Query 的缓存状态（fresh / stale / inactive / fetching）
- 查看每个 Query 的 queryKey、数据内容、更新时间
- 手动使缓存失效或触发 refetch
- 查看 Mutation 历史

### 状态说明

| 颜色 | 状态 | 含义 |
|------|------|------|
| 🟢 绿色 | fresh | 数据新鲜，在 staleTime 内 |
| 🟡 黄色 | stale | 数据过期，下次使用时会后台刷新 |
| 🔵 蓝色 | fetching | 正在请求中 |
| ⚫ 灰色 | inactive | 无组件使用此查询 |

### 配置位置

DevTools 在 `src/main.ts` 中通过组件引入：

```typescript
// src/main.ts
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
```

```vue
<!-- App.vue -->
<VueQueryDevtools />
```

全局默认配置在 `src/plugins/query.ts`：

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,         // 1 分钟
      gcTime: 1000 * 60 * 5,        // 5 分钟
      retry: 1,                      // 失败重试 1 次
      refetchOnWindowFocus: false,   // 移动端禁用窗口聚焦刷新
    },
  },
})
```

---

## 更多资源

- [TanStack Query 官方文档](https://tanstack.com/query/latest/docs/framework/vue/overview)
- [Vue Query GitHub](https://github.com/TanStack/query)
- [vite-plugin-mock-dev-server 文档](https://vite-plugin-mock-dev-server.netlify.app/)
