<script setup lang="ts">
import { AuthType } from '@/lib/Bridge';
import { useAuth } from '@/stores/auth';

const auth = useAuth();
</script>

<template>
    <div class="content-container">
        <div class="content">
            <h1>Home</h1>
        </div>
    </div>
</template>