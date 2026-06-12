<script setup lang="ts">
import type { AppLocale } from '@/locales';
import LucideBadgeCheck from '@iconify-icons/lucide/badge-check';
import LucideHome from '@iconify-icons/lucide/home';
import LucideMoon from '@iconify-icons/lucide/moon';
import LucideRoute from '@iconify-icons/lucide/route';
import LucideSparkles from '@iconify-icons/lucide/sparkles';
import LucideWrench from '@iconify-icons/lucide/wrench';

import { useI18n } from 'vue-i18n';
import { useDarkMode, useToggleDarkMode } from '@/hooks/useToggleDarkMode';
import { usePreferencesStoreHook } from '@/store/modules/preferences';
import SectionTitle from './components/SectionTitle.vue';

defineOptions({
  name: 'Tools',
});

const router = useRouter();
const { t } = useI18n();
const preferences = usePreferencesStoreHook();
const { locale } = storeToRefs(preferences);
const isDark = computed(() => useDarkMode());

const localeOptions: Array<{ label: string; value: AppLocale }> = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

// Iconify 在线图标
const iconOnlineList = [
  'material-symbols:admin-panel-settings-outline',
  'jam:android',
  'lucide:badge-check',
  'pixelarticons:heart',
  'fxemoji:alienmonster',
  'meteocons:thunderstorms-day-overcast-fill',
];

// Iconify 离线图标
const iconOfflineList = [
  LucideHome,
  LucideRoute,
  LucideWrench,
  LucideBadgeCheck,
  LucideMoon,
  LucideSparkles,
];

const localSvgIcons = [
  { name: 'dark', label: 'dark.svg', className: 'text-slate-700 dark:text-slate-200' },
  { name: 'light', label: 'light.svg', className: 'text-amber-500' },
];

// AI 配置文件
const aiConfigFiles = [
  { file: 'AGENTS.md', tool: '项目规范主入口', icon: 'lucide:book-open-text', color: 'text-emerald-500' },
  { file: 'CONSTITUTION.md', tool: '行为准则与安全边界', icon: 'lucide:shield-check', color: 'text-amber-500' },
  { file: 'CLAUDE.md', tool: 'Claude Code 入口', icon: 'lucide:brain', color: 'text-purple-500' },
  { file: '.cursor/rules/project.mdc', tool: 'Cursor 入口规则', icon: 'lucide:file-cog', color: 'text-blue-500' },
  { file: '.github/copilot-instructions.md', tool: 'GitHub Copilot', icon: 'lucide:github', color: 'text-gray-600' },
];

// AI Skills（已安装的技能扩展）
const aiSkills = [
  { label: 'create-adaptable-composable', desc: '可复用 composable 设计', icon: 'lucide:blend' },
  { label: 'vue-best-practices', desc: 'Vue 3 + script setup + TS', icon: 'logos:vue' },
  { label: 'vue-debug-guides', desc: 'Vue 问题定位与排查', icon: 'lucide:bug' },
  { label: 'vue-jsx-best-practices', desc: 'Vue JSX 写法规范', icon: 'lucide:file-code-2' },
  { label: 'vue-options-api-best-practices', desc: 'Options API 参考规范', icon: 'lucide:blocks' },
  { label: 'vue-pinia-best-practices', desc: 'Pinia 状态管理模式', icon: 'logos:pinia' },
  { label: 'vue-router-best-practices', desc: 'Vue Router 路由模式', icon: 'lucide:route' },
  { label: 'vue-testing-best-practices', desc: 'Vitest / 组件测试实践', icon: 'logos:vitest' },
];

// 编码规范约束
const aiConstraints = [
  { rule: '必须使用 <script setup lang="ts">', icon: 'lucide:code-2' },
  { rule: '禁止 Options API，只用 Composition API', icon: 'lucide:ban' },
  { rule: '禁止 any，必要时用 unknown', icon: 'lucide:shield-alert' },
  { rule: '样式优先 Tailwind CSS 原子类', icon: 'lucide:palette' },
  { rule: '数据请求使用 TanStack Query', icon: 'lucide:database' },
  { rule: '只用 pnpm，禁止 npm / yarn', icon: 'lucide:package-check' },
  { rule: '不做超出需求范围的重构', icon: 'lucide:minimize-2' },
  { rule: '禁止硬编码密钥等敏感信息', icon: 'lucide:lock' },
];

// 功能演示入口
const exampleEntries = [
  { label: 'TanStack Query', desc: '缓存 / 去重 / 后台刷新', icon: 'lucide:database', path: '/query', url: 'https://tanstack.com/query' },
  { label: '文件路由', desc: '动态参数 / 类型安全', icon: 'lucide:route', path: '/routes', url: 'https://github.com/posva/unplugin-vue-router' },
  { label: '滚动缓存', desc: '列表回退定位 / 页面缓存示例', icon: 'lucide:scroll-text', path: '/scroll-cache' },
  { label: '文档页', desc: '能力说明 / 快速开始 / 后续路线', icon: 'lucide:book-open-text', path: '/docs' },
];

