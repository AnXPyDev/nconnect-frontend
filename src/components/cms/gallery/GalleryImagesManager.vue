<script setup lang="ts">
import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Gallery, type Resource } from '@/lib/remote/Models';

import Spinner from '@/components/util/Spinner.vue';
import Button from '@/components/util/Button.vue';
import GalleryImage from './GalleryImage.vue';
import GalleryImageUploader from './GalleryImageUploader.vue';
import GalleryImageEditor from './GalleryImageEditor.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';

const loading = ref<boolean>(true);

const props = defineProps<{
    gallery: Gallery
    mutable?: boolean
    picker?: boolean
}>();

const emit = defineEmits<{
    select: [Resource]
}>();

const images = ref<Resource[]>([]);

remote.post("gallery/images", { id: props.gallery.id!! }).then((res: Response<{ images: Resource[] }>) => {
    images.value = res.images;
    loading.value = false;
}).send();

const showUploader = ref<boolean>(false);

function imagesUploaded(imgs: Resource[]) {
    showUploader.value = false;
    images.value.push(...imgs);
}

const toEdit = ref<Resource>();

function reset() {
    toEdit.value = undefined;
}

function edit(i: Resource) {
    toEdit.value = Object.assign({}, i);
}

async function confirmEdit() {
    const { resource: image } : { resource: Resource } = await remote.post("resource/edit", toRaw(toEdit).value).unwrap().send();
    Object.assign(images.value.find(predicateByID(image.id!!))!!, image);
}

async function editDelete() {
    // TODO
}

const selectedImages = ref<number[]>([]);

function isSelected(i: Resource) {
    return selectedImages.value.findIndex((v) => v == i.id) !== -1;
}

function selectImage(i: Resource) {
    if (i.id === undefined) {
        return;
    }

    if (props.picker) {
        emit('select', i);
    }
}

const showGrid = ref<boolean>(false);
const largeItems = ref<boolean>(false);
const forceShowImages = ref<boolean>(false);

</script>

<template>

    <div class="manager">
        <template v-if="loading">
            <Spinner/>
        </template>

        <template v-else>
            <div class="items" :class="{ grid: showGrid, large: largeItems }">
                <GalleryImage v-for="i in images"
                    :mutable="mutable" :selectable="picker" @edit="edit(i)" 
                    :force-show-image="forceShowImages" :resource="i"
                    @select="selectImage(i)" :selected="isSelected(i)"/>
            </div>

            <div class="controls">
                <template v-if="mutable">
                    <Button @click="showUploader = true" :active="showUploader"><i class="fa-solid fa-plus"></i>&nbsp; ADD IMAGES</Button>
                </template>
                <Button @click="forceShowImages = !forceShowImages" :active="forceShowImages">
                    <template v-if="!forceShowImages">
                        <i class="fa-solid fa-eye"></i>&nbsp; SHOW IMAGES
                    </template>
                    <template v-else>
                        <i class="fa-solid fa-eye-slash"></i>&nbsp; HIDE IMAGES
                    </template>
                </Button>
                <Button @click="showGrid = !showGrid" :active="showGrid">
                    <i class="fa-solid fa-grid"></i>
                </Button>
                <Button @click="largeItems = !largeItems" :active="largeItems">
                    <i class="fa-solid fa-expand"></i>
                </Button>
            </div>
            
            <GalleryImageUploader @done="imagesUploaded" v-if="showUploader" :gallery="gallery"/>

            <GalleryImageEditor v-if="toEdit" v-model="toEdit" :confirm="confirmEdit" @delete_="editDelete" @done="reset">
                Edit Image Resource [{{ toEdit.id }}]
            </GalleryImageEditor>
        </template>
    </div>

</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;

    > .items {
        $gap: 0.5em;
        --nitems: 6;

        width: 100%;
        display: flex;
        flex-direction: row;
        overflow: scroll;
        gap: $gap;
        padding: $gap;
        padding-bottom: 1em;
        
        > .image-resource {
            $size: calc(100% / var(--nitems) - ($gap * (var(--nitems) - 1)) / var(--nitems));
            min-width: $size;
            max-width: $size;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        }

        &.grid {
            flex-wrap: wrap;
        }

        &.large {
            --nitems: 4;
        }
    }

    > .controls {
        display: flex;
    }

    > .image-uploader {
        width: 100%;
    }
}
</style>