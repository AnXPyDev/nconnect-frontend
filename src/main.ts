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
import type { AuthType } from './lib/Bridge'

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

remote.init(auth);
await remote.restoreSession();

app.mount('#app')
