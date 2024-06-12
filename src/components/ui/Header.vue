<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import Navigation from './Navigation.vue';

const auth = useAuth();
</script>

<template>
    <div class="header content-container">
        <div class="content">
            <div class="logo">
                <RouterLink to="/">NCONNECT</RouterLink>
            </div>

            <Navigation />
        </div>
    </div>
</template>


<style scoped lang="scss">
    .header {
        background-color: var(--clr-bg);
        color: var(--clr-fg);
        padding-block: 2em;

        > .content {
            display: flex;
            justify-content: space-between;
            align-items: cente;

            > .logo {
                font-size: 2em;
            }
        }
    }
</style>

