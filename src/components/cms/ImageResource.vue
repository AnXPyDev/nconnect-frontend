<script setup lang="ts">
import type { Resource } from '@/lib/Bridge';
import { getResourceURL } from '@/lib/urls';
import { ref } from 'vue';
import ImageResourceUploader from './ImageResourceUploader.vue';
import NoImage from '../util/NoImage.vue';

const props = defineProps<{
    resource: Resource
    forceShow?: boolean
}>();

const emit = defineEmits<{
    edit: []
}>();


const showImage = ref<boolean>(false);

</script>

<template>
    <div class="image-resource">
        <div v-if="forceShow || showImage" class="image">
            <img v-if="resource.id" :src="getResourceURL(resource.id)"/>
            <NoImage v-else />
        </div>
        <div class="header">
            <span class="id">[{{ resource.id }}]</span>
            <span class="name">{{ resource.name }}</span>
            <i @click="emit('edit')" class="icon-button fa-solid fa-pen"></i>
            <span @click="showImage = !showImage" class="icon-button">
                <i v-if="showImage" class="fa-solid fa-eye-slash"></i>
                <i v-else class="fa-solid fa-eye"></i>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.image-resource {
    @include mixins.cmspanel;
    @include mixins.cmsitem;

    display: flex;
    flex-direction: column;

    > .image {
        width: 100%;
        aspect-ratio: 1;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

</style>