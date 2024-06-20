<script setup lang="ts">

import { ref } from 'vue';
import { type Organizer } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import ContactHolder from '@/components/cms/contact/ContactHolder.vue';

const props = defineProps<{
    organizer: Organizer
}>();

defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

</script>

<template>

    <div class="organizer">
        <div class="header">
            <span class="id">[{{ organizer.id }}]</span>
            <span class="name">{{ organizer.name }}</span>
            <span class="role">{{ organizer.role }}</span>
            
            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>

            <i v-if="organizer.image_id" @click="showImage = !showImage" class="icon-button fa-solid fa-image"></i>
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