// 自动导入的 API 列表
const autoImportApis = [
  { label: 'Vue', examples: 'ref / computed / watch / onMounted', icon: 'logos:vue', color: 'bg-emerald-50 dark:bg-emerald-900/20', url: 'https://vuejs.org' },
  { label: 'Vue Router', examples: 'useRouter / useRoute', icon: 'lucide:route', color: 'bg-blue-50 dark:bg-blue-900/20', url: 'https://router.vuejs.org' },
  { label: 'Pinia', examples: 'storeToRefs / defineStore', icon: 'logos:pinia', color: 'bg-yellow-50 dark:bg-yellow-900/20', url: 'https://pinia.vuejs.org' },
  { label: 'VueUse', examples: 'useWindowSize / useDark ...', icon: 'lucide:package', color: 'bg-teal-50 dark:bg-teal-900/20', url: 'https://vueuse.org' },
  { label: 'TanStack Query', examples: 'useQuery / useMutation', icon: 'lucide:database', color: 'bg-orange-50 dark:bg-orange-900/20', url: 'https://tanstack.com/query' },
];

function toggleDark(e: MouseEvent) {
  useToggleDarkMode(e);
}

function setLocale(localeValue: AppLocale) {
  preferences.setLocale(localeValue);
}

function openLink(url?: string) {
  if (url)
    window.open(url, '_blank');
}
</script>

