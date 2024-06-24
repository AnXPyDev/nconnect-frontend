<script setup lang="ts">
import { AdminPriv, type Headliner, type WithID } from '@/lib/remote/Models';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';


const props = defineProps<{
    headliner: WithID<Headliner>
}>();

const emit = defineEmits<{
    edit: []
}>();

const auth = useAuth();

</script>

<template>
    <div class="headliner">
        <div class="header">
            <span class="id">[{{ headliner.id }}]</span>
            <template v-if="headliner.speaker">
                <i class="fa-solid fa-bullhorn"></i>
                <span class="id">[{{ headliner.speaker.id }}]</span>
                <span class="name">{{ headliner.speaker.name }}</span>
            </template>
            <i class="fa-solid fa-arrow-right"></i>
            <template v-if="headliner.stage">
                <i class="fa-solid fa-screen-users"></i>
                <span class="id">[{{ headliner.stage.id }}]</span>
                <span class="name">{{ headliner.stage.name }}</span>
            </template>
            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i class="fa-solid fa-pen" ></i>
            </TextButton>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.headliner {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>