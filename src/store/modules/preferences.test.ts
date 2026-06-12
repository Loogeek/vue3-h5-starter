import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { usePreferencesStore } from './preferences';

describe('preferences store', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = '';
    setActivePinia(createPinia());
  });

  it('切换语言时会更新 store 和文档语言', () => {
    const store = usePreferencesStore();

    store.setLocale('en-US');

    expect(store.locale).toBe('en-US');
    expect(document.documentElement.lang).toBe('en-US');
  });
});
