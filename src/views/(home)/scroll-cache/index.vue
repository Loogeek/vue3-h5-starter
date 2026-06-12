<script setup lang="ts">
import { usePageScrollCache } from '@/hooks/usePageScrollCache';

defineOptions({
  name: 'ScrollCacheList',
});

const router = useRouter();
const totalCount = 80;
const pageSize = 16;
const currentPage = useSessionStorage('scroll-cache-demo:page', 1);
const isLoadingMore = shallowRef(false);

usePageScrollCache({ key: 'scroll-cache-demo' });

const visibleCount = computed(() => Math.min(currentPage.value * pageSize, totalCount));
const hasMore = computed(() => visibleCount.value < totalCount);
const items = computed(() => {
  return Array.from({ length: visibleCount.value }, (_, index) => {
    const id = index + 1;

    return {
      id,
      title: `缓存示例项 ${id}`,
      description: `第 ${id} 条模拟数据，用于演示分页加载、页面缓存和返回后的滚动恢复。`,
      tag: id % 2 === 0 ? '已缓存' : '可回退',
    };
  });
});

const progressText = computed(() => `已加载 ${visibleCount.value} / ${totalCount}`);

const loadMore = useThrottleFn(() => {
  if (!hasMore.value || isLoadingMore.value) {
    return;
  }

  const distanceToBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  if (distanceToBottom > 120) {
    return;
  }

  isLoadingMore.value = true;
  window.setTimeout(() => {
    currentPage.value += 1;
    isLoadingMore.value = false;
  }, 250);
}, 120);

function goDetail(id: number): void {
  router.push(`/scroll-cache/${id}`);
}

useEventListener(window, 'scroll', loadMore);
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa] dark:bg-gray-900">
    <van-nav-bar title="滚动缓存示例" />

    <div class="mx-4 mt-4 rounded-xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] p-3.5">
      <div class="flex items-center gap-2">
        <i-icon icon="lucide:scroll-text" class="text-base text-emerald-500" />
        <span class="text-[14px] font-bold">列表页 + 详情页回退演示</span>
      </div>
      <p class="mt-2 text-[12px] leading-5 text-gray-500">
        向下滚动触发分页加载，进入详情页后返回，观察列表数据是否保留、滚动位置是否恢复到离开前的位置。
      </p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <van-tag type="primary" plain>
          keep-alive 页面缓存
        </van-tag>
        <van-tag type="success" plain>
          sessionStorage 滚动 + 分页缓存
        </van-tag>
        <van-tag type="warning" plain>
          无限滚动模拟
        </van-tag>
      </div>
    </div>

    <van-cell-group inset class="mt-3">
      <van-cell title="当前状态" :value="progressText" />
      <van-cell title="返回预期" value="回到原滚动位置" />
      <van-cell title="实现方式" value="onBeforeRouteLeave + onActivated" />
    </van-cell-group>

    <div class="mx-4 mt-4 space-y-3 pb-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-block-background)] p-3.5 active:opacity-80"
        @click="goDetail(item.id)"
      >
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-600 dark:bg-emerald-900/20">
            {{ item.id }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="truncate text-[14px] font-medium">{{ item.title }}</span>
              <van-tag size="medium" plain>
                {{ item.tag }}
              </van-tag>
            </div>
            <p class="mt-1 text-[12px] leading-5 text-gray-500">
              {{ item.description }}
            </p>
          </div>
          <i-icon icon="lucide:chevron-right" class="text-sm text-gray-300" />
        </div>
      </div>

      <div class="py-3 text-center text-[12px] text-gray-400">
        <span v-if="hasMore">{{ isLoadingMore ? '加载更多中...' : '继续下滑触发下一页' }}</span>
        <span v-else>已经到底了，返回再进来试试滚动恢复</span>
      </div>
    </div>
  </div>
</template>

<route lang="json5">
{
  meta: {
    title: '滚动缓存示例',
    keepAlive: true,
  },
}
</route>
