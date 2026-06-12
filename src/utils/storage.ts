/**
 * 本地存储工具类
 */

const TOKEN_KEY = 'access_token';
const USER_DATA_KEY = 'user_data';

/**
 * 获取 Token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 设置 Token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 删除 Token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 获取用户数据
 */
export function getUserData<T = unknown>(): T | null {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (data) {
    try {
      return JSON.parse(data) as T;
    }
    catch (error) {
      console.error('Parse user data error:', error);
      return null;
    }
  }
  return null;
}

/**
 * 设置用户数据
 */
export function setUserData(data: unknown): void {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

/**
 * 删除用户数据
 */
export function removeUserData(): void {
  localStorage.removeItem(USER_DATA_KEY);
}

/**
 * 清除所有认证相关数据
 */
export function clearAuthData(): void {
  removeToken();
  removeUserData();
}
