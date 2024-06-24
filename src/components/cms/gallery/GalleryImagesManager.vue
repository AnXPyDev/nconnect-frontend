<script setup lang="ts">
import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Gallery, type Image, type WithID } from '@/lib/remote/Models';

import Spinner from '@/components/util/Spinner.vue';
import Button from '@/components/util/Button.vue';
import GalleryImage from './GalleryImage.vue';
import GalleryImageUploader from './GalleryImageUploader.vue';
import GalleryImageEditor from './GalleryImageEditor.vue';
import { copyEntity, deleteEntity, predicateByID, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const loading = ref<boolean>(true);

const props = defineProps<{
    gallery: WithID<Gallery>
    mutable?: boolean
    picker?: boolean
}>();

const emit = defineEmits<{
    select: [WithID<Image>]
}>();

const images = ref<WithID<Image>[]>([]);

remote.post("gallery/images", { id: props.gallery.id }).then((res: Response<{ images: WithID<Image>[] }>) => {
    images.value = res.images;
    loading.value = false;
}).send();

const showUploader = ref<boolean>(false);

function imagesUploaded(imgs: WithID<Image>[]) {
    showUploader.value = false;
    images.value.push(...imgs);
}

const toEdit = ref<Image>();

function reset() {
    toEdit.value = undefined;
}

function edit(i: Image) {
    toEdit.value = copyEntity(i);
}

async function confirmEdit() {
    const { resource: image } : { resource: WithID<Image> } = await remote.post("resource/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    replaceEntity(images, image);
}

async function editDelete() {
    const resource_id = toEdit.value!!.id!!;
    await remote.post("gallery/deleteimage", { id: props.gallery.id, resource_id }).fail(throwValidation).send(); 
    deleteEntity(images, resource_id);
}

const selectedImages = ref<number[]>([]);

function isSelected(i: WithID<Image>) {
    return selectedImages.value.findIndex((v) => v == i.id) !== -1;
}

function selectImage(i: WithID<Image>) {
    if (props.picker) {
        emit('select', i);
    }
}

const showGrid = ref<boolean>(false);
const largeItems = ref<boolean>(false);
const forceShowImages = ref<boolean>(false);

const auth = useAuth();

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
                    :force-show-image="forceShowImages" :image="i"
                    @select="selectImage(i)" :selected="isSelected(i)"/>
            </div>

            <div class="controls">
                <template v-if="mutable && auth.checkPriv(AdminPriv.EDIT)">
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

            <GalleryImageEditor v-if="toEdit" v-model="toEdit" :confirm="confirmEdit" :delete_="editDelete" @done="reset">
                Edit Image Image [{{ toEdit.id }}]
            </GalleryImageEditor>
        </template>
    </div>

</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';
@use '@/styles/lib/dimens';

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
        
        > .gallery-image {
            $size: dimens.spread-percentage(var(--nitems), $gap);
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