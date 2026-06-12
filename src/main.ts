import { createApp } from 'vue';
import { i18n, setI18nLocale } from '@/locales';
import { setupVueQuery } from '@/plugins/query';
import { usePreferencesStoreHook } from '@/store/modules/preferences';
import { initializeDarkMode } from '@/utils/dark-mode';
import App from './App.vue';
import router from './router';
import { store } from './store';
import 'virtual:svg-icons-register';

// normalize.css
import 'normalize.css/normalize.css';
// 全局样式
import './styles/index.less';
// tailwindcss
import './styles/tailwind.css';

initializeDarkMode();

const app = createApp(App);

app.use(store);
const preferences = usePreferencesStoreHook();
setI18nLocale(preferences.locale);

app.use(router);
app.use(i18n);
setupVueQuery(app);

app.mount('#app');
