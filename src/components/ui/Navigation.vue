<script setup lang="ts">
import { useAuth } from '@/stores/auth';

const auth = useAuth();
</script>

<template>
    <div class="nav">
        <RouterLink class="router-link" to="/">DOMOV</RouterLink>
        <RouterLink class="router-link" to="/cms" v-if="auth.isAdmin">CMS</RouterLink>
    </div>
</template>

<style lang="scss" scoped>

.nav {
    display: flex;
    align-items: center;

    > .router-link {
        @mixin active {
            color: var(--clr-fg-on-primary);
            background-color: var(--clr-primary);
        }

        display: block;
        padding-inline: 1em;
        padding-block: 0.75em;

        transition: all 0.5s ease;

        &:hover {
            @include active();
        }

        &.router-link-active {
            @include active();
        }
    }
}

</style>