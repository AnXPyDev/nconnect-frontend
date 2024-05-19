import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CMSView from '@/views/CMSView.vue'


declare module 'vue-router' {
  interface RouteMeta {
    requiresUser?: boolean
    requiresAdmin?: boolean
  }
}

const router = createRouter({
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cms', name: 'cms', component: CMSView, meta: { requiresAdmin: true } }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