<template>
  <div class="px-4 pt-3 pb-6">
    <!-- 功能演示 -->
    <SectionTitle icon="lucide:play-circle" :title="t('tools.demo')" />
    <div class="space-y-2">
      <div
        v-for="entry in exampleEntries"
        :key="entry.path"
        class="flex items-center gap-3 p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] active:opacity-70"
        @click="router.push(entry.path)"
      >
        <div class="size-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
          <i-icon :icon="entry.icon" class="text-lg text-blue-500" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1">
            <span class="text-[13px] font-medium">{{ entry.label }}</span>
            <i-icon
              v-if="entry.url"
              icon="lucide:arrow-up-right"
              class="shrink-0 text-[10px] text-gray-300"
              @click.stop="openLink(entry.url)"
            />
          </div>
          <p class="text-[11px] text-gray-400 mt-0.5">
            {{ entry.desc }}
          </p>
        </div>
        <i-icon icon="lucide:chevron-right" class="text-sm text-gray-300" />
      </div>
    </div>

    <!-- 外观与偏好 -->
    <SectionTitle icon="lucide:sliders-horizontal" :title="t('tools.appearance')" />
    <div class="space-y-2">
      <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[13px] font-medium">
              {{ t('locale.title') }}
            </p>
            <p class="text-[11px] text-gray-400 mt-0.5">
              {{ t('locale.description') }}
            </p>
          </div>
          <div class="flex rounded-full bg-gray-100 p-1 dark:bg-gray-800">
            <button
              v-for="item in localeOptions"
              :key="item.value"
              type="button"
              class="h-8 rounded-full px-3 text-[12px] font-medium transition"
              :class="locale === item.value ? 'bg-white text-[#243b2f] shadow-sm dark:bg-[#dff8df]' : 'text-gray-500 dark:text-gray-300'"
              @click="setLocale(item.value)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="grid gap-2 md:grid-cols-2">
        <div class="rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] p-3">
          <p class="text-[13px] font-medium">
            {{ t('tools.persistence') }}
          </p>
          <p class="mt-1 text-[11px] leading-4 text-gray-400">
            {{ t('tools.persistenceDesc') }}
          </p>
        </div>
        <div class="rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] p-3">
          <p class="text-[13px] font-medium">
            {{ t('tools.pwa') }}
          </p>
          <p class="mt-1 text-[11px] leading-4 text-gray-400">
            {{ t('tools.pwaDesc') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 深色模式 -->
    <SectionTitle icon="lucide:moon" title="深色模式" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[13px] font-medium">
            View Transition API
          </p>
          <p class="text-[11px] text-gray-400 mt-0.5">
            点击切换可看到圆形扩散动画效果
          </p>
        </div>
        <van-button
          size="small"
          :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
          @click="toggleDark"
        >
          {{ isDark ? '浅色' : '深色' }}
        </van-button>
      </div>
    </div>

    <!-- Iconify 图标 -->
    <SectionTitle icon="lucide:smile" title="Iconify 图标" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[11px] text-gray-400 mb-2 flex items-center gap-1">
        在线图标 — 按需从 CDN 加载
        <span class="inline-flex items-center gap-0.5 text-blue-400 active:opacity-70" @click="openLink('https://iconify.design')">
          iconify.design
          <i-icon icon="lucide:arrow-up-right" class="text-[10px]" />
        </span>
      </p>
      <div class="flex flex-wrap gap-3">
        <i-icon
          v-for="item in iconOnlineList"
          :key="item"
          :icon="item"
          class="text-2xl"
        />
      </div>
      <van-divider class="my-3!" />
      <p class="text-[11px] text-gray-400 mb-2">
        离线图标 — 以 Lucide 为例，导入后直接打包进产物
      </p>
      <div class="flex flex-wrap gap-3">
        <i-icon
          v-for="(item, idx) in iconOfflineList"
          :key="idx"
          :icon="item"
          class="text-2xl"
        />
      </div>
      <div class="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-4 text-gray-500 dark:bg-gray-800/60">
        示例：官网看到 <span class="font-medium text-gray-700 dark:text-gray-200">lucide:home</span>，离线导入时写成
        <span class="font-medium text-gray-700 dark:text-gray-200">@iconify-icons/lucide/home</span>
      </div>
    </div>

    <!-- 本地 SVG 图标 -->
    <SectionTitle icon="lucide:image" title="本地 SVG 图标" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[11px] text-gray-400 leading-4">
        将 SVG 文件放到
        <van-tag size="medium">
          src/assets/icons
        </van-tag>
        下，直接使用
        <van-tag size="medium">
          &lt;svg-icon name=&quot;文件名&quot; /&gt;
        </van-tag>
      </p>
      <div class="mt-3 grid grid-cols-2 gap-2">
        <div
          v-for="item in localSvgIcons"
          :key="item.name"
          class="rounded-xl border border-dashed border-[color:var(--color-border)] bg-gray-50/80 p-3 text-center dark:bg-gray-800/60"
        >
          <svg-icon :name="item.name" class="mx-auto text-2xl" :class-name="item.className" />
          <div class="mt-2 text-[13px] font-medium">
            {{ item.label }}
          </div>
          <div class="mt-1 text-[11px] text-gray-400">
            &lt;svg-icon name=&quot;{{ item.name }}&quot; /&gt;
          </div>
        </div>
      </div>
    </div>

    <!-- Mock 服务 -->
    <SectionTitle icon="lucide:server" title="Mock 服务" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[13px] font-medium mb-1 flex items-center gap-1 active:opacity-70" @click="openLink('https://github.com/pengzhanbo/vite-plugin-mock-dev-server')">
        vite-plugin-mock-dev-server
        <i-icon icon="lucide:arrow-up-right" class="shrink-0 text-[10px] text-gray-300" />
      </p>
      <p class="text-[11px] text-gray-400 leading-4">
        在 <van-tag size="medium">
          mock/
        </van-tag> 目录下创建 <van-tag size="medium">
          .mock.ts
        </van-tag> 文件即可，开发服务器自动加载，支持热更新。
      </p>
      <div class="mt-2.5 space-y-1.5">
        <div class="flex items-center gap-2 text-[12px]">
          <i-icon icon="lucide:folder" class="text-sm text-amber-500 shrink-0" />
          <span class="text-gray-500">mock/user.mock.ts</span>
          <span class="text-gray-300">→</span>
          <span class="font-medium">GET /dev-api/users</span>
        </div>
        <div class="flex items-center gap-2 text-[12px]">
          <i-icon icon="lucide:folder" class="text-sm text-amber-500 shrink-0" />
          <span class="text-gray-500">mock/user.mock.ts</span>
          <span class="text-gray-300">→</span>
          <span class="font-medium">POST /dev-api/users</span>
        </div>
      </div>
    </div>

    <!-- 自动导入 -->
    <SectionTitle icon="lucide:wand-sparkles" title="自动导入" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[11px] text-gray-400 mb-2.5">
        无需手动 import，直接使用以下 API —— 由 <van-tag size="medium">
          unplugin-auto-import
        </van-tag> 驱动
      </p>
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="api in autoImportApis"
          :key="api.label"
          class="flex items-center gap-2 p-2 rounded-lg"
          :class="[api.color, { 'active:opacity-70': api.url }]"
          @click="openLink(api.url)"
        >
          <i-icon :icon="api.icon" class="text-base shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-medium">{{ api.label }}</span>
              <i-icon
                v-if="api.url"
                icon="lucide:arrow-up-right"
                class="shrink-0 text-[10px] text-gray-300"
              />
            </div>
            <p class="text-[11px] text-gray-400 mt-0.5 truncate">
              {{ api.examples }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件自动加载 -->
    <SectionTitle icon="lucide:component" title="组件自动加载" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[11px] text-gray-400 mb-2.5">
        由 <van-tag size="medium">
          unplugin-vue-components
        </van-tag> 驱动，模板中直接使用，自动按需导入
      </p>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 active:opacity-70" @click="openLink('https://vant-ui.github.io/vant')">
          <i-icon icon="lucide:blocks" class="text-base text-blue-500 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-medium">Vant 组件</span>
              <i-icon icon="lucide:arrow-up-right" class="shrink-0 text-[10px] text-gray-300" />
            </div>
            <p class="text-[11px] text-gray-400 mt-0.5">
              van-button / van-field / van-cell ...
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
          <i-icon icon="lucide:component" class="text-base text-emerald-500 shrink-0" />
          <div class="flex-1 min-w-0">
            <span class="text-[12px] font-medium">公共组件</span>
            <p class="text-[11px] text-gray-400 mt-0.5">
              src/components/ 下组件自动注册
            </p>
          </div>
        </div>
      </div>
      <div class="mt-2.5 flex flex-wrap gap-1.5">
        <van-tag plain>
          按需打包
        </van-tag>
        <van-tag plain>
          TypeScript 类型支持
        </van-tag>
        <van-tag plain>
          零配置
        </van-tag>
      </div>
    </div>

    <!-- Code Inspector -->
    <SectionTitle icon="lucide:scan-search" title="Code Inspector" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <p class="text-[13px] font-medium mb-1 flex items-center gap-1 active:opacity-70" @click="openLink('https://inspector.fe-dev.cn')">
        点击定位源码
        <i-icon icon="lucide:arrow-up-right" class="shrink-0 text-[10px] text-gray-300" />
      </p>
      <p class="text-[11px] text-gray-400 leading-4">
        按住
        <van-tag size="medium">
          Option + Shift
        </van-tag>
        后点击页面任意元素，IDE 自动打开对应源码文件并定位到行号。
      </p>
    </div>

    <!-- AI 辅助开发 -->
    <SectionTitle icon="lucide:sparkles" title="AI 辅助开发" />
    <div class="p-3 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)]">
      <!-- 配置文件 -->
      <p class="text-[11px] text-gray-400 mb-2">
        当前项目通过入口文件 + 规范文件 + skills 共同约束 AI 行为：
      </p>
      <div class="space-y-1.5">
        <div
          v-for="cfg in aiConfigFiles"
          :key="cfg.file"
          class="flex items-center gap-2 text-[12px]"
        >
          <i-icon :icon="cfg.icon" class="text-sm shrink-0" :class="cfg.color" />
          <van-tag size="medium">
            {{ cfg.file }}
          </van-tag>
          <span class="text-gray-400">→</span>
          <span class="text-gray-500 truncate">{{ cfg.tool }}</span>
        </div>
      </div>

      <van-divider class="my-3!" />

      <!-- Skills 技能扩展 -->
      <p class="text-[11px] text-gray-400 mb-2">
        项目内已安装的 Skills：
      </p>
      <div class="flex flex-wrap -m-0.5">
        <van-tag
          v-for="skill in aiSkills"
          :key="skill.label"
          size="large"
          plain
          class="!flex items-center m-0.5"
        >
          <i-icon :icon="skill.icon" class="text-xs mr-1" />
          {{ skill.label }}
        </van-tag>
      </div>
      <p class="text-[11px] text-gray-300 mt-2 leading-4">
        当前仓库内已落地的项目 Skills 位于
        <van-tag size="medium">
          .agents/skills/
        </van-tag>
        ，来源记录在
        <van-tag size="medium">
          skills-lock.json
        </van-tag>
      </p>

      <van-divider class="my-3!" />

      <!-- 编码规范约束 -->
      <p class="text-[11px] text-gray-400 mb-2">
        AI 生成代码时必须遵循的项目约束：
      </p>
      <div class="space-y-1.5">
        <div
          v-for="item in aiConstraints"
          :key="item.rule"
          class="flex items-start gap-2"
        >
          <i-icon :icon="item.icon" class="text-xs text-[#42b883] shrink-0 mt-[3px]" />
          <span class="text-[12px] text-gray-600 dark:text-gray-300 leading-4">{{ item.rule }}</span>
        </div>
      </div>

      <van-divider class="my-3!" />

      <!-- 使用提示 -->
      <div class="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/15">
        <i-icon icon="lucide:lightbulb" class="text-sm text-amber-500 shrink-0 mt-0.5" />
        <p class="text-[11px] text-gray-500 dark:text-gray-400 leading-4">
          当前已启用的主链路是 AGENTS.md + CONSTITUTION.md + 各工具入口文件；如后续接入更多 Cursor 本地技能或快捷命令，可继续扩展。
        </p>
      </div>
    </div>
  </div>
</template>
