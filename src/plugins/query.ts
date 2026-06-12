import type { App } from 'vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

/**
 * TanStack Query 配置
 * 针对移动端 H5 场景优化的默认配置
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据在 1 分钟内视为新鲜，不会重新请求
      staleTime: 1000 * 60,
      // 数据在 5 分钟后被垃圾回收
      gcTime: 1000 * 60 * 5,
      // 失败后重试 1 次
      retry: 1,
      // 移动端禁用窗口聚焦时自动刷新
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * 安装 VueQuery 插件
 */
export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, { queryClient });
}
