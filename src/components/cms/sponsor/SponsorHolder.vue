<script setup lang="ts">

import { ref } from 'vue';
import { type Sponsor } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import ContactHolder from '@/components/cms/contact/ContactHolder.vue';

const props = defineProps<{
    sponsor: Sponsor
}>();

defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

</script>

<template>

    <div class="sponsor">
        <div class="header">
            <span class="id">[{{ sponsor.id }}]</span>
            <span class="name">{{ sponsor.name }}</span>
            
            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>

            <i v-if="sponsor.image_id" @click="showImage = !showImage" class="icon-button fa-solid fa-image"></i>
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