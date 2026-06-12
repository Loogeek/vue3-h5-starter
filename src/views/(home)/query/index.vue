<script setup lang="ts">
import { useUserList } from '@/composables/useUserQuery';

defineOptions({ name: 'QueryList' });

const router = useRouter();

const {
  data: users,
  isLoading,
  isFetching,
  isRefetching,
  dataUpdatedAt,
  refetch
} = useUserList();

const statusType = computed(() => {
  if (isLoading.value) {
    return 'primary';
  }

  if (isRefetching.value) {
    return 'warning';
  }

  return 'success';
});

const statusText = computed(() => {
  if (isLoading.value) {
    return '首次加载';
  }

  if (isRefetching.value) {
    return '后台刷新中';
  }

  return '缓存可用';
});

const statusDescription = computed(() => {
  if (isLoading.value) {
    return '当前没有旧数据，正在发起第一次请求。';
  }

  if (isRefetching.value) {
    return '页面先显示之前的缓存，同时后台补拉一份新数据。';
  }

  return '当前直接使用内存里的缓存，没有进行中的请求。';
});

function goDetail(id: string) {
  router.push(`/query/${id}`);
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <!-- 顶部说明 -->
    <div class="px-4 pt-4">
      <h1 class="text-lg font-bold">
        TanStack Query 示例
      </h1>
      <p class="text-xs text-gray-400 mt-1 leading-relaxed">
        演示缓存、去重、后台刷新。点击用户进入详情页，返回后观察请求行为。
      </p>
    </div>

    <!-- 缓存状态面板 -->
    <van-cell-group inset class="mt-3">
      <van-cell title="数据状态">
        <template #value>
          <van-tag :type="statusType">
            {{ statusText }}
          </van-tag>
        </template>
      </van-cell>
      <van-cell title="当前说明" :label="statusDescription" />
      <van-cell title="上次更新">
        <template #value>
          <span class="text-xs text-gray-400">
            {{ dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '-' }}
          </span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 操作 -->
    <div class="px-4 my-3 flex gap-2">
      <van-button
        type="primary"
        size="small"
        :loading="isFetching"
        @click="() => refetch()"
      >
        手动刷新
      </van-button>
    </div>

    <!-- 用户列表 -->
    <van-cell-group inset class="mt-3">
      <template v-if="isLoading">
        <van-skeleton title :row="3" class="p-4" />
      </template>
      <template v-else>
        <van-cell
          v-for="user in users"
          :key="user.id"
          :title="user.name"
          :label="user.email"
          is-link
          @click="goDetail(user.id)"
        >
          <template #icon>
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span class="text-blue-500 font-bold">{{ user.name.charAt(0) }}</span>
            </div>
          </template>
        </van-cell>
      </template>
    </van-cell-group>

    <!-- 底部提示 -->
    <div class="mx-4 mt-4 p-3 bg-blue-50 rounded-lg">
      <p class="text-xs text-blue-600 leading-relaxed">
        <strong>试一试：</strong>进入详情页再返回，30 秒内通常会直接使用缓存。
        如果你看到「后台刷新中」，表示页面已经先用了旧数据，只是又在后台补拉新数据。
        超过 30 秒后再次返回，更容易看到这个状态。
        <br><br>
        打开页面底部的 <strong>TanStack Query DevTools</strong> 面板，可以实时查看每个 Query 的缓存状态。
      </p>
    </div>
  </div>
</template>
