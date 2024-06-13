import '@/styles/main.scss'


import { createApp } from 'vue'
import { createPinia, type Store } from 'pinia'

import App from './App.vue'
import router from './router'

import LocalStorage from '@/lib/util/LocalStorage'

import InlineSvg from 'vue-inline-svg';

const app = createApp(App)

app.component('inline-svg', InlineSvg);
app.use(createPinia())
app.use(router)

import { useAuth } from '@/stores/auth'
import { useState } from '@/stores/state'
import { AuthType } from '@/lib/remote/Models'

const auth = useAuth();
const state = useState();

interface StoredAuth {
    auth: AuthType,
    token?: string
}

const storedAuth: StoredAuth | undefined = LocalStorage.get("auth");
if (storedAuth !== undefined) {
    auth.auth = storedAuth.auth;
    auth.token = storedAuth.token;
}

auth.$subscribe((mutation, state) => {
    LocalStorage.set("auth", {
        auth: state.auth,
        token: state.token
    } as StoredAuth);
});

import remote from '@/lib/remote/Remote';
import { appName } from '@/config'

const connection_promise = remote.init(auth);

const init_promise = new Promise(async (resolve, reject) => {
    await remote.init(auth);
    await remote.restoreSession();
    resolve(true);
});


const remove_init_guard = router.beforeEach(async (to, from) => {
    await init_promise;
    remove_init_guard();
});

router.beforeEach((to, from) => {
    if (
        (to.meta.requiresAdmin === true && auth.auth !== AuthType.ADMIN) ||
        (to.meta.requiresUser === true && auth.auth !== AuthType.USER)
    ) {
        return { name: "home" };
    }
});

router.afterEach((to, from) => {
    const title = to.meta.title ?? to.name?.toString();
    document.title = `${appName} | ${title}`;
});


app.mount('#app')
