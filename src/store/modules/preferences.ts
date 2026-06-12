import type { AppLocale } from '@/locales';
import { defineStore } from 'pinia';
import { normalizeLocale, setI18nLocale } from '@/locales';
import { store } from '@/store';

export const usePreferencesStore = defineStore('preferences', () => {
  const locale = shallowRef<AppLocale>(normalizeLocale());

  function setLocale(nextLocale: AppLocale) {
    locale.value = nextLocale;
    setI18nLocale(nextLocale);
  }

  return {
    locale,
    setLocale,
  };
}, {
  persist: {
    key: 'vue3-h5-starter:preferences',
    paths: ['locale'],
  },
});

export function usePreferencesStoreHook() {
  return usePreferencesStore(store);
}
