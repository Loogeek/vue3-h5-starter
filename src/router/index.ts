import { createRouter, createWebHistory } from 'vue-router';

import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import NProgress from '@/utils/progress';
import setPageTitle from '@/utils/set-page-title';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior(to, _from, _savedPosition) {
    // 如果目标路由中有 hash 值，就滚动到相应位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    // 滚动到顶部
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  NProgress.start();

  if (history.scrollRestoration !== 'manual') {
    history.scrollRestoration = 'manual';
  }

  setPageTitle(typeof to.meta.title === 'string' ? to.meta.title : undefined);
});

router.afterEach(() => {
  NProgress.done();
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
