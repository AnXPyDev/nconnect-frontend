<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import NavigationButton from './NavigationButton.vue';

const auth = useAuth();
</script>

<template>
    <div class="navigation">
        <NavigationButton class="button" :to="{ name: 'home' }">DOMOV</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'speakers' }">SPEAKERS</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'schedule' }">PROGRAM</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'sponsors' }">PARTNERI</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'contact' }">KONTAKT</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'galleries' }">FOTOGALÉRIA</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'pages' }">STRÁNKY</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'signup' }" v-if="auth.canSignUp">REGISTRACIA</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'admin' }" v-if="auth.isAdmin">ADMIN</NavigationButton>
        <NavigationButton class="button" :to="{ name: 'user' }" v-if="auth.isUser">ME</NavigationButton>
    </div>
</template>

<style lang="scss" scoped>

@use '@/styles/lib/media';

.navigation {
    display: flex;
    align-items: center;

    @include media.phone {
        flex-direction: column;

        > .button {
            width: 100%;
        }
    }
}

</style>