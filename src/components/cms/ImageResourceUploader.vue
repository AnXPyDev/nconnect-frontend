<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { ref } from 'vue';

const props = defineProps<{
    id: number
}>();

const emit = defineEmits<{
    updated: []
}>();

let file: File;

const fileSelected = ref<boolean>(false);

function inputChange(event: any) {
    file = event.target.files[0];

    fileSelected.value = true;
}

function uploadFile() {
    if (file === undefined) {
        return;
    }

    const extension = file.name.split('.').pop();
    if (file.name == extension) {
        console.error("file has no extension");
        return;
    }

    remote.put('resource/upload', { id: props.id, extension }, file).then((res) => {
        emit('updated');
    }).send();
}

</script>

<template>

    <input type="file" accept="image/*" @change="inputChange">
    <button v-if="fileSelected" @click="uploadFile">upload</button>

</template>
