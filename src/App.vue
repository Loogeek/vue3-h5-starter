<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import Tabbar from '@/components/tabbar/index.vue';
import { useDarkMode } from '@/hooks/useToggleDarkMode';

const route = useRoute();
const isDev = import.meta.env.DEV;
const showTabbar = computed(() => route.meta?.hideTabbar !== true);
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta?.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta?.keepAlive" />
      </router-view>
      <Tabbar v-if="showTabbar" />
    </van-config-provider>
    <VueQueryDevtools v-if="isDev" />
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/mixin.less';

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
