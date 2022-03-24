import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import RuinList from '../components/RuinList.vue';
import UserData from '../components/UserData.vue';
import CreateRuin from '../components/CreateRuin.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/ruins',
    name: 'ruins',
    component: RuinList,
  },
  {
    path: '/userData',
    name: 'userData',
    component: UserData,
  },
  {
    path: '/addRuin',
    name: 'addRuin',
    component: CreateRuin,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes };
export default router;
