<script setup lang="ts">
defineOptions({
  name: 'HomePage',
});

interface LinkItem {
  label: string;
  desc: string;
  icon: string;
  path?: string;
  url?: string;
}

interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

interface StackItem {
  label: string;
  icon?: string;
  img?: string;
  url?: string;
}

const router = useRouter();

const repoUrl = 'https://github.com/Loogeek/vue3-h5-starter';
const description = 'A Vue 3 mobile H5 starter template with Vite 8, Tailwind CSS v4, Vant 4, Pinia, TanStack Query, built-in examples, and AI-ready conventions.';
const projectSummary = '面向移动端网页、微信公众号页面和混合 App WebView 的 Vue 3 H5 应用脚手架，内置官网首页、示例页面、数据请求、文件路由和 AI 协作规范。';

const stackItems: StackItem[] = [
  { label: 'Vue 3.5+', icon: 'logos:vue', url: 'https://vuejs.org' },
  { label: 'Vite 8', icon: 'logos:vitejs', url: 'https://vite.dev' },
  { label: 'TypeScript', icon: 'logos:typescript-icon', url: 'https://www.typescriptlang.org' },
  { label: 'Tailwind v4', icon: 'logos:tailwindcss-icon', url: 'https://tailwindcss.com' },
  { label: 'Pinia', icon: 'logos:pinia', url: 'https://pinia.vuejs.org' },
  { label: 'Vant 4', icon: 'lucide:blocks', url: 'https://vant-ui.github.io/vant' },
];

const examples: LinkItem[] = [
  {
    label: 'TanStack Query',
    desc: '列表、详情、创建与缓存刷新示例',
    icon: 'lucide:database',
    path: '/query',
  },
  {
    label: 'File Routes',
    desc: '文件路由、动态参数与类型安全跳转',
    icon: 'lucide:route',
    path: '/routes',
  },
  {
    label: 'Scroll Cache',
    desc: '列表滚动缓存与页面回退体验',
    icon: 'lucide:scroll-text',
    path: '/scroll-cache',
  },
  {
    label: 'Toolbox',
    desc: '图标、深色模式、AI 协作与开发工具',
    icon: 'lucide:wrench',
    path: '/tools',
  },
];

const features: FeatureItem[] = [
  {
    title: 'Mobile-first UI',
    desc: 'Vant 4 + Tailwind CSS v4，内置视口适配、深色模式和常用移动端页面结构。',
    icon: 'lucide:smartphone',
  },
  {
    title: 'Modern build chain',
    desc: 'Vite 8、Rolldown、Oxc、legacy bundle、gzip 压缩和可选 CDN 加速。',
    icon: 'lucide:rocket',
  },
  {
    title: 'Data workflow',
    desc: 'Axios 封装、Mock Dev Server、TanStack Query 缓存和 Pinia 客户端状态。',
    icon: 'lucide:database-zap',
  },
  {
    title: 'AI-ready conventions',
    desc: 'AGENTS、CONSTITUTION、Claude、Cursor、Copilot 和 Vue skills 已经放进项目。',
    icon: 'lucide:bot',
  },
];

const introCards: FeatureItem[] = [
  {
    title: '项目定位',
    desc: '适合作为移动端 H5、新业务活动页、公众号网页和 App 内嵌页面的起步模板。',
    icon: 'lucide:target',
  },
  {
    title: '内置能力',
    desc: '首页、示例页、请求缓存、文件路由、本地 Mock、移动端组件、深色模式和开发调试工具已预置。',
    icon: 'lucide:layers-3',
  },
  {
    title: '协作规范',
    desc: '内置 README、AGENTS、CONSTITUTION 和主流 AI 工具入口，便于团队统一开发约定。',
    icon: 'lucide:file-check-2',
  },
];

const commands = [
  { label: 'Install', value: 'pnpm install' },
  { label: 'Develop', value: 'pnpm dev' },
  { label: 'Build', value: 'pnpm build' },
  { label: 'Check', value: 'pnpm lint && pnpm test:run' },
];

const repoTopics = [
  'vue3',
  'vite8',
  'mobile',
  'h5',
  'vant',
  'tailwindcss',
  'pinia',
  'tanstack-query',
];

function openLink(url?: string) {
  if (url)
    window.open(url, '_blank', 'noopener,noreferrer');
}

function go(path?: string) {
  if (path)
    router.push(path);
}
</script>

