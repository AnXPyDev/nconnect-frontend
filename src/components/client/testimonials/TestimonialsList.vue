<script setup lang="ts">

import type { Testimonial } from '@/lib/remote/Models';
import { getResourceURL, getThumbnailURL } from '@/lib/remote/Util';
import { ref } from 'vue';

import TestimonialHolder from './Testimonial.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';


const loading = ref<boolean>(true);
const testimonials = ref<Testimonial[]>([]);
let selectedTestimonials = ref<Testimonial[]>([]);

remote.post("testimonial/index").then((res: Response<{ testimonials: Testimonial[] }>) => {
    testimonials.value = res.testimonials;
    selectedTestimonials.value = [
        testimonials.value[0],
        testimonials.value[0]
    ];
    loading.value = false;
}).send();

const holderClasses = ref<string[]>(["", "away"]);
let index = 0;

function selectTestimonial(t: Testimonial) {
    const ni = (index + 1) % 2;

    selectedTestimonials.value[ni] = t;
    holderClasses.value[ni] = "";
    holderClasses.value[index] = "away";

    index = ni;
}

</script>


<template>
<div class="testimonials content-container">
    <div class="background">
        <img src="https://nconnect.sk/images/bg/testimonial.jpg"/>
    </div>

    <div class="content">
        <PageSectionHeader class="section-header">Povedali o nás</PageSectionHeader>
        <div class="bottom">
            <div class="selector">
                <div v-for="t in testimonials" class="button">
                    <img @click="selectTestimonial(t)" :src="getThumbnailURL(t.image_id)"/>
                </div>
            </div>

            <Spinner v-if="loading"></Spinner>
            <div v-else class="items">
                <TestimonialHolder :class="holderClasses[0]" :testimonial="selectedTestimonials[0]"/>
                <TestimonialHolder :class="holderClasses[1]" :testimonial="selectedTestimonials[1]"/>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/media';

.testimonials {
    position: relative;

    > .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;

        > img {
            opacity: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    > .content {
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: var(--clr-fg-inv);
        gap: 1em;

        height: 50vh;

        @include media.phone {
            height: auto;
        }

        > .bottom {
            display: flex;
            flex-direction: row;
            flex-grow: 1;

            gap: 3em;
            
            @include media.phone {
                flex-direction: column;
                height: 100vh;
            }



            > .items {
                position: relative;
                display: flex;
                gap: 1em;
                flex-grow: 1;
                width: 100%;
                height: 100%;
                overflow: hidden;

                > .testimonial {
                    position: absolute;

                    transition: 1s all ease;

                    &.away {
                        visibility: hidden;
                        opacity: 0%;
                    }

                    width: 100%;
                    height: 100%;
                }
            }

            > .selector {
                display: flex;
                gap: 0.5em;

                > .button {
                    width: 6em;
                    height: 6em;
                    
                    border: solid 0.3em var(--clr-fg-inv);

                    transition: 0.5s all ease;

                    cursor: pointer;

                    > img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    &:hover, &.active {
                        opacity: 75%;
                    }

                }


            }
        }
    }
}
</style>