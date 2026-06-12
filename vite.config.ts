import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import { VitePWA } from 'vite-plugin-pwa';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteVConsole } from 'vite-plugin-vconsole';
import VueDevTools from 'vite-plugin-vue-devtools';
import { enableCDN } from './build/cdn';

// 当前工作目录路径
const root: string = process.cwd();
const autoImportInclude = [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/];

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, root, '');
  const proxyTarget = env.VITE_PROXY_TARGET;
  const devApiProxyTarget = proxyTarget || 'http://127.0.0.1';

  return {
    base: env.VITE_PUBLIC_PATH || '/',
    plugins: [
      // 代码审查插件 - 仅在开发环境启用
      command === 'serve' && codeInspectorPlugin({
        bundler: 'vite',
      }),
      // 文件路由 - 必须在 vue() 之前
      VueRouter({
        routesFolder: 'src/views',
        dts: 'src/typings/typed-router.d.ts',
        extensions: ['.vue'],
        exclude: ['src/views/**/components/**'],
        logs: true,
        watch: command === 'serve',
        importMode: 'async',
      }),
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
      command === 'serve' && mockDevServerPlugin(),
      // Vue API 自动导入
      AutoImport({
        include: autoImportInclude,
        imports: [
          'vue',
          '@vueuse/core',
          'pinia',
          VueRouterAutoImports,
          {
            'vue-router': ['useRouter', 'useRoute'],
          },
          {
            '@tanstack/vue-query': [
              'useQuery',
              'useMutation',
              'useInfiniteQuery',
              'useQueryClient',
              'useIsFetching',
              'useIsMutating',
            ],
          },
        ],
        dts: 'src/typings/auto-imports.d.ts',
        resolvers: [VantResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }),
      // vant 组件自动按需引入
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [VantResolver()],
      }),
      // VConsole 移动端调试面板
      viteVConsole({
        entry: [fileURLToPath(new URL('./src/main.ts', import.meta.url))],
        enabled: mode === 'development',
        config: {
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
      // Vue DevTools
      VueDevTools(),
      // 生产环境 gzip 压缩资源
      viteCompression({ verbose: false }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS),
      // 输出 legacy bundle，兼顾较旧 JS 运行环境
      legacy({
        targets: ['Android >= 7', 'Chrome >= 67', 'iOS >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['favicon.ico', 'pwa.svg'],
        manifest: {
          name: 'Vue3 H5 Starter',
          short_name: 'H5 Starter',
          description: 'A mobile web app starter based on Vue 3.',
          lang: 'zh-CN',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#f6f8f5',
          theme_color: '#243b2f',
          icons: [
            {
              src: 'pwa.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          navigateFallback: '/index.html',
        },
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '^/dev-api': {
          target: devApiProxyTarget,
          ws: false,
          changeOrigin: true,
        },
      },
    },
    build: {
      modulePreload: {
        polyfill: false,
      },
      rolldownOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
