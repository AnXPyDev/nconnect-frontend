import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia, type Store } from 'pinia'

import App from './App.vue'
import router from './router'

import LocalStorage from './lib/LocalStorage'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import { useAuth } from '@/stores/auth'
import { useState } from '@/stores/state'
import { AuthType } from './lib/Bridge'

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

import remote from './lib/ApiRemote';

const connection_promise = remote.init(auth);

const init_promise = new Promise(async (resolve, reject) => {
    await remote.init(auth);
    await remote.restoreSession();
    resolve(true);
});


router.beforeEach(async (to, from) => {
    await init_promise;
});

router.beforeEach((to, from) => {
    if (
        (to.meta.requiresAdmin === true && auth.auth !== AuthType.ADMIN) ||
        (to.meta.requiresUser === true && auth.auth !== AuthType.USER)
    ) {
        return { name: "home" };
    }
});


app.mount('#app')
