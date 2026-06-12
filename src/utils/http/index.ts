import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Axios, { AxiosHeaders } from 'axios';
import { showFailToast } from 'vant';
import { ContentTypeEnum, ResultEnum } from '@/enums/request-enum';
import NProgress from '../progress';
import { clearAuthData, getToken } from '../storage';

import 'vant/es/toast/style';

function handleUnauthorized(): void {
  clearAuthData();
}

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  timeout: 30000,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {},
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      (config) => {
        NProgress.start();
        // 发送请求前，从本地存储获取 token 并添加到请求头
        const token = getToken();
        if (token) {
          const headers = AxiosHeaders.from(config.headers);
          headers.set('Authorization', `Bearer ${token}`);
          config.headers = headers;
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        // 与后端协定的返回字段
        const responseData = response.data ?? {};
        const { code } = responseData;
        const hasResultField = Reflect.has(responseData, 'result');
        const hasDataField = Reflect.has(responseData, 'data');
        const result = hasResultField
          ? responseData.result
          : hasDataField
            ? responseData.data
            : responseData;
        // 判断请求是否成功
        const isSuccess
          = Reflect.has(responseData, 'code')
            && Number(code) === ResultEnum.SUCCESS;
        if (isSuccess) {
          return result;
        }
        else {
          // 处理请求错误
          // showFailToast(message);
          return Promise.reject(responseData);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // 处理 HTTP 网络错误
        let message = '';
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 401:
            message = '未授权，请登录';
            handleUnauthorized();
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求地址不存在';
            break;
          case 408:
            message = '请求超时';
            break;
          case 500:
            message = '服务器内部错误';
            break;
          default:
            message = '网络连接故障';
        }

        showFailToast(message);
        return Promise.reject(error);
      },
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return Http.axiosInstance.request(config) as Promise<T>;
  }
}

export const http = new Http(configDefault);
