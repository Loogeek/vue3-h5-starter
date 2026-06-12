import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import { useCreateUser, useUserDetail, useUserList } from './useUserQuery';

interface QueryOptions {
  enabled?: () => boolean;
  gcTime?: number;
  queryFn: () => Promise<unknown>;
  queryKey: unknown[];
  staleTime?: number;
}

interface MutationOptions {
  mutationFn: (payload: unknown) => Promise<unknown>;
  onSuccess?: () => Promise<void> | void;
}

const mocks = vi.hoisted(() => ({
  httpRequest: vi.fn(),
  invalidateQueries: vi.fn(),
  useMutation: vi.fn(options => options),
  useQuery: vi.fn(options => options),
  useQueryClient: vi.fn(),
}));

vi.mock('@/utils/http', () => ({
  http: {
    request: mocks.httpRequest,
  },
}));

vi.mock('@tanstack/vue-query', () => ({
  useMutation: mocks.useMutation,
  useQuery: mocks.useQuery,
  useQueryClient: mocks.useQueryClient,
}));

describe('useUserQuery', () => {
  beforeEach(() => {
    mocks.httpRequest.mockReset();
    mocks.invalidateQueries.mockReset();
    mocks.useMutation.mockClear();
    mocks.useQuery.mockClear();
    mocks.useQueryClient.mockReset();
    mocks.useQueryClient.mockReturnValue({
      invalidateQueries: mocks.invalidateQueries,
    });
  });

  it('useUserList 使用固定缓存 key 与缓存时间', async () => {
    mocks.httpRequest.mockResolvedValue([{ id: '1', name: '张三', email: 'a@test.com' }]);

    useUserList();

    const options = mocks.useQuery.mock.calls[0]?.[0] as QueryOptions;
    const result = await options.queryFn();

    expect(options.queryKey).toEqual(['users', 'list']);
    expect(options.staleTime).toBe(30 * 1000);
    expect(options.gcTime).toBe(5 * 60 * 1000);
    expect(result).toEqual([{ id: '1', name: '张三', email: 'a@test.com' }]);
    expect(mocks.httpRequest).toHaveBeenCalledWith({
      url: '/dev-api/users',
      baseURL: '',
    });
  });

  it('useUserDetail 会基于响应式 userId 生成请求并控制 enabled', async () => {
    const userId = ref('42');

    mocks.httpRequest.mockResolvedValue({ id: '99', name: '李四', email: 'b@test.com' });

    useUserDetail(userId);

    const options = mocks.useQuery.mock.calls[0]?.[0] as QueryOptions;

    userId.value = '99';

    const result = await options.queryFn();

    expect(options.queryKey).toEqual(['users', 'detail', userId]);
    expect(options.enabled()).toBe(true);
    expect(result).toEqual({ id: '99', name: '李四', email: 'b@test.com' });
    expect(mocks.httpRequest).toHaveBeenCalledWith({
      url: '/dev-api/users/99',
      baseURL: '',
    });
  });

  it('useUserDetail 在 userId 为空时不会启用查询', () => {
    const userId = ref('');
    useUserDetail(userId);

    const options = mocks.useQuery.mock.calls[0]?.[0] as QueryOptions;

    expect(options.enabled()).toBe(false);
  });

  it('useCreateUser 成功后会让用户列表缓存失效', async () => {
    mocks.httpRequest.mockResolvedValue({ id: '3', name: '王五', email: 'c@test.com' });

    useCreateUser();

    const options = mocks.useMutation.mock.calls[0]?.[0] as MutationOptions;
    const payload = { name: '王五', email: 'c@test.com' };

    await options.mutationFn(payload);
    await options.onSuccess?.();

    expect(mocks.httpRequest).toHaveBeenCalledWith({
      url: '/dev-api/users',
      method: 'POST',
      data: payload,
      baseURL: '',
    });
    expect(mocks.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['users', 'list'],
    });
  });
});
