import '@/styles/main.scss'


import { createApp } from 'vue'
import { createPinia, type Store } from 'pinia'

import App from './App.vue'
import router, { setupRouterGuards } from './Router'

import LocalStorage from '@/lib/util/LocalStorage'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import { useAuth } from '@/stores/auth'
import { useState } from '@/stores/state'

const auth = useAuth();
const state = useState();

let storedAuth: StoredAuth | undefined = LocalStorage.get("auth");

auth.$subscribe((mutation, state) => {
    LocalStorage.set("auth", {
        auth: state.auth,
        token: state.token
    } as StoredAuth);
});

if (document.location.pathname == "/login") {
    const params = new URLSearchParams(document.location.search);
    const token = params.get("token");
    if (token) {
        storedAuth = {
            token, auth: AuthType.USER
        };
    }
}

import remote from '@/lib/remote/Remote';
import { appName } from '@/config'
import { AuthType, restoreSession, type StoredAuth } from './lib/remote/Auth'
import type { Response } from './lib/remote/RequestBuilder'
import type { Conference } from './lib/remote/Models'
import { Theme, setTheme } from './lib/theme/Theme'

const init_promise = new Promise(async (resolve, reject) => {
    await remote.post('conference/get').then((res: Response<{ conference: Conference }>) => {
        state.conference = res.conference;
    }).send();

    await restoreSession(storedAuth);
    resolve(true);
});

const removeInitGuard = router.beforeEach(async (to, from) => {
    await init_promise;
    removeInitGuard();
});

setTheme(Theme.Light);

setupRouterGuards();

app.mount('#app')
