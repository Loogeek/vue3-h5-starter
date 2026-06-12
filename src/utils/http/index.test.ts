import { describe, expect, it, vi } from 'vitest';

async function loadHttpModule() {
  vi.resetModules();

  const requestUse = vi.fn();
  const responseUse = vi.fn();
  const requestMock = vi.fn();
  const createMock = vi.fn(() => ({
    interceptors: {
      request: {
        use: requestUse,
      },
      response: {
        use: responseUse,
      },
    },
    request: requestMock,
  }));
  const toastMock = vi.fn();
  const startMock = vi.fn();
  const doneMock = vi.fn();
  const getTokenMock = vi.fn();
  const clearAuthDataMock = vi.fn();

  vi.doMock('axios', async () => {
    const actual = await vi.importActual<typeof import('axios')>('axios');

    return {
      ...actual,
      create: createMock,
      default: {
        create: createMock,
      },
    };
  });
  vi.doMock('vant', () => ({
    showFailToast: toastMock,
  }));
  vi.doMock('vant/es/toast/style', () => ({}));
  vi.doMock('../progress', () => ({
    default: {
      start: startMock,
      done: doneMock,
    },
  }));
  vi.doMock('../storage', () => ({
    getToken: getTokenMock,
    clearAuthData: clearAuthDataMock,
  }));

  await import('./index');

  const [requestFulfilled] = requestUse.mock.calls[0];
  const [responseFulfilled, responseRejected] = responseUse.mock.calls[0];

  return {
    doneMock,
    getTokenMock,
    requestFulfilled,
    responseFulfilled,
    responseRejected,
    startMock,
    toastMock,
    clearAuthDataMock,
  };
}

describe('http interceptors', () => {
  it('请求拦截器会注入 Bearer token', async () => {
    const { getTokenMock, requestFulfilled, startMock } = await loadHttpModule();

    getTokenMock.mockReturnValue('access-token');

    const config = requestFulfilled({ headers: {} });
    const headers = config.headers as { get: (name: string) => string | undefined };

    expect(startMock).toHaveBeenCalledTimes(1);
    expect(headers.get('Authorization')).toBe('Bearer access-token');
  });

  it('成功响应会解包后端 data 字段', async () => {
    const { doneMock, responseFulfilled } = await loadHttpModule();

    const result = responseFulfilled({
      data: {
        code: 0,
        data: {
          id: '1',
          name: '用户',
        },
      },
    });

    expect(doneMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: '1',
      name: '用户',
    });
  });

  it('408 超时时会提示请求超时', async () => {
    const { doneMock, responseRejected, toastMock } = await loadHttpModule();
    const error = {
      response: {
        status: 408,
        config: {
          url: '/timeout',
        },
      },
    };

    await expect(responseRejected(error)).rejects.toBe(error);

    expect(doneMock).toHaveBeenCalledTimes(1);
    expect(toastMock).toHaveBeenCalledWith('请求超时');
  });
});

async function loadHttpModuleFor401() {
  vi.resetModules();

  const requestUse = vi.fn();
  const responseUse = vi.fn();
  const requestMock = vi.fn();
  const createMock = vi.fn(() => ({
    interceptors: {
      request: { use: requestUse },
      response: { use: responseUse },
    },
    request: requestMock,
  }));
  const toastMock = vi.fn();
  const clearAuthDataMock = vi.fn();

  vi.doMock('axios', async () => {
    const actual = await vi.importActual<typeof import('axios')>('axios');
    return { ...actual, create: createMock, default: { create: createMock } };
  });
  vi.doMock('vant', () => ({ showFailToast: toastMock }));
  vi.doMock('vant/es/toast/style', () => ({}));
  vi.doMock('../progress', () => ({ default: { start: vi.fn(), done: vi.fn() } }));
  vi.doMock('../storage', () => ({
    clearAuthData: clearAuthDataMock,
    getToken: vi.fn(),
  }));

  await import('./index');

  const [, responseRejected] = responseUse.mock.calls[0];

  return { responseRejected, toastMock, clearAuthDataMock };
}

describe('401 handleUnauthorized', () => {
  it('401 时展示未授权提示并 reject 错误', async () => {
    const { responseRejected, toastMock } = await loadHttpModuleFor401();
    const error = { response: { status: 401 } };

    await expect(responseRejected(error)).rejects.toBe(error);
    expect(toastMock).toHaveBeenCalledWith('未授权，请登录');
  });

  it('401 时会清除本地认证缓存', async () => {
    const { responseRejected, clearAuthDataMock } = await loadHttpModuleFor401();
    const error = { response: { status: 401 } };

    await responseRejected(error).catch(() => {});
    expect(clearAuthDataMock).toHaveBeenCalledTimes(1);
  });
});
