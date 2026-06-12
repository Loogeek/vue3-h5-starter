<script setup lang="ts">
import type { AppLocale } from '@/locales';
import { useI18n } from 'vue-i18n';
import { usePreferencesStoreHook } from '@/store/modules/preferences';

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
const { t } = useI18n();
const preferences = usePreferencesStoreHook();
const { locale } = storeToRefs(preferences);

const repoUrl = 'https://github.com/Loogeek/vue3-h5-starter';
const description = computed(() => t('common.description'));
const projectSummary = computed(() => t('home.summary'));
const nextLocale = computed<AppLocale>(() => locale.value === 'zh-CN' ? 'en-US' : 'zh-CN');
const nextLocaleLabel = computed(() => nextLocale.value === 'zh-CN' ? '中文' : 'English');

const stackItems: StackItem[] = [
  { label: 'Vue 3.5+', icon: 'logos:vue', url: 'https://vuejs.org' },
  { label: 'Vite 8', icon: 'logos:vitejs', url: 'https://vite.dev' },
  { label: 'TypeScript', icon: 'logos:typescript-icon', url: 'https://www.typescriptlang.org' },
  { label: 'Tailwind v4', icon: 'logos:tailwindcss-icon', url: 'https://tailwindcss.com' },
  { label: 'Pinia', icon: 'logos:pinia', url: 'https://pinia.vuejs.org' },
  { label: 'Vant 4', icon: 'lucide:blocks', url: 'https://vant-ui.github.io/vant' },
];

const examples = computed<LinkItem[]>(() => [
  {
    label: t('home.examples.queryTitle'),
    desc: t('home.examples.queryDesc'),
    icon: 'lucide:database',
    path: '/query',
  },
  {
    label: t('home.examples.routesTitle'),
    desc: t('home.examples.routesDesc'),
    icon: 'lucide:route',
    path: '/routes',
  },
  {
    label: t('home.examples.scrollTitle'),
    desc: t('home.examples.scrollDesc'),
    icon: 'lucide:scroll-text',
    path: '/scroll-cache',
  },
  {
    label: t('home.examples.toolsTitle'),
    desc: t('home.examples.toolsDesc'),
    icon: 'lucide:wrench',
    path: '/tools',
  },
  {
    label: t('home.examples.docsTitle'),
    desc: t('home.examples.docsDesc'),
    icon: 'lucide:book-open-text',
    path: '/docs',
  },
]);

const features = computed<FeatureItem[]>(() => [
  {
    title: t('home.features.mobileTitle'),
    desc: t('home.features.mobileDesc'),
    icon: 'lucide:smartphone',
  },
  {
    title: t('home.features.buildTitle'),
    desc: t('home.features.buildDesc'),
    icon: 'lucide:rocket',
  },
  {
    title: t('home.features.dataTitle'),
    desc: t('home.features.dataDesc'),
    icon: 'lucide:database-zap',
  },
  {
    title: t('home.features.conventionTitle'),
    desc: t('home.features.conventionDesc'),
    icon: 'lucide:bot',
  },
]);

const introCards = computed<FeatureItem[]>(() => [
  {
    title: t('home.project.positionTitle'),
    desc: t('home.project.positionDesc'),
    icon: 'lucide:target',
  },
  {
    title: t('home.project.abilityTitle'),
    desc: t('home.project.abilityDesc'),
    icon: 'lucide:layers-3',
  },
  {
    title: t('home.project.conventionTitle'),
    desc: t('home.project.conventionDesc'),
    icon: 'lucide:file-check-2',
  },
]);

const commands = computed(() => [
  { label: t('home.start.install'), value: 'pnpm install' },
  { label: t('home.start.develop'), value: 'pnpm dev' },
  { label: t('home.start.build'), value: 'pnpm build' },
  { label: t('home.start.check'), value: 'pnpm lint && pnpm test:run' },
]);

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

function toggleLocale() {
  preferences.setLocale(nextLocale.value);
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
              {{ t('common.github') }}
            </van-button>
            <van-button
              size="small"
              icon="exchange"
              class="!rounded-full !border-[#243b2f]/20 !bg-white/70 !px-4 dark:!border-white/20 dark:!bg-white/5"
              @click="toggleLocale"
            >
              {{ nextLocaleLabel }}
            </van-button>
          </nav>

          <div class="mt-12 md:mt-20">
            <p class="mb-4 inline-flex rounded-full border border-[#243b2f]/15 bg-white px-3 py-1 text-[12px] font-medium text-[#4d6c58] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#c6dcc9]">
              {{ t('home.badge') }}
            </p>
            <h1 class="max-w-3xl text-[42px] font-black leading-[46px] tracking-normal md:text-[76px] md:leading-[78px]">
              {{ t('home.title') }}
            </h1>
            <p class="mt-5 max-w-2xl text-[15px] leading-7 text-[#536257] md:text-[17px] dark:text-[#b7c2bb]">
              {{ projectSummary }}
            </p>
            <p class="mt-3 max-w-2xl text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
              {{ description }}
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <van-button type="primary" icon="play-circle-o" class="!h-11 !rounded-full !bg-[#243b2f] !px-6 !text-white dark:!bg-[#dff8df] dark:!text-[#142118]" @click="go('/query')">
                {{ t('home.viewExamples') }}
              </van-button>
              <van-button icon="down" class="!h-11 !rounded-full !border-[#243b2f]/20 !bg-white/80 !px-6 dark:!border-white/15 dark:!bg-white/5" @click="openLink(repoUrl)">
                {{ t('home.useTemplate') }}
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
                    {{ t('home.previewTitle') }}
                  </p>
                  <p class="text-[10px] text-[#6b786e] dark:text-[#9aa6a0]">
                    {{ t('home.previewSubtitle') }}
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
                    {{ t('home.readyStack') }}
                  </p>
                  <p class="mt-1 text-xl font-black">
                    {{ t('home.buildMockShip') }}
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
                  {{ t('home.routesTip') }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center text-[11px] text-[#6b786e] dark:text-[#a6b2aa]">
            {{ t('home.actualExamples') }}
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div class="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p class="text-[12px] font-bold uppercase text-[#3c7d4b]">
            {{ t('home.project.eyebrow') }}
          </p>
          <h2 class="mt-1 text-2xl font-black">
            {{ t('home.project.title') }}
          </h2>
          <p class="mt-3 text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
            {{ t('home.project.desc') }}
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
            {{ t('home.examples.eyebrow') }}
          </p>
          <h2 class="mt-1 text-2xl font-black">
            {{ t('home.examples.title') }}
          </h2>
        </div>
        <span class="hidden text-[12px] text-[#657269] md:inline dark:text-[#a4afa6]">{{ t('home.examples.note') }}</span>
      </div>
      <div class="grid gap-3 md:grid-cols-5">
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
            {{ t('home.examples.open') }}
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
          {{ t('home.start.eyebrow') }}
        </p>
        <h2 class="mt-1 text-2xl font-black">
          {{ t('home.start.title') }}
        </h2>
        <p class="mt-3 text-[13px] leading-6 text-[#657269] dark:text-[#a4afa6]">
          {{ t('home.start.desc') }}
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
          {{ t('home.about.eyebrow') }}
        </p>
        <h2 class="mt-1 text-xl font-black">
          {{ t('home.about.title') }}
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
