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
import type { Response } from './lib/remote/RequestBuilder'
import type { Conference } from './lib/remote/Models'

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

setupRouterGuards();

app.mount('#app')
