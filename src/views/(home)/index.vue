<script setup lang="ts">
import GridPatternDashed from '@/components/grid-pattern/grid-pattern-dashed.vue';
import SectionTitle from '@/views/tools/components/SectionTitle.vue';

defineOptions({
  name: 'HomePage',
});

function openLink(url?: string) {
  if (url)
    window.open(url, '_blank');
}

const techStack = [
  { text: 'Vue 3.5+', icon: 'logos:vue' },
  { text: 'Vite 7', icon: 'logos:vitejs' },
  { text: 'TypeScript', icon: 'logos:typescript-icon' },
  { text: 'Tailwind v4', icon: 'logos:tailwindcss-icon' },
  { text: 'Pinia', icon: 'logos:pinia' },
  { text: 'Vant 4', img: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png', url: 'https://vant-ui.github.io/vant' },
];

interface ToolItem {
  name: string;
  desc: string;
  url?: string;
}

const sections = [
  {
    icon: 'lucide:wrench',
    title: '工程化',
    items: [
      { name: 'pnpm', desc: '严格依赖隔离、内容寻址存储', url: 'https://pnpm.io' },
      { name: 'Vite 7', desc: '基于 Rolldown（Rust）极快构建', url: 'https://vite.dev' },
      { name: 'Tailwind CSS v4', desc: 'CSS-first 配置，原子类样式更轻量', url: 'https://tailwindcss.com' },
      { name: '文件路由', desc: 'unplugin-vue-router 自动生成', url: 'https://github.com/posva/unplugin-vue-router' },
      { name: 'API 自动导入', desc: 'Vue / Router / Pinia / VueUse', url: 'https://github.com/unplugin/unplugin-auto-import' },
      { name: '组件自动加载', desc: 'Vant / 公共组件按需导入', url: 'https://github.com/unplugin/unplugin-vue-components' },
      { name: '构建优化', desc: 'Gzip 压缩 / Legacy Bundle / 可选 CDN 加速' },
    ] as ToolItem[],
  },
  {
    icon: 'lucide:database',
    title: '数据工具',
    items: [
      { name: 'TanStack Query', desc: '缓存、去重、后台刷新', url: 'https://tanstack.com/query' },
      { name: 'Axios 封装', desc: '拦截器、错误处理' },
      { name: 'Mock Dev Server', desc: 'Vite 集成，mock 文件热更新', url: 'https://github.com/pengzhanbo/vite-plugin-mock-dev-server' },
      { name: 'VueUse', desc: '100+ Composition API 工具', url: 'https://vueuse.org' },
    ] as ToolItem[],
  },
  {
    icon: 'lucide:palette',
    title: 'UI 样式',
    items: [
      { name: 'Vant 4', desc: '移动端 Vue 组件库', url: 'https://vant-ui.github.io/vant' },
      { name: 'Iconify', desc: '20 万+ 图标方案', url: 'https://iconify.design' },
      { name: '视口适配', desc: 'px → vmin 自动转换（375 基准）' },
      { name: '深色模式', desc: 'View Transition API 动画切换' },
    ] as ToolItem[],
  },
  {
    icon: 'lucide:shield-check',
    title: '代码规范',
    items: [
      { name: '@antfu/eslint-config', desc: 'Flat Config，lint + 格式化一体', url: 'https://github.com/antfu/eslint-config' },
      { name: 'CommitLint + czg', desc: '交互式规范提交', url: 'https://github.com/Zhengqbbb/cz-git' },
      { name: 'Husky + lint-staged', desc: '提交自动检查', url: 'https://typicode.github.io/husky' },
    ] as ToolItem[],
  },
  {
    icon: 'lucide:bot',
    title: 'AI 辅助开发',
    items: [
      { name: 'AGENTS.md', desc: '项目规范主入口' },
      { name: 'CONSTITUTION.md', desc: '行为准则与安全边界' },
      { name: 'CLAUDE.md', desc: 'Claude Code 入口文件' },
      { name: '.agents/skills', desc: '项目内已安装的技能扩展' },
    ] as ToolItem[],
  },
  {
    icon: 'lucide:bug',
    title: '开发调试',
    items: [
      { name: 'Code Inspector', desc: '快速查看源码位置', url: 'https://inspector.fe-dev.cn' },
      { name: 'VConsole', desc: '移动端调试面板', url: 'https://github.com/vadxq/vite-plugin-vconsole' },
      { name: 'Vue DevTools', desc: '组件树、状态、性能分析', url: 'https://github.com/vuejs/devtools-next' },
      { name: 'Query DevTools', desc: '可视化查看缓存状态', url: 'https://tanstack.com/query/latest/docs/framework/vue/devtools' },
    ] as ToolItem[],
  },

];
</script>

<template>
  <div>
    <GridPatternDashed />
    <div class="px-4 pt-8 pb-6">
      <!-- Logo + 标题 -->
      <div class="mx-auto flex size-20 items-center justify-center gap-2 rounded-3xl border border-[color:var(--color-border)] bg-white/80 shadow-sm dark:bg-gray-900/80">
        <i-icon icon="logos:vue" class="text-4xl" />
        <span class="h-8 w-px bg-gray-200 dark:bg-gray-700" />
        <i-icon icon="logos:typescript-icon" class="text-4xl" />
      </div>
      <h1 class="text-center text-xl font-bold mt-3">
        Vue3 H5 Starter
      </h1>
      <p class="text-center text-[13px] text-gray-500 mt-1 leading-5">
        面向公开仓库的通用 Vue 3 移动端模板
      </p>

      <!-- 技术栈标签 -->
      <div class="flex flex-wrap justify-center gap-2 mt-4">
        <div
          v-for="item in techStack"
          :key="item.text"
          class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300"
          :class="{ 'active:opacity-70': item.url }"
          @click="item.url && openLink(item.url)"
        >
          <i-icon v-if="item.icon" :icon="item.icon" class="text-sm" />
          <img v-else-if="item.img" :src="item.img" class="size-3.5 rounded-xs" alt="">
          <span>{{ item.text }}</span>
        </div>
      </div>

      <!-- 技术清单 -->
      <template v-for="section in sections" :key="section.title">
        <SectionTitle :icon="section.icon" :title="section.title" />
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="item in section.items"
            :key="item.name"
            class="p-2.5 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]"
            :class="{ 'active:opacity-70': item.url }"
            @click="openLink(item.url)"
          >
            <div class="flex items-center gap-1">
              <span class="text-[13px] font-medium truncate">{{ item.name }}</span>
              <i-icon
                v-if="item.url"
                icon="lucide:arrow-up-right"
                class="shrink-0 text-[10px] text-gray-300"
              />
            </div>
            <p class="text-[11px] text-gray-400 mt-0.5 leading-[14px]">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
