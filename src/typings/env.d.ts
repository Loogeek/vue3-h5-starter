/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly MODE: 'development' | 'test' | 'production';
  readonly VITE_APP_ENV_TYPE?: 'development' | 'test' | 'production';
  readonly VITE_BASE_API?: string;
  readonly VITE_PUBLIC_PATH?: string;
  readonly VITE_PROXY_TARGET?: string;
  readonly VITE_CDN_DEPS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
