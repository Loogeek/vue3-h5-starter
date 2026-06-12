/**
 * TanStack Query 示例 — 用户相关查询 hooks
 *
 * 演示如何将 useQuery / useMutation 与项目的 axios 封装（http.request）结合使用。
 * 接口由 mock/user.mock.ts 提供，开发环境下自动拦截。
 * 生产构建作为官网示例运行时，使用内置演示数据，避免部署后依赖后端服务。
 *
 * 调用关系：
 *   组件 → useUserList / useUserDetail → http.request → mock 接口
 *                  ↕
 *            TanStack Query 缓存
 */
import type { MaybeRefOrGetter } from 'vue';
import { http } from '@/utils/http';

// ============ 类型 ============

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
}

const demoUsers: User[] = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '研发部' },
  { id: '2', name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '产品部' },
  { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '设计部' },
];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDemoUsers() {
  await sleep(200);
  return [...demoUsers];
}

async function getDemoUserById(id: string) {
  await sleep(200);
  const user = demoUsers.find(item => item.id === id);
  if (!user) {
    return Promise.reject(new Error('用户不存在'));
  }
  return { ...user };
}

// ============ API 函数 ============
// baseURL 置空以跳过全局 VITE_BASE_API 前缀，让请求直接走 /dev-api 匹配 mock

function fetchUsers() {
  if (import.meta.env.PROD) {
    return getDemoUsers();
  }

  return http.request<User[]>({ url: '/dev-api/users', baseURL: '' });
}

function fetchUserById(id: string) {
  if (import.meta.env.PROD) {
    return getDemoUserById(id);
  }

  return http.request<User>({ url: `/dev-api/users/${id}`, baseURL: '' });
}

function createUser(data: Omit<User, 'id'>) {
  if (import.meta.env.PROD) {
    const user = { ...data, id: String(Date.now()) };
    demoUsers.push(user);
    return Promise.resolve(user);
  }

  return http.request<User>({ url: '/dev-api/users', method: 'POST', data, baseURL: '' });
}

// ============ Query Hooks ============

/**
 * 用户列表查询
 * - staleTime 30s：30 秒内返回页面会直接使用缓存
 * - 超过 30 秒后重新进入：可能先显示缓存，再后台刷新
 * - gcTime 5min：离开页面后缓存保留 5 分钟
 */
export function useUserList() {
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: fetchUsers,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

/**
 * 用户详情查询（响应式参数）
 *
 * @param userId - 支持 ref / getter / 纯值，参数变化自动重新请求
 * - staleTime 30s：30 秒内返回详情页会直接使用缓存
 * - 超过 30 秒后重新进入：可能先显示缓存，再后台刷新
 */
export function useUserDetail(userId: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => fetchUserById(toValue(userId)),
    enabled: () => !!toValue(userId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

/**
 * 创建用户（Mutation）
 *
 * 成功后自动让用户列表缓存失效 → 触发重新请求
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
    },
  });
}
