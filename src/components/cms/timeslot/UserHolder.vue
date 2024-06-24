<script setup lang="ts">
import { AdminPriv, type User, type WithID } from '@/lib/remote/Models';
import TextButton from '../util/TextButton.vue';
import TimeslotsManager from './TimeslotsManager.vue';
import { ref } from 'vue';
import { useAuth } from '@/stores/auth';

const auth = useAuth();

const props = defineProps<{
    user: WithID<User>
}>();

const emit = defineEmits<{
    unregister: []
}>();

</script>

<template>

<div class="user">
    <div class="header">
        <span class="id">[{{ user.id }}]</span>
        <span class="name">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
        <TextButton v-if="auth.checkPriv(AdminPriv.SUPER)" @click="emit('unregister')"><i class="fa-solid fa-xmark"></i></TextButton>
    </div>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.user {
    @include mixins.cmsitem;
    @include mixins.cmspanel;

    > .header {
        > .email {
            font-style: italic;
        }

    }
}
</style>