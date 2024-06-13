import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CMSView from '@/views/CMSView.vue'
import SponsorsView from '@/views/SponsorsView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import ContactView from '@/views/ContactView.vue'
import SpeakersView from '@/views/SpeakersView.vue'


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
    { path: '/cms', name: 'cms', component: CMSView, meta: { requiresAdmin: true, title: "CMS" } }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
