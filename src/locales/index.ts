import { Locale as VantLocale } from 'vant';
import enUSVant from 'vant/es/locale/lang/en-US';
import zhCNVant from 'vant/es/locale/lang/zh-CN';
import { createI18n } from 'vue-i18n';
import enUS from './en-US';
import zhCN from './zh-CN';

export const supportedLocales = ['zh-CN', 'en-US'] as const;
export type AppLocale = typeof supportedLocales[number];

export const defaultLocale: AppLocale = 'zh-CN';

export const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages,
});

export function isSupportedLocale(value: string): value is AppLocale {
  return supportedLocales.includes(value as AppLocale);
}

export function normalizeLocale(value?: string | null): AppLocale {
  if (value && isSupportedLocale(value)) {
    return value;
  }

  const language = typeof navigator === 'undefined' ? '' : navigator.language;
  return language.toLowerCase().startsWith('en') ? 'en-US' : defaultLocale;
}

export function setI18nLocale(locale: AppLocale) {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  VantLocale.use(locale, locale === 'en-US' ? enUSVant : zhCNVant);
}
