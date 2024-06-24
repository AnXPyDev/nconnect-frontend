<script setup lang="ts">

import { ref } from 'vue';
import { AdminPriv, type Organizer, type WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import ContactHolder from '@/components/cms/contact/ContactHolder.vue';
import { useAuth } from '@/stores/auth';
import TextButton from '../util/TextButton.vue';

const props = defineProps<{
    organizer: WithID<Organizer>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>

    <div class="organizer">
        <div class="header">
            <span class="id">[{{ organizer.id }}]</span>
            <span class="name">{{ organizer.name }}</span>
            <span class="role">{{ organizer.role }}</span>
            
            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i  class="fa-solid fa-pen"></i>
            </TextButton>

            <TextButton v-if="organizer.image_id" @click="showImage = !showImage" :active="showImage" class="icon-button">
                <i class="fa-solid fa-image"></i>
            </TextButton>
        </div>

        <div class="details">
            <div v-if="showImage && organizer.image_id" class="image">
                <img :src="getResourceURL(organizer.image_id)"/>
            </div>
            <ContactHolder v-if="organizer.contact" :contact="organizer.contact"></ContactHolder>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.organizer {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>