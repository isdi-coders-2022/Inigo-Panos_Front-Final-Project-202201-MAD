import { createApp } from 'vue';
// import VeeValidate from 'vee-validate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store/index';

createApp(App).use(store).use(router).mount('#app');
// const app = createApp(App);
// app.use(store);
// app.use(router);
// app.mount('#app');
// .use(VeeValidate)
