<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue';
import Spinner from '@/components/util/Spinner.vue';
import type { Gallery, Image } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';

const props = defineProps<{
    id: number
}>();

const loading = ref(true);
const gallery = ref<Gallery>();
const images = ref<Image[]>([]);

console.log(props.id);

remote.post("gallery/images", { id: props.id }).then((res: Response<{ gallery: Gallery, images: Image[] }>) => {
    gallery.value = res.gallery;
    images.value = res.images;
    loading.value = false;
}).send();

</script>

<template>
<PageHeader v-if="gallery" section="FOTOGALÉRIA" :origin="{ name: 'galleries' }" :location="gallery.name"></PageHeader>
<div class="page-view content-container">
    <div class="content">
        <Spinner v-if="loading" />
        <template v-else-if="gallery">
            <div v-if="gallery.description" class="description">{{ gallery.description }}</div>
            <div class="images">
                <img v-for="image in images" :src="getResourceURL(image.id!!)"/>
            </div>
        </template>
    </div>
</div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';
@use '@/styles/lib/dimens';

.content {
    display: flex;
    flex-direction: column;
    padding-block: 1em;
    gap: 1em;

    > .description {
        font-size: 1.2em;
    }

    > .images {
        $gap: 1em;
        display: flex;
        flex-wrap: wrap;
        gap: $gap;
        
        --per-row: 8;
        @include media.phone {
            --per-row: 4;
        }

        > img {
            @include mixins.card-shadow;
            display: block;
            width: dimens.spread-percentage(var(--per-row), $gap);
            aspect-ratio: 1;
            object-fit: cover;
        }
    }
}
</style>