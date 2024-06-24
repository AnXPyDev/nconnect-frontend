<script setup lang="ts">
import { AdminPriv, type User, type WithID } from '@/lib/remote/Models';
import TextButton from '@/components/cms/util/TextButton.vue';
import TimeslotsManager from './TimeslotsManager.vue';
import { ref } from 'vue';
import { useAuth } from '@/stores/auth';


const props = defineProps<{
    user: WithID<User>
}>();

const emit = defineEmits<{
    unregister: []
}>();

const showTimeslots = ref(false);

const auth = useAuth();

</script>

<template>

<div class="user">
    <div class="header">
        <span class="id">[{{ user.id }}]</span>
        <span class="name">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
        <TextButton @click="showTimeslots = !showTimeslots" :active="showTimeslots"><i class="fa-solid fa-clock"></i></TextButton>
        <TextButton v-if="auth.checkPriv(AdminPriv.SUPER)" @click="emit('unregister')"><i class="fa-solid fa-trash"></i></TextButton>
    </div>
    <TimeslotsManager v-if="showTimeslots" v-bind="{ user_id: user.id!! }"></TimeslotsManager>
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