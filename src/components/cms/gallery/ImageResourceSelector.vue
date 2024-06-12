<script setup lang="ts">
import type { Resource } from '@/lib/remote/Models';
import ImagePickerOverlay from './ImagePickerOverlay.vue';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';
import Button from '@/components/util/Button.vue';


const props = defineProps<{
    allowNone?: boolean
}>();

const resource_id = defineModel<number | undefined>();

const pickerOpen = ref<boolean>(false);

function openPicker() {
    pickerOpen.value = true;
}

function closePicker() {
    pickerOpen.value = false;
}

function select(resource: Resource) {
    resource_id.value = resource.id;
    closePicker(); 
}

function setNone() {
    resource_id.value = undefined;
}



</script>

<template>

    <div class="image-resource-selector">
        <div class="label">
            <slot></slot>
        </div>
        <div v-if="resource_id" class="preview">
            <img :src="getResourceURL(resource_id)"/>
        </div>
        <div v-else class="none">
            No Image Selected
        </div>

        <div class="controls">
            <Button @click="openPicker"><i class="fa-solid fa-magnifying-glass"></i>&nbsp; PICK IMAGE</Button>
            <Button v-if="allowNone && resource_id" @click="setNone"><i class="fa-solid fa-xmark"></i>&nbsp; REMOVE IMAGE</Button>
        </div>

        <ImagePickerOverlay @select="select" @cancel="closePicker" v-if="pickerOpen"></ImagePickerOverlay>
    </div>

</template>

<style scoped lang="scss">

.image-resource-selector {
    --min-input-width: 0;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;

    > .controls {
        display: flex;
    }

    > .preview {
        width: 20em;
        aspect-ratio: 1;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

}

</style>