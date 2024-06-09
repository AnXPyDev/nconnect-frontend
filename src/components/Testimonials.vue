<script setup lang="ts">

import type { Testimonial } from '@/lib/Bridge';
import { getResourceURL } from '@/lib/urls';
import { ref } from 'vue';

import TestimonialHolder from './Testimonial.vue';

const drlik = {
    author: "Martin Drlík - prodekan FPVaI UKF",
    description: "Táto konferencia predstavuje vynikajúcu príležitosť pre našich študentov, aby sa nielen zoznámili s najnovšími trendmi v oblasti informatiky, ale aj naviazali cenné kontakty s profesionálmi z praxe.",
    image_id: 2
};

const testimonials = ref<Testimonial[]>([drlik, drlik, drlik, drlik]);

let selectedTestimonials = ref<Testimonial[]>([testimonials.value[0], testimonials.value[1]]);

const holder1 = ref<any>();
const holder2 = ref<any>();

const holders = [holder1, holder2];
let index = 0;

function selectTestimonial(t: Testimonial) {
    const ni = (index + 1) % 2;

    selectedTestimonials.value[ni] = t;


    const current: HTMLElement = holders[index].value.$el;
    const next: HTMLElement = holders[ni].value.$el;

    console.log(current, next);

    current.classList.add("away");
    next.classList.remove("away");

    index = ni;
}

</script>


<template>
<div class="testimonials content-container">
    <div class="background">
        <img src="https://nconnect.sk/images/bg/testimonial.jpg"/>
    </div>

    <div class="content">
        <div class="top">
            <span class="title">Povedali o nás</span>
        </div>
        <div class="bottom">
            <div class="selector">
                <div v-for="t in testimonials" class="button">
                    <img @click="selectTestimonial(t)" :src="getResourceURL(t.image_id!!)"/>
                </div>
            </div>

            <div class="items">
                <TestimonialHolder :testimonial="selectedTestimonials[0]" ref="holder1"/>
                <TestimonialHolder class="away" :testimonial="selectedTestimonials[1]" ref="holder2"/>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
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
        height: 100%;
        color: var(--clr-fg-inv);
        gap: 1em;

        > .top {
            > .title {
                text-transform: uppercase;
                font-size: 1.5em;
                font-weight: 900;
            }
        }

        > .bottom {
            display: flex;
            flex-direction: row;
            height: 75%;
            gap: 3em;



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

    height: 75vh;
}
</style>