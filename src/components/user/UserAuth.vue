<script setup lang="ts">
import { useAuth } from '@/stores/auth';


const auth = useAuth();

</script>

<template>
<RouterLink v-if="auth.user" class="user-auth" :to="{ name: 'user' }">
    <div class="left">
        <i class="icon fa-solid fa-circle-user"></i>
    </div>
    <div class="right">
        <span class="name">{{ auth.user.name }}</span>
        <span class="email">{{ auth.user.email }}</span>
    </div>
</RouterLink>
</template>

<style scoped lang="scss">

.user-auth {
    display: flex;
    gap: 0.5em;
    align-items: center;

    cursor: pointer;

    transition: 0.5s all ease;

    &:hover, &.router-link-active {
        color: var(--clr-primary);
    }

    > .right, > .left {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
    }

    > .left {
        font-size: 2em;
    }

    > .right {
        > .name {
            font-weight: 900;
            font-size: 1.2em;
        }
    }
}

</style>