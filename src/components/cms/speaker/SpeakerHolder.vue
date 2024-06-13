<script setup lang="ts">

import { ref } from 'vue';
import { type Speaker } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import PresentationsManager from '@/components/cms/presentation/PresentationsManager.vue';
import ContactHolder from '@/components/cms/contact/ContactHolder.vue';

const props = defineProps<{
    speaker: Speaker
}>();

defineEmits<{
    edit: []
}>();

const showPresentations = ref<boolean>(false);
const showImage = ref<boolean>(false);

</script>

<template>

    <div class="speaker">
        <div class="header">
            <span class="id">[{{ speaker.id }}]</span>
            <span class="name">{{ speaker.name }}</span>
            
            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>

            <i @click="showPresentations = !showPresentations" class="icon-button fa-solid fa-presentation"></i>

            <i v-if="speaker.image_id" @click="showImage = !showImage" class="icon-button fa-solid fa-image"></i>
        </div>

        <div class="details">
            <div v-if="showImage && speaker.image_id" class="image">
                <img :src="getResourceURL(speaker.image_id)"/>
            </div>
            <div v-if="speaker.description" class="description">
                {{ speaker.description }}
            </div>
            <ContactHolder v-if="speaker.contact" :contact="speaker.contact"></ContactHolder>
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