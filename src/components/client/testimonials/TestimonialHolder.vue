<script setup lang="ts">

import type { Testimonial } from '@/lib/remote/Models';
import { getResourceURL, getThumbnailURL } from '@/lib/remote/Util';

const props = defineProps<{
    testimonial: Testimonial
}>();

</script>

<template>
    <div class="testimonial">
        <div class="left">
            <div class="quote">
                {{ testimonial.description }}
            </div>
            <div class="author">
                {{ testimonial.author }}
            </div>
        </div>
        <div class="right">
            <div class="image">
                <img :src="getThumbnailURL(testimonial.image_id)"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/media';

.testimonial {
    display: flex;
    gap: 1em;

    @include media.phone {
        flex-direction: column;
    }
    
    > .left {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1em;

        > .quote {
            font-style: italic;
            line-height: 1.5em;
            font-size: 1.2em;
        }

        > .author {
            font-size: 1.5em;
            text-transform: uppercase;
            font-weight: 900;
        }
    }

    > .right {
        > .image {
            width: 20em;
            height: 20em;
            border: solid 0.3em var(--clr-fg-inv);

            > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }


}
</style>