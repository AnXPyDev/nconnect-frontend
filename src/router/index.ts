import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'


declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}

const router = createRouter({
  routes: [
    { path: '/', name: 'home', component: HomeView }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
