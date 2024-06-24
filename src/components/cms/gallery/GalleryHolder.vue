<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Resource, type Gallery, type Image, type WithID, AdminPriv } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import GalleryImagesManager from './GalleryImagesManager.vue';
import type { Response } from '@/lib/remote/RequestBuilder';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';


const props = defineProps<{
    gallery: WithID<Gallery>
    mutable?: boolean
    picker?: boolean
}>();

const emit = defineEmits<{
    edit: [],
    select: [WithID<Image>]
}>();

const images = ref<WithID<Image>[]>([]);

remote.post("gallery/images", { id: props.gallery.id }).then((res: Response<{ images: WithID<Image>[] }>) => {
    images.value = res.images;
}).send();

const showImages = ref<boolean>(false);
const showThumbnail = ref<boolean>(false);

const auth = useAuth();

</script>

<template>
    <div class="gallery">
        <div class="header">
            <span class="id">[{{ gallery.id }}]</span>
            <span class="name">{{ gallery.name }}</span>
            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT) && mutable" @click="$emit('edit')">
                <i class="fa-solid fa-pen"></i>
            </TextButton>
            <TextButton v-if="gallery.thumbnail_id" @click="showThumbnail = !showThumbnail">
                <i   class="fa-solid fa-image"></i>
            </TextButton>
            
            <TextButton @click="showImages = !showImages" :active="showImages">
                <i class="fa-solid fa-images"></i>
            </TextButton>

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