import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CMSView from '@/views/admin/CMSView.vue'
import SponsorsView from '@/views/SponsorsView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import ContactView from '@/views/ContactView.vue'
import SpeakersView from '@/views/SpeakersView.vue'
import AdminLoginView from '@/views/admin/LoginView.vue'
import AdminDashboardView from '@/views/admin/DashboardView.vue'
import UsersView from '@/views/admin/UsersView.vue'
import StatsView from '@/views/admin/StatsView.vue'


declare module 'vue-router' {
  interface RouteMeta {
    requiresUser?: boolean
    requiresAdmin?: boolean
    title?: string
  }
}

const router = createRouter({
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: "Spájame IT komunity" }},
    { path: '/sponsors', name: 'sponsors', component: SponsorsView, meta: { title: "Partneri" }},
    { path: '/schedule', name: 'schedule', component: ScheduleView, meta: { title: "Program" }},
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: "Kontakt" }},
    { path: '/speakers', name: 'speakers', component: SpeakersView, meta: { title: "Speakers" }},
    { path: '/admin', name: "admin", component: AdminDashboardView, redirect: { name: "admin/cms" },
      meta: { title: "Admin Dashboard" },
      children: [
        { path: 'cms', name: 'admin/cms', component: CMSView, meta: { requiresAdmin: true, title: "CMS" } },
        { path: 'users', name: 'admin/users', component: UsersView, meta: { requiresAdmin: true, title: "Používatelia" } },
        { path: 'stats', name: 'admin/stats', component: StatsView, meta: { requiresAdmin: true, title: "Štatistiky" } },
        { path: 'login', name: 'admin/login', component: AdminLoginView, meta: { title: "Prihlásenie" } }
      ]
    }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
