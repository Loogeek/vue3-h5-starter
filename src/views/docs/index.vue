<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'DocsPage',
});

interface DocCard {
  title: string;
  desc: string;
  icon: string;
}

const { t } = useI18n();

const commands = [
  { label: 'Install', value: 'pnpm install' },
  { label: 'Develop', value: 'pnpm dev' },
  { label: 'Build', value: 'pnpm build' },
  { label: 'Check', value: 'pnpm lint && pnpm test:run' },
];

const capabilities = computed<DocCard[]>(() => [
  { title: 'PWA', desc: t('docs.pwa'), icon: 'lucide:badge-check' },
  { title: 'i18n', desc: t('docs.i18n'), icon: 'lucide:languages' },
  { title: 'Pinia', desc: t('docs.persist'), icon: 'logos:pinia' },
  { title: 'Netlify', desc: t('docs.deploy'), icon: 'lucide:cloud' },
]);

const examples = computed<DocCard[]>(() => [
  { title: t('home.examples.queryTitle'), desc: t('home.examples.queryDesc'), icon: 'lucide:database' },
  { title: t('home.examples.routesTitle'), desc: t('home.examples.routesDesc'), icon: 'lucide:route' },
  { title: t('home.examples.scrollTitle'), desc: t('home.examples.scrollDesc'), icon: 'lucide:scroll-text' },
  { title: t('home.examples.toolsTitle'), desc: t('home.examples.toolsDesc'), icon: 'lucide:wrench' },
]);

const roadmap = computed(() => [
  t('docs.roadmapPwa'),
  t('docs.roadmapExamples'),
  t('docs.roadmapVitePress'),
]);
</script>

<template>
  <main class="min-h-screen bg-[#f6f8f5] px-4 pb-8 pt-4 text-[#1e2a24] dark:bg-[#101412] dark:text-[#eef5ef]">
    <section class="rounded-2xl bg-[#243b2f] p-5 text-white shadow-lg shadow-[#203528]/10">
      <p class="text-[12px] font-bold uppercase text-[#9ee2a9]">
        Docs
      </p>
      <h1 class="mt-2 text-[28px] font-black leading-8">
        {{ t('docs.title') }}
      </h1>
      <p class="mt-3 text-[13px] leading-6 text-white/75">
        {{ t('docs.subtitle') }}
      </p>
    </section>

    <section class="mt-4 rounded-xl border border-[#243b2f]/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <h2 class="text-[16px] font-black">
        {{ t('docs.quickStart') }}
      </h2>
      <div class="mt-3 space-y-2">
        <div
          v-for="item in commands"
          :key="item.label"
          class="flex items-center justify-between gap-3 rounded-lg bg-[#f1f6f2] px-3 py-2 dark:bg-white/5"
        >
          <span class="text-[12px] font-bold text-[#326d40] dark:text-[#9ee2a9]">{{ item.label }}</span>
          <code class="text-[12px] text-[#26342b] dark:text-white">{{ item.value }}</code>
        </div>
      </div>
    </section>

    <section class="mt-4">
      <h2 class="mb-3 text-[16px] font-black">
        {{ t('docs.capabilities') }}
      </h2>
      <div class="grid gap-3 md:grid-cols-2">
        <article
          v-for="item in capabilities"
          :key="item.title"
          class="rounded-xl border border-[#243b2f]/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
        >
          <i-icon :icon="item.icon" class="text-2xl text-[#326d40] dark:text-[#9ee2a9]" />
          <h3 class="mt-3 text-[15px] font-black">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]">
            {{ item.desc }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-4">
      <h2 class="mb-3 text-[16px] font-black">
        {{ t('docs.examples') }}
      </h2>
      <div class="space-y-2">
        <article
          v-for="item in examples"
          :key="item.title"
          class="flex items-start gap-3 rounded-xl border border-[#243b2f]/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
        >
          <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e9f4eb] text-[#326d40] dark:bg-[#1c2b21] dark:text-[#9ee2a9]">
            <i-icon :icon="item.icon" class="text-xl" />
          </div>
          <div>
            <h3 class="text-[14px] font-black">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]">
              {{ item.desc }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-4 rounded-xl border border-[#243b2f]/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <h2 class="text-[16px] font-black">
        {{ t('docs.roadmap') }}
      </h2>
      <div class="mt-3 space-y-2">
        <div
          v-for="item in roadmap"
          :key="item"
          class="flex items-start gap-2 text-[12px] leading-5 text-[#657269] dark:text-[#a4afa6]"
        >
          <i-icon icon="lucide:check-circle-2" class="mt-0.5 shrink-0 text-[#326d40] dark:text-[#9ee2a9]" />
          <span>{{ item }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<route lang="json5">
{
  meta: {
    title: 'Docs',
  },
}
</route>
