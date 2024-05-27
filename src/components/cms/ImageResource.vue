<script setup lang="ts">
import type { Resource } from '@/lib/Bridge';
import { getResourceURL } from '@/lib/urls';
import { ref } from 'vue';
import ImageResourceUploader from './ImageResourceUploader.vue';

const props = defineProps<{
    resource: Resource
}>();

const emit = defineEmits<{
    edit: []
}>();

const imageSrc = ref<string>();

function loadImage() {
    imageSrc.value = getResourceURL(props.resource.id!!);
}

function unloadImage() {
    imageSrc.value = undefined;
}

</script>

<template>
    <div>
        <span @click="emit('edit')">[{{ resource.id }}] {{ resource.type }} {{ resource.name }}</span>
        <img v-if="imageSrc" :src="imageSrc"/>
        <button v-else @click="loadImage">load</button>
        <ImageResourceUploader @updated="unloadImage" :id="resource.id!!"></ImageResourceUploader>
    </div>
</template>

<style scoped lang="scss">

img {
    width: 100px;
}

</style>