<template>
  <main class="min-h-screen bg-[#f6f8f5] text-[#1e2a24] dark:bg-[#101412] dark:text-[#eef5ef]">
    <section class="relative overflow-hidden border-b border-black/5 bg-[#f6f8f5] dark:border-white/10 dark:bg-[#101412]">
      <div class="mx-auto grid max-w-6xl gap-8 px-5 pb-10 pt-6 md:grid-cols-[1fr_390px] md:px-8 md:pb-16 md:pt-10">
        <div class="flex flex-col justify-between">
          <nav class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <div class="flex size-10 items-center justify-center rounded-xl bg-[#243b2f] text-white shadow-sm dark:bg-[#dff8df] dark:text-[#142118]">
                <i-icon icon="logos:vue" class="text-xl" />
              </div>
              <div>
                <p class="text-[15px] font-bold leading-5">
                  vue3-h5-starter
                </p>
                <p class="text-[11px] text-[#657269] dark:text-[#a4afa6]">
                  Vue mobile H5 template
                </p>
              </div>
            </div>
            <van-button
              size="small"
              icon="github-o"
              class="!rounded-full !border-[#243b2f]/20 !bg-transparent !px-4 dark:!border-white/20"
              @click="openLink(repoUrl)"
            >
              GitHub
            </van-button>
          </nav>

          <div class="mt-12 md:mt-20">
            <p class="mb-4 inline-flex rounded-full border border-[#243b2f]/15 bg-white px-3 py-1 text-[12px] font-medium text-[#4d6c58] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#c6dcc9]">
              移动端 H5 应用脚手架
            </p>
            <h1 class="max-w-3xl text-[42px] font-black leading-[46px] tracking-normal md:text-[76px] md:leading-[78px]">
              Vue3 H5 Starter
            </h1>
            <p class="mt-5 max-w-2xl text-[15px] leading-7 text-[#536257] md:text-[17px] dark:text-[#b7c2bb]">
              {{ projectSummary }}
            </p>
            <p class="mt-3 max-w-2xl text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
              {{ description }}
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <van-button type="primary" icon="play-circle-o" class="!h-11 !rounded-full !bg-[#243b2f] !px-6 !text-white dark:!bg-[#dff8df] dark:!text-[#142118]" @click="go('/query')">
                View examples
              </van-button>
              <van-button icon="down" class="!h-11 !rounded-full !border-[#243b2f]/20 !bg-white/80 !px-6 dark:!border-white/15 dark:!bg-white/5" @click="openLink(repoUrl)">
                Use template
              </van-button>
            </div>
          </div>

          <div class="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div
              v-for="item in stackItems"
              :key="item.label"
              class="flex min-h-11 items-center gap-2 rounded-lg border border-[#243b2f]/10 bg-white/70 px-3 text-[12px] font-medium text-[#425046] shadow-sm active:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-[#d8e4da]"
              @click="openLink(item.url)"
            >
              <i-icon v-if="item.icon" :icon="item.icon" class="text-lg" />
              <img v-else-if="item.img" :src="item.img" class="size-4 rounded-xs" alt="">
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[370px] md:pt-12">
          <div class="rounded-[34px] border border-[#243b2f]/15 bg-[#111815] p-3 shadow-2xl shadow-[#203528]/20">
            <div class="overflow-hidden rounded-[26px] bg-[#f7faf7] dark:bg-[#111815]">
              <div class="flex items-center justify-between border-b border-black/5 px-4 py-3 dark:border-white/10">
                <div>
                  <p class="text-[12px] font-bold text-[#203528] dark:text-white">
                    Starter Preview
                  </p>
                  <p class="text-[10px] text-[#6b786e] dark:text-[#9aa6a0]">
                    Mobile-first examples
                  </p>
                </div>
                <div class="flex gap-1">
                  <span class="size-2 rounded-full bg-[#7ed68d]" />
                  <span class="size-2 rounded-full bg-[#f2b45b]" />
                  <span class="size-2 rounded-full bg-[#ef776f]" />
                </div>
              </div>
              <div class="space-y-3 p-4">
                <div class="rounded-2xl bg-[#243b2f] p-4 text-white">
                  <p class="text-[12px] text-white/70">
                    Ready stack
                  </p>
                  <p class="mt-1 text-xl font-black">
                    Build, mock, test, ship.
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="item in examples.slice(0, 4)"
                    :key="item.label"
                    class="rounded-2xl border border-black/5 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <i-icon :icon="item.icon" class="text-xl text-[#3c7d4b]" />
                    <p class="mt-2 text-[12px] font-bold text-[#233228] dark:text-white">
                      {{ item.label }}
                    </p>
                  </div>
                </div>
                <div class="rounded-2xl border border-dashed border-[#3c7d4b]/30 bg-[#eaf5ec] p-3 text-[11px] leading-5 text-[#3d5644] dark:bg-[#1c2821] dark:text-[#c6d6c9]">
                  Files under <span class="font-bold">src/views</span> become routes automatically.
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center text-[11px] text-[#6b786e] dark:text-[#a6b2aa]">
            Actual examples are available inside this template.
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div class="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p class="text-[12px] font-bold uppercase text-[#3c7d4b]">
            Project
          </p>
          <h2 class="mt-1 text-2xl font-black">
            一个可以直接开工的移动端模板
          </h2>
          <p class="mt-3 text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
            这个项目不只是空模板，已经把移动端项目的常用起点整理好：官网展示、示例页面、接口请求、状态管理、路由约定、样式方案、调试工具和协作说明。
          </p>
        </div>
        <div class="grid gap-3">
          <div
            v-for="item in introCards"
            :key="item.title"
            class="rounded-xl border border-[#243b2f]/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div class="flex items-start gap-3">
              <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e9f4eb] text-[#326d40] dark:bg-[#1c2b21] dark:text-[#9ee2a9]">
                <i-icon :icon="item.icon" class="text-xl" />
              </div>
              <div>
                <h3 class="text-[15px] font-black">
                  {{ item.title }}
                </h3>
                <p class="mt-1 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div class="mb-5 flex items-end justify-between gap-4">
        <div>
          <p class="text-[12px] font-bold uppercase text-[#3c7d4b]">
            Examples
          </p>
          <h2 class="mt-1 text-2xl font-black">
            Open the built-in demos
          </h2>
        </div>
        <span class="hidden text-[12px] text-[#657269] md:inline dark:text-[#a4afa6]">No backend required for local demos</span>
      </div>
      <div class="grid gap-3 md:grid-cols-4">
        <button
          v-for="item in examples"
          :key="item.label"
          type="button"
          class="group rounded-xl border border-[#243b2f]/10 bg-white p-4 text-left shadow-sm transition active:opacity-80 md:hover:-translate-y-0.5 md:hover:shadow-md dark:border-white/10 dark:bg-white/5"
          @click="go(item.path)"
        >
          <div class="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#e9f4eb] text-[#326d40] dark:bg-[#1c2b21] dark:text-[#9ee2a9]">
            <i-icon :icon="item.icon" class="text-xl" />
          </div>
          <p class="text-[15px] font-bold">
            {{ item.label }}
          </p>
          <p class="mt-2 min-h-10 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]">
            {{ item.desc }}
          </p>
          <div class="mt-4 flex items-center gap-1 text-[12px] font-bold text-[#326d40] dark:text-[#9ee2a9]">
            Open
            <i-icon icon="lucide:arrow-right" class="text-sm transition group-hover:translate-x-0.5" />
          </div>
        </button>
      </div>
    </section>

    <section class="border-y border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]">
      <div class="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-4 md:px-8 md:py-14">
        <div
          v-for="item in features"
          :key="item.title"
          class="rounded-xl border border-[#243b2f]/10 bg-[#f8faf8] p-4 dark:border-white/10 dark:bg-white/5"
        >
          <i-icon :icon="item.icon" class="text-2xl text-[#326d40] dark:text-[#9ee2a9]" />
          <h3 class="mt-4 text-[15px] font-black">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-6xl gap-5 px-5 py-10 md:grid-cols-[1fr_1fr] md:px-8 md:py-14">
      <div>
        <p class="text-[12px] font-bold uppercase text-[#3c7d4b]">
          Start fast
        </p>
        <h2 class="mt-1 text-2xl font-black">
          Four commands to run locally
        </h2>
        <p class="mt-3 text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
          The template is intentionally practical: install with pnpm, run the dev server, build for production, and use the existing checks before shipping changes.
        </p>
      </div>
      <div class="rounded-xl bg-[#142118] p-4 text-[#e9f7ec] shadow-xl shadow-[#203528]/10">
        <div
          v-for="item in commands"
          :key="item.label"
          class="flex items-start gap-3 border-b border-white/10 py-3 last:border-0"
        >
          <span class="w-16 shrink-0 text-[11px] font-bold uppercase text-[#92d49b]">{{ item.label }}</span>
          <code class="text-[13px] leading-5 text-white">{{ item.value }}</code>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-12 md:px-8 md:pb-16">
      <div class="rounded-xl border border-[#243b2f]/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <p class="text-[12px] font-bold uppercase text-[#3c7d4b]">
          GitHub About
        </p>
        <h2 class="mt-1 text-xl font-black">
          Recommended repository description
        </h2>
        <p class="mt-3 text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
          {{ description }}
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="topic in repoTopics"
            :key="topic"
            class="rounded-full bg-[#e9f4eb] px-3 py-1 text-[11px] font-medium text-[#326d40] dark:bg-[#1c2b21] dark:text-[#9ee2a9]"
          >
            {{ topic }}
          </span>
        </div>
      </div>
    </section>
  </main>
</template>

<route lang="json5">
{
  meta: {
    title: 'Vue3 H5 Starter',
    hideTabbar: true,
  },
}
</route>
