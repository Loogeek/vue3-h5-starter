<script setup lang="ts">
defineOptions({
  name: 'RouteSlugDetail',
});

const route = useRoute('/(home)/routes/[slug]');
const router = useRouter();
const DASH_RE = /-/g;
const WORD_INITIAL_RE = /\b\w/g;

const slug = computed(() => route.params.slug);

const prettySlug = computed(() =>
  slug.value.replace(DASH_RE, ' ').replace(WORD_INITIAL_RE, c => c.toUpperCase()),
);

interface RouteInfo {
  label: string;
  value: string;
}

const routeInfo = computed<RouteInfo[]>(() => [
  { label: '当前路径', value: route.fullPath },
  { label: '路由名称', value: String(route.name ?? '-') },
  { label: 'slug 参数', value: slug.value },
  { label: '匹配文件', value: 'src/views/(home)/routes/[slug].vue' },
]);

const relatedSlugs = ['hello-world', 'tailwind-css-v4', 'vue3-composition-api', 'pnpm-monorepo'];

function goSlug(s: string) {
  router.push(`/routes/${s}`);
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa] dark:bg-gray-900">
    <van-nav-bar
      :title="`动态路由: ${slug}`"
      left-arrow
      @click-left="router.back()"
    />

    <!-- 动态参数展示 -->
    <div class="mx-4 mt-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-[color:var(--color-border)] text-center">
      <div class="size-16 mx-auto rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
        <i-icon icon="lucide:hash" class="text-2xl text-white" />
      </div>
      <h2 class="text-lg font-bold">
        {{ prettySlug }}
      </h2>
      <p class="text-xs text-gray-400 mt-1">
        通过 [slug].vue 文件匹配的动态路由页面
      </p>
    </div>

    <!-- 路由信息 -->
    <van-cell-group inset class="mt-4" title="路由解析信息">
      <van-cell
        v-for="info in routeInfo"
        :key="info.label"
        :title="info.label"
        :value="info.value"
      />
    </van-cell-group>

    <!-- 代码示例 -->
    <div class="mx-4 mt-4">
      <h3 class="text-[13px] font-bold mb-2 flex items-center gap-1.5">
        <i-icon icon="lucide:code" class="text-sm text-gray-500" />
        获取动态参数
      </h3>
      <pre class="p-3 rounded-xl bg-white dark:bg-gray-800 border border-[color:var(--color-border)] text-[11px] leading-[18px] text-gray-600 dark:text-gray-400 overflow-x-auto">// 类型安全的路由参数获取
const route = useRoute('/(home)/routes/[slug]');
const slug = computed(() => route.params.slug);
// slug = "{{ slug }}"</pre>
    </div>

    <!-- 切换其他 slug -->
    <div class="mx-4 mt-4 mb-6">
      <h3 class="text-[13px] font-bold mb-2 flex items-center gap-1.5">
        <i-icon icon="lucide:shuffle" class="text-sm text-gray-500" />
        切换其他 slug
      </h3>
      <div class="flex flex-wrap gap-2">
        <van-tag
          v-for="s in relatedSlugs"
          :key="s"
          size="large"
          :type="s === slug ? 'primary' : 'default'"
          class="active:opacity-70"
          @click="goSlug(s)"
        >
          {{ s }}
        </van-tag>
      </div>
    </div>
  </div>
</template>
