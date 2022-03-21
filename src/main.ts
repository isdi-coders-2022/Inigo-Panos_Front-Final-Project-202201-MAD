import Vue, { createApp } from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).use(VeeValidate).mount('#app');
