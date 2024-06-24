<script setup lang="ts">

import Overlay from '@/components/util/Overlay.vue';
import type { Image, WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import Button from '@/components/util/Button.vue';

const index = defineModel<number>({ required: true });

const props = defineProps<{
    images: WithID<Image>[]
}>();

const emit = defineEmits<{
    close: []
}>();

function prev() {
    let i = index.value - 1;
    if (i < 0) {
        i = props.images.length - 1;
    }
    index.value = i;
}

function next() {
    let i = index.value + 1;
    if (i >= props.images.length) {
        i = 0;
    }
    index.value = i;
}

</script>

<template>
<Overlay @clickout="emit('close')" class="gallery-overlay">
    <div class="image">
        <img :src="getResourceURL(images[index].id)"/>
    </div>
    <div class="controls">
        <Button @click="prev"><i class="fa-solid fa-chevron-left"></i></Button>
        <Button @click="next"><i class="fa-solid fa-chevron-right"></i></Button>
        <Button @click="emit('close')"><i class="fa-solid fa-xmark"></i></Button>
    </div>
</Overlay>
</template>

<style scoped lang="scss">

.gallery-overlay {
    $controls-height: 4em;
    display: flex;
    flex-direction: column;
    > .image {
        width: 100%;
        height: calc(100% - $controls-height);
        padding: 2vmin;

        > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    > .controls {
        color: var(--clr-fg-inv);
        height: $controls-height;
        display: flex;

        > .button {
            font-size: 2em;
        }
    }
}



</style>