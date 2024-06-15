import '@/styles/main.scss'


import { createApp } from 'vue'
import { createPinia, type Store } from 'pinia'

import App from './App.vue'
import router from './router'

import LocalStorage from '@/lib/util/LocalStorage'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import { useAuth } from '@/stores/auth'
import { useState } from '@/stores/state'
import { AuthType } from '@/lib/remote/Models'

const auth = useAuth();
const state = useState();

const storedAuth: StoredAuth | undefined = LocalStorage.get("auth");

auth.$subscribe((mutation, state) => {
    LocalStorage.set("auth", {
        auth: state.auth,
        token: state.token
    } as StoredAuth);
});

import remote from '@/lib/remote/Remote';
import { appName } from '@/config'
import { restoreSession, type StoredAuth } from './lib/remote/Auth'

const init_promise = new Promise(async (resolve, reject) => {
    await remote.init();
    await restoreSession(storedAuth);
    resolve(true);
});

const removeInitGuard = router.beforeEach(async (to, from) => {
    await init_promise;
    removeInitGuard();
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAdmin && auth.auth !== AuthType.ADMIN) {
        return { name: "admin/login" };
    }
    if (to.meta.requiresUser && auth.auth !== AuthType.USER) {
        return { name: "home" };
    }
});

router.afterEach((to, from) => {
    const title = to.meta.title ?? to.name?.toString();
    document.title = `${appName} | ${title}`;
});


app.mount('#app')
