<script setup lang="ts">
import type { Headliner } from '@/lib/remote/Models';
import { getResourceURL, getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '../util/ContactIcons.vue';
import SpeakerShowcase from './SpeakerShowcase.vue';
import { ref } from 'vue';


const props = defineProps<{
    headliner: Headliner
}>();

const showcase = ref(false);

</script>

<template>

<div v-if="headliner.speaker && headliner.stage" class="headliner-card">

    <div class="left">
        <img :src="getThumbnailURL(headliner.speaker.image_id)"/>
        <div class="overlay">
            <ContactIcons :contact="headliner.speaker.contact" class="links"></ContactIcons>
        </div>

    </div>

    <div class="right">
        <div class="stage">{{ headliner.stage.name }}</div>
        <div @click="showcase=true" class="name">{{ headliner.speaker.name }}</div>
        <div class="description">
            {{ headliner.speaker.description }}
        </div>
        <span @click="showcase=true" class="about-link">Viac o mne</span>
    </div>

    <SpeakerShowcase class="showcase" v-if="showcase" @close="showcase=false" :speaker="headliner.speaker" />
</div>

</template>

<style scoped lang="scss">
.headliner-card {
    display: flex;

    height: 400px;

    > div:not(.showcase) {
        width: 50%;
        height: 100%;
    }

    > .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        max-height: 100%;
        gap: 0.5em;

        padding: 2em;

        > .name {
            font-size: 1.5em;
            font-weight: 700;
            color: var(--clr-primary);
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        > .description {
            line-height: 1.75em;
            flex-grow: -1;
            overflow: hidden;
        }

        > .about-link {
            cursor: pointer;
            color: var(--clr-primary);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    > .left {
        position: relative;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        > .overlay {
            position: absolute;
            top: 0;
            left: 0;
            transform: scale(0);
            width: 100%;
            height: 100%;
            background-color: var(--clr-primary-1);

            display: flex;
            justify-content: center;
            align-items: center;
            visibility: hidden;
            opacity: 0%;
            transition: 0.5s all ease;

            color: var(--clr-fg-on-primary);

            > .links {
                display: flex;
                gap: 1em;
                align-items: center;
                font-size: 1.5em;
            }
        }

    }

    &:hover {
        > .left > .overlay {
            visibility: visible;
            opacity: 100%;
            transform: scale(1);
        }  
    }
}

</style>