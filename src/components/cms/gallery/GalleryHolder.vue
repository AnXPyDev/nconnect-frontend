<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Resource, type Gallery } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import GalleryImagesManager from './GalleryImagesManager.vue';
import type { Response } from '@/lib/remote/RequestBuilder';


const props = defineProps<{
    gallery: Gallery
    mutable?: boolean
    picker?: boolean
}>();

const emit = defineEmits<{
    edit: [],
    select: [Resource]
}>();

const images = ref<Resource[]>([]);

remote.post("gallery/images", { id: props.gallery.id }).then((res: Response<{ images: Resource[] }>) => {
    images.value = res.images;
}).send();

const showImages = ref<boolean>(false);
const showThumbnail = ref<boolean>(false);

</script>

<template>
    <div class="gallery">
        <div class="header">
            <span class="id">[{{ gallery.id }}]</span>
            <span class="name">{{ gallery.name }}</span>
            <i v-if="mutable" @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>
            <i v-if="gallery.thumbnail_id" @click="showThumbnail = !showThumbnail" class="icon-button fa-solid fa-image"></i>
            
            <i @click="showImages = !showImages" class="icon-button fa-solid fa-images"></i>

        </div>

        <div class="details">
            <div class="image" v-if="showThumbnail && gallery.thumbnail_id">
                <img :src="getResourceURL(gallery.thumbnail_id)"/>
            </div>
            <div v-if="gallery.description" class="description">
                {{ gallery.description }}
            </div>
        </div>

        <GalleryImagesManager @select="(v) => emit('select', v)" :picker="picker" :mutable="mutable" v-if="showImages" :gallery="gallery"/>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.gallery {
    @include mixins.cmsitem;
    @include mixins.cmspanel;
}

</style>