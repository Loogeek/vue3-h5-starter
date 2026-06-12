import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/views',
      dts: 'src/typings/typed-router.d.ts',
      extensions: ['.vue'],
      exclude: ['src/views/**/components/**'],
    }),
    vue(),
    vueJsx(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
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
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.ts'],
    restoreMocks: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
