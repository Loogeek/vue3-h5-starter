import { createApp } from 'vue';
import { setupVueQuery } from '@/plugins/query';
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
app.use(router);
setupVueQuery(app);

app.mount('#app');
