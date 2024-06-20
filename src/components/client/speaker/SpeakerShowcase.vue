<script setup lang="ts">
import Overlay from '@/components/util/Overlay.vue';
import type { Speaker } from '@/lib/remote/Models';
import Button from '@/components/util/Button.vue';
import { getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '../util/ContactIcons.vue';

const props = defineProps<{
    speaker: Speaker
}>();

const emit = defineEmits<{
    close: []
}>();

</script>

<template>
    <Overlay class="overlay">
        <div class="showcase">
            <div class="left">
                <img :src="getThumbnailURL(speaker.image_id)"/>
            </div>
            <div class="right">
                <div class="top">
                    <span class="name">{{ speaker.name }}</span>
                    <span class="subtitle">{{ speaker.subtitle ?? speaker.company?.name }}</span>
                    <ContactIcons class="contact" :contact="speaker.contact"/>

                    <div class="description">{{ speaker.description }}</div>
                </div>


                <div class="bottom">
                    <Button @click="emit('close')"><i class="fa-solid fa-xmark"></i>&nbsp; ZAVRIEŤ</Button>
                </div>
            </div>
        </div>
    </Overlay>
</template>


<style scoped lang="scss">

.overlay > .showcase {
    display: flex;
    background-color: var(--clr-bg);
    width: 50vw;
    height: 60vh;

    > .left {
        width: 50%;
        height: 100%;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    > .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2em;
        width: 50%;

        > .top {
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

            > .description {
                line-height: 1.75em;
                margin-top: 2em;
            }
        }
    }
}

</style>
