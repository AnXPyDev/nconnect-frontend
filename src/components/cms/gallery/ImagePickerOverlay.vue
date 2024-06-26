<script setup lang="ts">
import { ref } from 'vue';
import type { Image, Resource, WithID } from '@/lib/remote/Models';

import ImageBrowser from './ImageBrowser.vue';
import Overlay from '@/components/util/Overlay.vue';
import Button from '@/components/util/Button.vue';

const emit = defineEmits<{
    select: [WithID<Image>],
    cancel: []
}>();

const image = ref<WithID<Image>>();

function select(i: WithID<Image>) {
    image.value = i;
}

function confirm() {
    emit('select', image.value!!);
}

function cancel() {
    emit('cancel');
}

</script>

<template>
    <Overlay>
        <div class="image-picker">
            <div class="browser">
                <ImageBrowser @select="select"></ImageBrowser>
            </div>
            <div class="bar">
                <div v-if="image" class="info">
                    <i class="fa-solid fa-image"></i>
                    <span class="id">[{{ image.id }}]</span>
                    <span class="name">{{ image.name }}</span>
                </div>
                <div v-else>
                    SELECT AN IMAGE
                </div>
                <div class="controls">
                    <template v-if="image">
                        <Button @click="confirm"><i class="fa-solid fa-check"></i>&nbsp; CONFIRM</Button>
                    </template>
                    <Button @click="cancel"><i class="fa-solid fa-xmark"></i>&nbsp; CANCEL</Button>
                </div>

            </div>
        </div>
    </Overlay>
</template>

<style scoped lang="scss">
.image-picker {
    background-color: var(--clr-bg);
    overflow: scroll;
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 75%;

    > .bar, > .browser {
        padding: 1em;
    }

    > .browser {
        overflow: scroll;
        flex-grow: 1;
    }

    > .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--clr-bg-alt);
        padding: 1em;

        > .controls {
            display: flex;
        }

        > .info {
            background-color: var(--clr-primary);
            color: var(--clr-fg-on-primary);
            padding: 0.5em;

            display: flex;
            align-items: center;
            gap: 0.5em;

            > .id {
                opacity: 75%;
                font-size: 0.75em;
            }
        }
    }

}
</style>