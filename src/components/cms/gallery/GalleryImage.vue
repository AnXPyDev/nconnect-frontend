<script setup lang="ts">
import type { Resource } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';

const props = defineProps<{
    resource: Resource
    selected?: boolean
    selectable?: boolean
    forceShowImage?: boolean
    mutable?: boolean
}>();

const emit = defineEmits<{
    edit: [],
    select: []
}>();


const showImage = ref<boolean>(false);

</script>

<template>
    <div class="image-resource" :class="{ selectable, selected }" @click="emit('select')">
        <div v-if="forceShowImage || showImage" class="image">
            <img :src="getResourceURL(resource.id!!)"/>
        </div>

        <div class="header">
            <div class="info">
                <span class="id">[{{ resource.id }}]</span>
                <span class="name">{{ resource.name }}</span>
            </div>
            <div class="controls">
                <span v-if="!forceShowImage" @click="showImage = !showImage" class="icon-button">
                    <i v-if="showImage" class="fa-solid fa-eye-slash"></i>
                    <i v-else class="fa-solid fa-eye"></i>
                </span>
                <template v-if="mutable">
                    <i @click="emit('edit')" class="icon-button fa-solid fa-pen"></i>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.image-resource {
    background-color: var(--clr-primary);
    color: var(--clr-fg-on-primary);
    overflow: hidden;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;

    &.selected, &.selectable:hover {
        background-color: var(--clr-primary-1);
    }

    &.selectable {
        cursor: pointer;
    }

    > .image {
        width: 100%;
        aspect-ratio: 1;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    > .header {
        display: flex;
        padding: 0.5em;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        gap: 0.5em;

        > .info {
            display: flex;
            gap: 0.5em;
            align-items: center;
            word-break: break-all;
            > .id {
                opacity: 75%;
                font-size: 0.75em;
            }
        }

        > .controls {
            display: flex;
            justify-content: end;
            gap: 0.5em;
            font-size: 1.2em;
            > .icon-button {
                cursor: pointer;
                opacity: 75%;

                &:hover {
                    opacity: 100%;
                }
            }
        }
    }
}

</style>