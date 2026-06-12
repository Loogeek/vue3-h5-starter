<script setup lang="ts">
defineOptions({
  name: 'RoutesGuide',
});

const router = useRouter();

interface RouteExample {
  label: string;
  path: string;
  type: 'static' | 'dynamic';
  filePattern: string;
}

const routeExamples: RouteExample[] = [
  {
    label: '首页（根路径）',
    path: '/',
    type: 'static',
    filePattern: 'src/views/(home)/index.vue → /',
  },
  {
    label: '工具页',
    path: '/tools',
    type: 'static',
    filePattern: 'src/views/tools/index.vue → /tools',
  },
  {
    label: 'Query 列表',
    path: '/query',
    type: 'static',
    filePattern: 'src/views/(home)/query/index.vue → /query',
  },
  {
    label: 'Query 详情（动态 :id）',
    path: '/query/user-001',
    type: 'dynamic',
    filePattern: 'src/views/(home)/query/[id].vue → /query/:id',
  },
  {
    label: '当前页面',
    path: '/routes',
    type: 'static',
    filePattern: 'src/views/(home)/routes/index.vue → /routes',
  },
  {
    label: '动态文章页（:slug）',
    path: '/routes/hello-world',
    type: 'dynamic',
    filePattern: 'src/views/(home)/routes/[slug].vue → /routes/:slug',
  },
  {
    label: '动态文章页（:slug）',
    path: '/routes/tailwind-css-v4',
    type: 'dynamic',
    filePattern: 'src/views/(home)/routes/[slug].vue → /routes/:slug',
  },
];

interface FileTreeItem {
  file: string;
  route: string;
  indent: number;
  isCurrent?: boolean;
  isDynamic?: boolean;
}

const fileTree: FileTreeItem[] = [
  { file: '(home)/', route: '', indent: 0 },
  { file: 'index.vue', route: '/', indent: 1 },
  { file: 'query/', route: '', indent: 1 },
  { file: 'index.vue', route: '/query', indent: 2 },
  { file: '[id].vue', route: '/query/:id', indent: 2, isDynamic: true },
  { file: 'routes/', route: '', indent: 1 },
  { file: 'index.vue', route: '/routes', indent: 2, isCurrent: true },
  { file: '[slug].vue', route: '/routes/:slug', indent: 2, isDynamic: true },
  { file: 'tools/', route: '', indent: 0 },
  { file: 'index.vue', route: '/tools', indent: 1 },
  { file: '[...all].vue', route: '/:all(.*)', indent: 0, isDynamic: true },
];

const configItems = [
  { label: '路由目录', value: 'src/views' },
  { label: '类型文件', value: 'src/typings/typed-router.d.ts' },
  { label: '排除目录', value: '**/components/**' },
  { label: '加载模式', value: '异步懒加载 (async)' },
];

function goTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa] dark:bg-gray-900">
    <van-nav-bar title="文件路由演示" left-arrow @click-left="router.back()" />

    <!-- 说明卡片 -->
    <div class="mx-4 mt-4 p-3.5 rounded-xl bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/30">
      <div class="flex items-center gap-2 mb-2">
        <i-icon icon="lucide:folder-tree" class="text-base text-emerald-600" />
        <span class="text-sm font-bold text-emerald-700 dark:text-emerald-300">unplugin-vue-router</span>
      </div>
      <p class="text-xs text-emerald-600/80 dark:text-emerald-400/80 leading-4">
        基于文件系统自动生成路由，无需手动维护路由表。支持 [param] 动态参数、嵌套路由、自动懒加载。
      </p>
    </div>

    <!-- 目录 → 路由映射 -->
    <div class="mx-4 mt-3">
      <h3 class="text-[13px] font-bold mb-2 flex items-center gap-1.5">
        <i-icon icon="lucide:file-code" class="text-sm text-gray-500" />
        目录 → 路由映射
      </h3>
      <div class="rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] overflow-hidden">
        <div class="px-3 py-2 text-[11px] text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-[color:var(--color-border)]">
          src/views/
        </div>
        <div class="divide-y divide-[color:var(--color-border)]">
          <div
            v-for="(item, idx) in fileTree"
            :key="idx"
            class="flex items-center gap-2 px-3 py-2"
            :class="item.isCurrent ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''"
          >
            <div class="flex items-center gap-1.5 min-w-0" :style="{ paddingLeft: `${item.indent * 16}px` }">
              <i-icon
                :icon="item.file.endsWith('/') ? 'lucide:folder' : 'lucide:file'"
                class="text-xs shrink-0"
                :class="item.file.endsWith('/') ? 'text-amber-500' : item.isDynamic ? 'text-orange-400' : 'text-blue-400'"
              />
              <span class="text-[12px] font-mono" :class="item.isDynamic ? 'text-orange-500 font-medium' : ''">
                {{ item.file }}
              </span>
            </div>
            <template v-if="item.route">
              <i-icon icon="lucide:arrow-right" class="text-[10px] text-gray-300 shrink-0 ml-auto" />
              <span class="text-[11px] text-gray-400 shrink-0 font-mono">{{ item.route }}</span>
              <van-tag v-if="item.isCurrent" type="success" size="medium" class="shrink-0 ml-0.5">
                当前
              </van-tag>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 路由列表 -->
    <div class="mx-4 mt-4">
      <h3 class="text-[13px] font-bold mb-2 flex items-center gap-1.5">
        <i-icon icon="lucide:route" class="text-sm text-gray-500" />
        点击跳转路由
      </h3>
    </div>

    <van-cell-group inset class="mt-1">
      <van-cell
        v-for="item in routeExamples"
        :key="item.path + item.label"
        :title="item.label"
        :label="item.filePattern"
        is-link
        @click="goTo(item.path)"
      >
        <template #icon>
          <van-tag
            :type="item.type === 'dynamic' ? 'warning' : 'primary'"
            size="medium"
            class="mr-2.5 shrink-0"
          >
            {{ item.type === 'dynamic' ? '动态' : '静态' }}
          </van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 核心配置 -->
    <div class="mx-4 mt-4 mb-6">
      <h3 class="text-[13px] font-bold mb-2 flex items-center gap-1.5">
        <i-icon icon="lucide:settings" class="text-sm text-gray-500" />
        核心配置
      </h3>
      <van-cell-group inset class="mx-0! rounded-xl! overflow-hidden!">
        <van-cell
          v-for="item in configItems"
          :key="item.label"
          :title="item.label"
          :value="item.value"
        />
      </van-cell-group>
    </div>
  </div>
</template>
