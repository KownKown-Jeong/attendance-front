import { createApp } from 'vue';
import { API_BASE_URL } from '@/utils/constants';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.config.globalProperties.$apiBaseUrl = API_BASE_URL;
app.mount('#app');