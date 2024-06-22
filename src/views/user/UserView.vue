<script setup lang="ts">
import { useAuth } from '@/stores/auth';


const auth = useAuth();

</script>

<template>
    {{ auth.user }}
</template>