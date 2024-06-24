<script setup lang="ts">
import type { ImageUploaderFile } from '@/lib/cms/ImageUploader';


const props = defineProps<{
    image: ImageUploaderFile
}>();

const emit = defineEmits<{
    remove: []
}>();

</script>

<template>
    <div class="preview">
        <div class="image">
            <img :src="image.blob_src" />
        </div>
        <div class="info-overlay">
            <div class="controls">
                <i @click="emit('remove')" class="icon-button fa-solid fa-xmark"></i>
            </div>
            <span class="name">{{ image.name }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.preview {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
    border-radius: 0.5em;

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

    > .info-overlay {
        width: 100%;
        position: absolute;
        background-color: var(--clr-primary);
        color: var(--clr-fg-on-primary);
        visibility: hidden;
        display: flex;
        flex-direction: column;
        padding: 0.5em;
        justify-content: space-between;
        align-items: start;
        gap: 0.5em;

        > .controls {
            font-size: 1.2em;
            gap: 0.5em;
            display: flex;
            width: 100%;
            justify-content: end;

            > .icon-button {
                opacity: 75%;
                cursor: pointer;
                &:hover {
                    opacity: 100%;
                }
            }
        }

        > .name {
            max-width: 100%;
            word-break: break-all;
        }

    }

    &:hover {
        > .info-overlay {
            visibility: visible;
        }
    }
}
</style>