<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Resource } from '@/lib/Bridge';
import { ref } from 'vue';


const images = ref<Resource[]>([]);

remote.post("resource/images").then((res: { images: Resource[] }) => {
    images.value = res.images;
}).send();

const image_id = defineModel<number | undefined>();

</script>

<template>
    <select v-model="image_id">
        <option :value="null">none</option>
        <option v-for="i in images" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
    </select>
</template>