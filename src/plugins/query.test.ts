import type { App } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { queryClient, setupVueQuery } from './query';

describe('query plugin', () => {
  it('queryClient 默认配置符合移动端缓存预期', () => {
    const queryOptions = queryClient.getDefaultOptions().queries;

    expect(queryOptions?.staleTime).toBe(60 * 1000);
    expect(queryOptions?.gcTime).toBe(5 * 60 * 1000);
    expect(queryOptions?.retry).toBe(1);
    expect(queryOptions?.refetchOnWindowFocus).toBe(false);
  });

  it('setupVueQuery 会安装共享的 queryClient', () => {
    const use = vi.fn();

    setupVueQuery({ use } as unknown as App);

    expect(use).toHaveBeenCalledWith(expect.anything(), { queryClient });
  });
});
