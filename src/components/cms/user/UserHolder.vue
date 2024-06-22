<script setup lang="ts">
import type { User } from '@/lib/remote/Models';
import TextButton from '../util/TextButton.vue';
import TimeslotsManager from './TimeslotsManager.vue';
import { ref } from 'vue';


const props = defineProps<{
    user: User
}>();

const showTimeslots = ref(false);

</script>

<template>

<div class="user">
    <div class="header">
        <span class="id">[{{ user.id }}]</span>
        <span class="name">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
        <TextButton @click="showTimeslots = !showTimeslots" :class="{ active: showTimeslots }"><i class="fa-solid fa-clock"></i></TextButton>
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