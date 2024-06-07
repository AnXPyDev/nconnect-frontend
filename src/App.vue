<script setup lang="ts">
import { RouterView } from 'vue-router';
import remote from './lib/ApiRemote';
import { useAuth } from './stores/auth';
import { ref } from 'vue';
import InfoBar from './components/InfoBar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const auth = useAuth();

function login() {
    remote.loginAdmin(); 
}

function logout() {
    remote.logoutAdmin();
}

</script>

<template>
    <div class="debug-bar content-container">
        <div class="content">
            <template v-if="auth.auth">
                auth {{ auth.auth }} token {{ auth.token }}
                <button @click="logout">logout</button>
            </template>
            <template v-else>
                <button @click="login">login</button>
            </template>
        </div>
    </div>

    <InfoBar />
    <Header />

    <RouterView></RouterView>

    <Footer />

</template>

<style lang="scss" scoped>

.debug-bar {
    background-color: lightcoral;
    color: black;
    padding-block: 1em;
}

</style>