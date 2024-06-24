import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { appName } from '@/config'
import { AdminPriv } from './lib/remote/Models'
import { useState } from './stores/state'


const HomeView = () => import('@/views/HomeView.vue');
const CMSView = () => import('@/views/admin/CMSView.vue');
const SponsorsView = () => import('@/views/SponsorsView.vue');
const ScheduleView = () => import('@/views/ScheduleView.vue');
const ContactView = () => import('@/views/ContactView.vue');
const SpeakersView = () => import('@/views/SpeakersView.vue');
const AdminLoginView = () => import('@/views/admin/LoginView.vue');
const AdminDashboardView = () => import('@/views/admin/DashboardView.vue');
const UsersView = () => import('@/views/admin/UsersView.vue');
const PageView = () => import('./views/PageView.vue');
const PageEditorView = () => import('./views/admin/PageEditorView.vue');
const GalleriesView = () => import('./views/GalleriesView.vue');
const PagesView = () => import('./views/PagesView.vue');
const SignupView = () => import('./views/user/SignupView.vue');
const GalleryView = () => import('./views/GalleryView.vue');
const UserLoginView = () => import('@/views/user/LoginView.vue');
const UserView = () => import('./views/user/UserView.vue');

declare module 'vue-router' {
    interface RouteMeta {
        requiresUser?: boolean
        requiresAdmin?: AdminPriv | boolean
        title?: string | (() => string | undefined)
    }
}

const router = createRouter({
    routes: [
        { path: '/', name: 'home', component: HomeView, meta: { title: getHomeTitle } },
        { path: '/partneri', name: 'sponsors', component: SponsorsView, meta: { title: "Partneri" } },
        { path: '/program', name: 'schedule', component: ScheduleView, meta: { title: "Program" } },
        { path: '/kontakt', name: 'contact', component: ContactView, meta: { title: "Kontakt" } },
        { path: '/speakers', name: 'speakers', component: SpeakersView, meta: { title: "Speakers" } },
        { path: '/fotogaleria', name: 'galleries', component: GalleriesView, meta: { title: "Fotogaléria" } },
        { path: '/stranky', name: 'pages', component: PagesView, meta: { title: "Stránky" } },
        
        { path: '/page/:slug', name: 'page', props: true, component: PageView },
        { path: '/gallery/:id', name: 'gallery', props: (route) => {
            const id = parseInt(route.params['id'] as string);
            if (Number.isNaN(id)) {
                throw new Error("invalid gallery id");
            }
            return { id };
        }, component: GalleryView },


        {
            path: '/admin', name: "admin", component: AdminDashboardView, redirect: { name: "admin/cms" },
            meta: { title: "Admin Dashboard" },
            children: [
                { path: 'content', name: 'admin/cms', component: CMSView, meta: { requiresAdmin: AdminPriv.VIEW, title: "Obsah" } },
                { path: 'users', name: 'admin/users', component: UsersView, meta: { requiresAdmin: AdminPriv.VIEW, title: "Používatelia" } },
                { path: 'login', name: 'admin/login', component: AdminLoginView, meta: { title: "Prihlásenie" } }
            ]
        },
        { path: '/admin/cms/page/:slug', name: 'admin/cms/page', props: true, component: PageEditorView, meta: { requiresAdmin: AdminPriv.EDIT } },


        { path: '/login', name: "login", component: UserLoginView },
        { path: '/registracia', name: 'signup', component: SignupView, meta: { title: "Registrácia" } },
        { path: '/user', name: 'user', component: UserView, meta: { title: getUserName, requiresUser: true } },
    ],
    history: createWebHistory(import.meta.env.BASE_URL)
})

function getHomeTitle() {
    const state = useState();
    return state.conference?.subtitle ?? "Domov";
}

function getUserName() {
    const auth = useAuth();
    return auth.user!!.name;
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

            if (!auth.checkPriv(priv)) {
                return { name: "admin/login" };
            }
        }

        if (to.meta.requiresUser && !auth.isUser) {
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
