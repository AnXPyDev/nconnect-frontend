<script setup lang="ts">
import type { Admin } from '@/lib/remote/Models';


const props = defineProps<{
    admin: Admin
}>();

</script>

<template>

<div class="admin">
    <div class="header">
        <span class="id">[{{ admin.id }}]</span>
        <span class="name">{{ admin.username }}</span>
    </div>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.admin {
    @include mixins.cmsitem;
    @include mixins.cmspanel;
}
</style>