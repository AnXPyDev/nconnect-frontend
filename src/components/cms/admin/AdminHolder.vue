<script setup lang="ts">
import { AdminPriv, type Admin } from '@/lib/remote/Models';
import TextButton from '../util/TextButton.vue';


const props = defineProps<{
    admin: Admin
}>();

const emit = defineEmits<{
    edit: []
}>();

</script>

<template>

<div class="admin">
    <div class="header">
        <span class="id">[{{ admin.id }}]</span>
        <span class="name">{{ admin.username }}</span>
        <span class="priv">({{ AdminPriv[admin.priv] }})</span>
        <TextButton @click="emit('edit')"><i class="fa-solid fa-pen"></i></TextButton>
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