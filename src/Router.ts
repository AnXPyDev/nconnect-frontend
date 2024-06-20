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
import { useAuth } from '@/stores/auth'
import { appName } from '@/config'
import { AdminPriv } from './lib/remote/Models'
import { useState } from './stores/state'
import AccountView from './views/admin/AccountView.vue'

declare module 'vue-router' {
    interface RouteMeta {
        requiresUser?: boolean
        requiresAdmin?: AdminPriv | boolean
        title?: string | (() => string)
    }
}

// TODO lazy loading

const router = createRouter({
    routes: [
        { path: '/', name: 'home', component: HomeView, meta: { title: getHomeTitle } },
        { path: '/partneri', name: 'sponsors', component: SponsorsView, meta: { title: "Partneri" } },
        { path: '/program', name: 'schedule', component: ScheduleView, meta: { title: "Program" } },
        { path: '/kontakt', name: 'contact', component: ContactView, meta: { title: "Kontakt" } },
        { path: '/speakers', name: 'speakers', component: SpeakersView, meta: { title: "Speakers" } },
        { path: '/registracia', name: 'signup', component: SpeakersView, meta: { title: "Registrácia" } },
        {
            path: '/admin', name: "admin", component: AdminDashboardView, redirect: { name: "admin/cms" },
            meta: { title: "Admin Dashboard" },
            children: [
                { path: 'cms', name: 'admin/cms', component: CMSView, meta: { requiresAdmin: true, title: "CMS" } },
                { path: 'users', name: 'admin/users', component: UsersView, meta: { requiresAdmin: true, title: "Používatelia" } },
                { path: 'stats', name: 'admin/stats', component: StatsView, meta: { requiresAdmin: true, title: "Štatistiky" } },
                { path: 'login', name: 'admin/login', component: AdminLoginView, meta: { title: "Prihlásenie" } },
                { path: 'account', name: 'admin/account', component: AccountView, meta: { title: "Účet" } }
            ]
        }
    ],
    history: createWebHistory(import.meta.env.BASE_URL)
})

function getHomeTitle() {
    const state = useState();
    return state.conference?.subtitle ?? "Domov";
}

export default router;

export function setupRouterGuards() {
    const auth = useAuth();

    router.beforeEach((to, from) => {

        const reqAdmin = to.meta.requiresAdmin;
        if (reqAdmin !== undefined) {
            let priv: AdminPriv | undefined = undefined;
            if (typeof reqAdmin == "number") {
                priv = reqAdmin;
            }

            if (!auth.isAdmin(priv)) {
                return { name: "admin/login" };
            }
        }

        if (to.meta.requiresUser && auth.isUser()) {
            return { name: "home" };
        }

    });

    router.afterEach((to, from) => {
        let title = to.meta.title ?? to.name?.toString();
        if (typeof title === "function") {
            title = title();
        }
        document.title = `${appName} | ${title}`;
    });
}
