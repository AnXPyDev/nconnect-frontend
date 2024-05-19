<script setup lang="ts">
import { AuthType } from '@/lib/Bridge';
import { useAuth } from '@/stores/auth';

const auth = useAuth();
</script>

<template>
    <h1>Home</h1>

    <RouterLink to="/cms" v-if="auth.isAdmin">CMS</RouterLink>
</template>