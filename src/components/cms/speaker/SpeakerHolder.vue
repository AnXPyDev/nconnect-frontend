<script setup lang="ts">

import { ref } from 'vue';
import { AdminPriv, type Speaker, type WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import PresentationsManager from '@/components/cms/presentation/PresentationsManager.vue';
import ContactHolder from '@/components/cms/contact/ContactHolder.vue';
import { useAuth } from '@/stores/auth';
import TextButton from '../util/TextButton.vue';

const props = defineProps<{
    speaker: WithID<Speaker>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showPresentations = ref<boolean>(false);
const showImage = ref<boolean>(false);
const showMetadata = ref<boolean>(false);

const auth = useAuth();

</script>

<template>

    <div class="speaker">
        <div class="header">
            <span class="id">[{{ speaker.id }}]</span>
            <span class="name">{{ speaker.name }}</span>

            <TextButton class="icon-button" v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')">
                <i class="fa-solid fa-pen"></i>
            </TextButton>

            <TextButton class="icon-button" @click="showPresentations = !showPresentations" :active="showPresentations">
                <i class="fa-solid fa-presentation"></i>
            </TextButton>
            <TextButton class="icon-button" @click="showMetadata = !showMetadata" :active="showMetadata">
                <i class="fa-solid fa-circle-info"></i>
            </TextButton>
            <TextButton class="icon-button" v-if="speaker.image_id" @click="showImage = !showImage" :active="showImage">
                <i class="fa-solid fa-image"></i>
            </TextButton>
            


        </div>

        <div class="details">
            <div v-if="showImage && speaker.image_id" class="image">
                <img :src="getResourceURL(speaker.image_id)"/>
            </div>
            <div v-if="speaker.description" class="description">
                {{ speaker.description }}
            </div>

            <template v-if="showMetadata">
                <span class="company" v-if="speaker.company">Company: {{ speaker.company.name }} {{ speaker.company.link }}</span>
                <span class="subtitle" v-if="speaker.subtitle">Subtitle: {{ speaker.subtitle }}</span>
                <ContactHolder v-if="speaker.contact" :contact="speaker.contact"></ContactHolder>
            </template>

        </div>

        <PresentationsManager v-if="showPresentations && speaker.id" :speaker_id="speaker.id"/>

    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.speaker {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>