<script setup lang="ts">
import type { Gallery } from '@/lib/remote/Models';
import { getResourceURL, getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '@/components/client/util/ContactIcons.vue';
import { ref } from 'vue';


const props = defineProps<{
    gallery: Gallery
}>();

</script>

<template>
    <div class="gallery-card">
        <div class="top">
            <div class="image">
                <img :src="getThumbnailURL(gallery.thumbnail_id)"/>
            </div>
            <div class="overlay">
                <div v-if="gallery.description" class="description">
                    <div class="text">{{ gallery.description }}</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span class="name">{{ gallery.name }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .gallery-card {
        cursor: pointer;

        $pad: 0.5rem;
        $align: calc(4 * $pad);
        $sidew: 2rem;

        aspect-ratio: 3/4;

        display: flex;
        flex-direction: column;

        > .bottom {
            flex-grow: 1;
            color: var(--clr-primary);
            font-weight: 900;
            padding: 1.5em;
            padding-left: $align;

            > .name {
                text-transform: uppercase;
            }
        }

        > .top {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;

            > div {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
            }

            > .image {
                > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            > .overlay {
                &:not(:has(> .description)) {
                    display: none;
                }

                background-color: var(--clr-primary-1);
                visibility: hidden;
                opacity: 0%;
                left: 100%;

                
                & {
                    transition: 0.5s all ease;
                }

                > div {
                    transition: 0.5s all ease;
                    transition-delay: 0.4s;
                }

                > .description {
                    position: absolute;
                    padding: calc($align - $pad);
                    top: calc(-2 * $pad);
                    left: calc(-2 * $pad);
                    width: calc(100% - 2 * $pad);
                    max-height: calc(100% - 2 * $pad);
                    background-color: var(--clr-bg);
                    opacity: 0%;

                    display: flex;
                    flex-direction: column;

                    > .text {
                        line-height: 1.5em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }


        }

        &:hover {
            > .top > .overlay {
                visibility: visible;
                opacity: 100%;
                left: 0%;

                > .description {
                    top: $pad;
                    left: $pad;
                    opacity: 100%;
                }

                > .tag {
                    bottom: $pad;
                    opacity: 100%;
                }

                > .links {
                    right: $pad;
                    opacity: 100%;
                }
            }
        }
    }
</style>