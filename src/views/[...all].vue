<script setup lang="ts">
const router = useRouter();

function goHome() {
  router.replace('/');
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-[280px] text-center">
      <van-empty image="error" description="页面不存在或已被移除" />
      <van-button type="primary" block round @click="goHome">
        返回首页
      </van-button>
    </div>
  </div>
</template>

<route lang="json5">
{
  meta: {
    title: '404',
    noCache: true,
    hideTabbar: true,
  },
}
</route>
