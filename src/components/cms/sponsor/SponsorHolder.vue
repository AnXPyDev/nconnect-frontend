<script setup lang="ts">

import { ref } from 'vue';
import { AdminPriv, type Sponsor, type WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import ContactHolder from '@/components/cms/contact/ContactHolder.vue';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';

const props = defineProps<{
    sponsor: WithID<Sponsor>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>

    <div class="sponsor">
        <div class="header">
            <span class="id">[{{ sponsor.id }}]</span>
            <span class="name">{{ sponsor.name }}</span>
            
            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i class="fa-solid fa-pen"></i>
            </TextButton>

            <TextButton class="icon-button" v-if="sponsor.image_id" @click="showImage = !showImage" :active="showImage">
                <i class="fa-solid fa-image"></i>
            </TextButton>
        </div>

        <div class="details">
            <div v-if="showImage && sponsor.image_id" class="image">
                <img :src="getResourceURL(sponsor.image_id)"/>
            </div>
            <div v-if="sponsor.description" class="description">
                {{ sponsor.description }}
            </div>
            <ContactHolder v-if="sponsor.contact" :contact="sponsor.contact"></ContactHolder>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.sponsor {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>