<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const active = ref(0);
const tabbarData = computed(() => [
  {
    icon: 'wap-home-o',
    title: t('nav.home'),
    to: '/',
  },
  {
    icon: 'description-o',
    title: t('nav.docs'),
    to: '/docs',
  },
  {
    icon: 'gem-o',
    title: t('nav.tools'),
    to: '/tools',
  },
]);
</script>

<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="item in tabbarData"
      :key="item.to"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
