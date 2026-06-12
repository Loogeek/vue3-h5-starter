<script setup lang="ts">
defineOptions({
  name: 'ScrollCacheDetail',
});

const route = useRoute();
const router = useRouter();

const itemId = computed(() => Number((route.params as { id?: string }).id ?? 0));
const detailSections = computed(() => [
  { label: '当前记录', value: `缓存示例项 ${itemId.value}` },
  { label: '返回动作', value: '点击左上角返回列表页' },
  { label: '观察点', value: '列表分页数据和滚动位置是否一起恢复' },
  { label: '当前项目现状', value: '页面缓存可做，滚动缓存需要补能力' },
]);
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa] dark:bg-gray-900">
    <van-nav-bar title="缓存详情页" left-arrow @click-left="router.back()" />

    <div class="mx-4 mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] p-4 text-center">
      <div class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500">
        <i-icon icon="lucide:file-stack" class="text-2xl text-white" />
      </div>
      <h2 class="mt-3 text-lg font-bold">
        第 {{ itemId }} 条详情
      </h2>
      <p class="mt-1 text-[12px] leading-5 text-gray-500">
        返回上一页后，如果列表页同时具备页面缓存和滚动缓存，就应该直接回到你离开前看到的位置。
      </p>
    </div>

    <van-cell-group inset class="mt-4">
      <van-cell
        v-for="item in detailSections"
        :key="item.label"
        :title="item.label"
        :value="item.value"
      />
    </van-cell-group>

    <div class="mx-4 mt-4 rounded-xl bg-emerald-50 p-3 text-[12px] leading-5 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
      这个示例页故意不缓存，重点是让列表页保留实例和滚动位置。你可以多次进入不同详情，再连续返回，观察恢复效果是否稳定。
    </div>
  </div>
</template>

<route lang="json5">
{
  meta: {
    title: '缓存详情',
    noCache: true,
    hideTabbar: true,
  },
}
</route>
