<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import NavigationButton from './NavigationButton.vue';

const auth = useAuth();
</script>

<template>
    <div class="navigation">
        <NavigationButton class="button" to="/">DOMOV</NavigationButton>
        <NavigationButton class="button" to="/speakers">SPEAKERS</NavigationButton>
        <NavigationButton class="button" to="/schedule">PROGRAM</NavigationButton>
        <NavigationButton class="button" to="/sponsors">PARTNERI</NavigationButton>
        <NavigationButton class="button" to="/contact">KONTAKT</NavigationButton>
        <NavigationButton class="button" to="/admin" v-if="auth.isAdmin">ADMIN</NavigationButton>
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