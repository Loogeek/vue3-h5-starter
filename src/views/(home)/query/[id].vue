<script setup lang="ts">
import { useUserDetail } from '@/composables/useUserQuery';

defineOptions({ name: 'QueryDetail' });

const route = useRoute('/(home)/query/[id]');
const router = useRouter();

const userId = computed(() => route.params.id);
const { data: user, isLoading, isRefetching, dataUpdatedAt } = useUserDetail(userId);

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
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <!-- 导航栏 -->
    <van-nav-bar title="用户详情" left-arrow @click-left="router.back()">
      <template #right>
        <van-tag :type="statusType" size="medium">
          {{ statusText }}
        </van-tag>
      </template>
    </van-nav-bar>

    <!-- 加载骨架 -->
    <template v-if="isLoading">
      <div class="p-4">
        <van-skeleton title avatar :row="3" />
      </div>
    </template>

    <!-- 用户信息 -->
    <template v-else-if="user">
      <div class="bg-white mx-4 mt-4 rounded-lg p-6 text-center">
        <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
          <span class="text-blue-500 text-3xl font-bold">{{ user.name.charAt(0) }}</span>
        </div>
        <h2 class="text-xl font-bold">
          {{ user.name }}
        </h2>
        <p class="text-gray-500 mt-1">
          {{ user.department }}
        </p>
      </div>

      <van-cell-group inset class="mt-4">
        <van-cell title="用户 ID" :value="user.id" />
        <van-cell title="邮箱" :value="user.email" />
        <van-cell title="电话" :value="user.phone" />
        <van-cell title="部门" :value="user.department" />
      </van-cell-group>

      <!-- 缓存信息 -->
      <van-cell-group inset class="mt-4">
        <van-cell title="当前说明" :label="statusDescription" />
        <van-cell title="数据更新时间">
          <template #value>
            <span class="text-xs text-gray-400">
              {{ dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '-' }}
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <div class="mx-4 mt-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-xs text-blue-600 leading-relaxed">
          <strong>缓存机制：</strong>返回列表页后 30 秒内再次进入此页面，通常会直接使用缓存。
          如果你看到「后台刷新中」，表示旧数据已经先显示出来，同时又在后台补拉了一次新数据。
          你可以在 TanStack Query DevTools 中查看 <code class="bg-blue-100 px-1 rounded">["users","detail","{{ user.id }}"]</code> 这个 Query 的状态。
        </p>
      </div>
    </template>

    <!-- 空状态 -->
    <template v-else>
      <van-empty description="用户不存在" />
    </template>
  </div>
</template>
