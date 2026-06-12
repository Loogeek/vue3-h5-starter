interface UsePageScrollCacheOptions {
  key: string;
}

function getScrollStorageKey(key: string): string {
  return `page-scroll:${key}`;
}

function readScrollPosition(key: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const value = window.sessionStorage.getItem(getScrollStorageKey(key));
  const position = Number(value ?? 0);

  return Number.isFinite(position) ? position : 0;
}

function writeScrollPosition(key: string, position: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(getScrollStorageKey(key), String(Math.max(position, 0)));
}

function getPageScrollTop(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function usePageScrollCache(options: UsePageScrollCacheOptions) {
  const lastScrollTop = shallowRef(0);

  function savePosition(): void {
    lastScrollTop.value = getPageScrollTop();
    writeScrollPosition(options.key, lastScrollTop.value);
  }

  function restorePosition(): void {
    const targetTop = readScrollPosition(options.key);

    lastScrollTop.value = targetTop;

    nextTick(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: targetTop, behavior: 'auto' });
      });
    });
  }

  onMounted(() => {
    restorePosition();
  });

  onActivated(() => {
    restorePosition();
  });

  onBeforeRouteLeave(() => {
    savePosition();
  });

  onBeforeUnmount(() => {
    savePosition();
  });

  return {
    lastScrollTop: readonly(lastScrollTop),
    restorePosition,
    savePosition,
  };
}
