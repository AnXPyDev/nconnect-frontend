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
import PageView from './views/PageView.vue'
import PageEditorView from './views/admin/PageEditorView.vue'

declare module 'vue-router' {
    interface RouteMeta {
        requiresUser?: boolean
        requiresAdmin?: AdminPriv | boolean
        title?: string | (() => string | undefined)
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
                { path: 'cms', name: 'admin/cms', component: CMSView, meta: { requiresAdmin: AdminPriv.EDIT, title: "CMS" } },
                { path: 'users', name: 'admin/users', component: UsersView, meta: { requiresAdmin: AdminPriv.VIEW, title: "Používatelia" } },
                { path: 'stats', name: 'admin/stats', component: StatsView, meta: { requiresAdmin: AdminPriv.VIEW, title: "Štatistiky" } },
                { path: 'account', name: 'admin/account', component: AccountView, meta: { requiresAdmin: true, title: "Účet" } },
                { path: 'login', name: 'admin/login', component: AdminLoginView, meta: { title: "Prihlásenie" } }
            ]
        },
        { path: '/page/:slug', name: 'page', props: true, component: PageView },
        { path: '/admin/cms/page/:slug', name: 'admin/cms/page', props: true, component: PageEditorView, meta: { requiresAdmin: AdminPriv.EDIT } }
    ],
    history: createWebHistory(import.meta.env.BASE_URL)
})

function getHomeTitle() {
    const state = useState();
    return state.conference?.subtitle ?? "Domov";
}

export default router;

export function setDocumentTitle(title?: string) {
    document.title = title ? `${appName} | ${title}` : appName;
}

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
        let title = to.meta.title;
        if (typeof title === "function") {
            title = title();
        }
        setDocumentTitle(title);
    });
}
