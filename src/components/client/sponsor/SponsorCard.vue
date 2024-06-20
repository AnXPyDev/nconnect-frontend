<script setup lang="ts">
import type { Sponsor } from '@/lib/remote/Models';
import { getThumbnailURL } from '@/lib/remote/Util';
import ContactIcons from '@/components/client/util/ContactIcons.vue';


const props = defineProps<{
    sponsor: Sponsor
}>();

</script>

<template>
    <div class="sponsor-card">
        <div class="top">
            <div class="image">
                <img :src="getThumbnailURL(sponsor.image_id)"/>
            </div>
            <div class="overlay">
                <div v-if="sponsor.description" class="description">
                    <div class="text">{{ sponsor.description }}</div>
                </div>

                <div class="tag">
                    {{ sponsor.name }}
                </div>

                <ContactIcons class="links" :contact="sponsor.contact" />
            </div>
        </div>
        <div class="bottom">
            <span class="name">{{ sponsor.name }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .sponsor-card {
        $pad: 0.5rem;
        $align: calc(4 * $pad);
        $sidew: 2rem;

        aspect-ratio: 1;

        display: flex;
        flex-direction: column;

        > .bottom {
            display: none;
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
                    object-fit: contain;
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
                
                &:not(:has(> .description)) {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    > .links {
                        position: static;
                        flex-direction: row;
                        width: auto;
                        font-size: 1.5em;
                    }

                    > .tag {
                        position: static;
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