<script setup lang="ts">
import { ref } from 'vue';
import { getFilesFromDrop, pickFiles, type ImageUploaderFile } from '@/lib/cms/ImageUploader';
import { type Gallery, type Image, type Resource, type WithID } from '@/lib/remote/Models';

import Button from '@/components/util/Button.vue';
import GalleryImageUploaderPreview from './GalleryImageUploaderPreview.vue';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';


const props = defineProps<{
    gallery: WithID<Gallery>
}>();

const emit = defineEmits<{
    done: [WithID<Image>[]]
}>();

const images = ref<ImageUploaderFile[]>([]);
const uploading = ref<boolean>(false);
const completed = ref<number>(0);

async function confirm() {
    const uploaded: WithID<Image>[] = [];

    uploading.value = true;
   
    for (const i of images.value) {
        const { image }: Response<{ image: WithID<Image> }> = await remote.post("gallery/createimage", { id: props.gallery.id, name: i.name }).send();
        await remote.put("resource/upload", { id: image.id, extension: i.extension }, i.blob).send();
        uploaded.push(image);
        completed.value++;
    }     

    uploading.value = false;

    emit('done', uploaded);
}

function addImages(list: ImageUploaderFile[]) {
    images.value.push(...list);
}

function removeImage(i: number) {
    images.value.splice(i, 1);
}

async function pick() {
    addImages(await pickFiles());
}

function handleDrop(event: any) {
    event.preventDefault();
    getFilesFromDrop(event).then(r => addImages(r));
}

function allowDrop(event: any) {
    event.preventDefault();
}

</script>

<template>
    <div class="image-uploader">
        <div class="images" @drop="handleDrop" @dragover="allowDrop">
            <div class="list">
                <GalleryImageUploaderPreview @remove="removeImage(ix)" v-for="i, ix in images" :image="i"/>
            </div>
            <div v-if="images.length == 0" class="droptext">
                <span>Drag and drop images here</span>
            </div>
        </div>

        <div class="controls">
            <Button @click="pick"><i class="fa-solid fa-magnifying-glass"></i>&nbsp; PICK FILES</Button>
            <Button @click="confirm"><i class="fa-solid fa-check"></i>&nbsp; CONFIRM</Button>
            <Button @click="emit('done', [])"><i class="fa-solid fa-xmark"></i>&nbsp; CANCEL</Button>
        </div>

        <div v-if="uploading" class="progress">
            <Spinner></Spinner>
            <span>PROGRESS: {{ completed }}/{{ images.length }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.image-uploader {
    @include mixins.cmspanel;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;

    > .controls {
        display: flex;
    }

    > .progress {
        display: flex;
        align-items: center;
    }

    > .images {
        min-height: 5em;
        width: 100%;


        > .list {
            display: flex;
            gap: 0.5em;
            overflow: scroll;
            min-width: 100%;

            > .preview {
                min-width: 10em;
                max-width: 10em;
            }
        }

        > .droptext {
            display: flex;
            width: 100%;
            height: 5em;
            align-items: center;
            justify-content: center;
        }
    }

}
</style>