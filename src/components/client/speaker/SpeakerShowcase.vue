<script setup lang="ts">
import Overlay from '@/components/util/Overlay.vue';
import type { Speaker } from '@/lib/remote/Models';
import Button from '@/components/util/Button.vue';
import { getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '@/components/client/util/ContactIcons.vue';
import CompanyLink from './CompanyLink.vue';

const props = defineProps<{
    speaker: Speaker
}>();

const emit = defineEmits<{
    close: []
}>();

</script>

<template>
    <Overlay @clickout="emit('close')" class="overlay">
        <div class="showcase">
            <div class="left">
                <img :src="getThumbnailURL(speaker.image_id)"/>
            </div>
            <div class="right">
                <div class="top">
                    <div class="left">
                        <span class="name">{{ speaker.name }}</span>
                        <span v-if="speaker.subtitle" class="subtitle">{{ speaker.subtitle }}</span>
                        <CompanyLink :company="speaker.company"></CompanyLink>
                        <ContactIcons class="contact" :contact="speaker.contact"/>
                    </div>

                    <div class="right">
                        <Button @click="emit('close')"><i class="fa-solid fa-xmark"></i></Button>
                    </div>

                </div>

                <div class="description">{{ speaker.description }}</div>
            </div>
        </div>
    </Overlay>
</template>


<style scoped lang="scss">

@use '@/styles/lib/media';

.overlay > .showcase {
    display: flex;
    background-color: var(--clr-bg);
    width: max(50vw, 800px);
    height: max(60vh, 600px);

    @include media.phone {
        flex-direction: column;
        align-items: center;
        width: calc(100svw - 10vmin);
        height: calc(100svh - 20vmin);
    }

    > .left {
        width: 50%;
        height: 100%;

        @include media.phone {
            width: 50%;
            height: 30%;
            padding: 1em;
        }


        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    > .right {
        display: flex;
        flex-direction: column;
        justify-content: start;
        padding: 2em;
        width: 50%;
        overflow-y: scroll;

        @include media.phone {
            width: 100%;
        }

        > .top {
            display: flex;
            justify-content: space-between;
            align-items: start;
            gap: 1em;
            
            > .left {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                > .name {
                    text-transform: uppercase;
                    font-weight: 900;
                    font-size: 1.2em;
                    color: var(--clr-fg-strong);
                }

                > .contact {
                    display: flex;
                    font-size: 1.2em;
                    gap: 0.5em;
                }
            }

            > .right {
                font-size: 1.3em;
            }


        }

        > .description {
            line-height: 1.75em;
            margin-top: 2em;
        }
    }
}

</style>
