<script setup lang="ts">

import type { Gallery } from '@/lib/remote/Models';
import GalleryCard from './GalleryCard.vue';
import router from '@/Router';

const props = defineProps<{
    galleries: Gallery[]
}>();

function openGallery(gallery: Gallery) {
    router.push({ name: "gallery", params: { id: gallery.id } });
}

</script>


<template>
    <div class="gallerys">
        <GalleryCard @click="openGallery(gallery)" v-for="gallery in galleries" :gallery="gallery"></GalleryCard>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';
@use '@/styles/lib/dimens';

.gallerys {
    $gap: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    
    --per-row: 4;
    @include media.phone {
        --per-row: 2;
    }

    > .gallery-card {
        @include mixins.card-shadow;
        width: dimens.spread-percentage(var(--per-row), $gap);
    }
}
</style>