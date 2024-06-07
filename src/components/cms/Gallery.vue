<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Resource, type Gallery } from '@/lib/Bridge';
import { getResourceURL } from '@/lib/urls';
import { ref, toRaw } from 'vue';
import GalleryImage from './GalleryImage.vue';
import ImageResourceSelector from './ImageResourceSelector.vue';


const props = defineProps<{
    gallery: Gallery
}>();

const emit = defineEmits<{
    edit: []
}>();

const images = ref<Resource[]>([]);

remote.post("gallery/images", { id: props.gallery.id }).then((res: { images: Resource[] }) => {
    images.value = res.images;
}).send();

const showImages = ref<boolean>(false);
const showThumbnail = ref<boolean>(false);

const toAddResourceID = ref<number>();

function addImage() {
    const resource_id = toRaw(toAddResourceID.value);
    if (resource_id == undefined) {
        return;
    }
    remote.post("gallery/addimage", { id: props.gallery.id!!, resource_id }).then((res: { image: Resource }) => {
        images.value.push(res.image);
    }).send();
}

function removeImage(image: Resource) {
    remote.post("gallery/deleteimage", { id: props.gallery.id!!, resource_id: image.id!! }).then((res) => {
        images.value.splice(images.value.findIndex((r) => r.id == image.id!!), 1);
    }).send();
}

</script>

<template>
    <div class="gallery">
        <div class="header">
            <span class="id">[{{ gallery.id }}]</span>
            <span class="name">[{{ gallery.name }}]</span>
            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>
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

        <div class="images" v-if="showImages">
            <GalleryImage v-for="i in images" :resource="i" @remove="removeImage(i)" />
            <div>
                select image
                <ImageResourceSelector v-model="toAddResourceID"/>
                <button v-if="toAddResourceID" @click="addImage">add image</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.gallery {
    @include mixins.cmsitem;
    @include mixins.cmspanel;
}

</style>