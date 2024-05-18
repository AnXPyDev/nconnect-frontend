<script setup lang="ts">
import { RouterView } from 'vue-router';
import remote from './lib/ApiRemote';
import { useAuth } from './stores/auth';
import { ref } from 'vue';

const auth = useAuth();

function login() {
    remote.loginAdmin(); 
}

function logout() {
    remote.logoutAdmin();
}

const stages = ref<string>();

remote.post("stage/index").then((res) => {
    stages.value = JSON.stringify(res);
}).send();

</script>

<template>

    <h1>nconnect fe</h1>

    <template v-if="auth.auth">
        <h2>auth {{ auth.auth }}</h2>
        <h2>token {{ auth.token }}</h2>
        <button @click="logout">logout</button>
    </template>
    <template v-else>
        <button @click="login">login</button>
    </template>

    <p>{{ stages }}</p>

    <RouterView></RouterView>

</template>