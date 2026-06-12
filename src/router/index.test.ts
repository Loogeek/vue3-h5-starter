import { beforeEach, describe, expect, it, vi } from 'vitest';

const routerMocks = {
  afterEach: vi.fn(),
  beforeEach: vi.fn(),
  createRouter: vi.fn(),
  createWebHistory: vi.fn(),
  handleHotUpdate: vi.fn(),
  progressDone: vi.fn(),
  progressStart: vi.fn(),
  setPageTitle: vi.fn(),
};

async function loadRouterModule() {
  vi.resetModules();

  Object.values(routerMocks).forEach((mockFn) => {
    mockFn.mockReset();
  });

  routerMocks.createRouter.mockReturnValue({
    beforeEach: routerMocks.beforeEach,
    afterEach: routerMocks.afterEach,
  });
  routerMocks.createWebHistory.mockReturnValue({});

  vi.doMock('vue-router', () => ({
    createRouter: routerMocks.createRouter,
    createWebHistory: routerMocks.createWebHistory,
  }));
  vi.doMock('vue-router/auto-routes', () => ({
    handleHotUpdate: routerMocks.handleHotUpdate,
    routes: [],
  }));
  vi.doMock('@/utils/progress', () => ({
    default: {
      start: routerMocks.progressStart,
      done: routerMocks.progressDone,
    },
  }));
  vi.doMock('@/utils/set-page-title', () => ({
    default: routerMocks.setPageTitle,
  }));

  const mod = await import('./index');

  return mod;
}

describe('router guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('beforeEach 会启动进度条并设置页面标题', async () => {
    await loadRouterModule();

    const [guard] = routerMocks.beforeEach.mock.calls[0];
    guard({
      meta: {
        title: '首页',
      },
    });

    expect(routerMocks.progressStart).toHaveBeenCalledTimes(1);
    expect(routerMocks.setPageTitle).toHaveBeenCalledWith('首页');
  });

  it('afterEach 会结束进度条', async () => {
    await loadRouterModule();

    const [guard] = routerMocks.afterEach.mock.calls[0];
    guard();

    expect(routerMocks.progressDone).toHaveBeenCalledTimes(1);
  });
});
