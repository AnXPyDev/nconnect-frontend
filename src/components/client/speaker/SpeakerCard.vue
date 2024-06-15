<script setup lang="ts">
import type { Speaker } from '@/lib/remote/Models';
import { getResourceURL, getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from './ContactIcons.vue';
import Link from '@/components/ui/misc/Link.vue';
import CompanyLink from './CompanyLink.vue';


const props = defineProps<{
    speaker: Speaker
}>();

</script>

<template>
    <div class="speaker-card">
        <div class="top">
            <div class="image">
                <img :src="getThumbnailURL(speaker.image_id)"/>
            </div>
            <div class="overlay">
                <div class="description">
                    <div class="text">{{ speaker.description }}</div>
                    <div class="controls">
                        <span class="about-link">Viac o mne</span>
                    </div>
                </div>

                <div class="tag">
                    <CompanyLink :company="speaker.metadata.company"/>
                </div>

                <ContactIcons class="links" :contact="speaker.metadata.contact" />
            </div>
        </div>
        <div class="bottom">
            <span class="name">{{ speaker.name }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .speaker-card {
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
                    width: calc(100% - 3 * $pad - $sidew);
                    max-height: calc(100% - 3 * $pad - $sidew);
                    background-color: var(--clr-bg);
                    opacity: 0%;

                    display: flex;
                    flex-direction: column;

                    > .text {
                        line-height: 1.5em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    > .controls {
                        width: 100%;
                        flex-grow: 1;
                        height: 1em;
                        box-shadow: 0px 0px 0.5em 1em var(--clr-bg);
                        > .about-link {
                            cursor: pointer;
                            color: var(--clr-primary);

                            &:hover {
                                text-decoration: underline;
                            }

                        }
                    }
                }

                > .tag {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    font-weight: 900;
                    left: $align;
                    bottom: calc(-1 * $sidew - $pad);
                    height: $sidew;
                    opacity: 0%;
                }

                > .links {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    padding-block: 0.5em;
                    gap: 1em;
                    align-items: center;
                    right: calc(-1 * $pad - $sidew);
                    top: $pad;
                    width: $sidew;
                    font-size: 1.2em;
                    opacity: 0%;
                }

                > .tag, > .links {
                    color: var(--clr-fg-on-primary);
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