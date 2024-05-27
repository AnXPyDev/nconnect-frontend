<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import type { Resource } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';

import ImageResource from './ImageResource.vue';
import ImageResourceEditor from './ImageResourceEditor.vue';

let file: File;

const images = ref<Resource[]>([]);

remote.post('resource/images').then((res: { images: Resource[] }) => {
    images.value = res.images;
}).send();

const toCreate = ref<Resource>();
const toEdit = ref<Resource>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function edit(presentation: Resource) {
    cancel();
    toEdit.value = Object.assign({}, presentation);
}

function create() {
    cancel();
    toCreate.value = {
        name: "",
        type: "image"
    };
}

function createConfirm() {
    const p = toRaw(toCreate.value)!!;
    cancel();

    remote.post("resource/create", p).then((res: { resource: Resource }) => {
        images.value.push(res.resource);
    }).send();
}

function editConfirm() {
    const p = toRaw(toEdit.value)!!;
    cancel();

    remote.post("resource/edit", p).then((res: { resource: Resource }) => {
        Object.assign(images.value[images.value.findIndex((v) => v.id == res.resource.id)], res.resource);
    }).send();
}

function editDelete() {
    const p = toRaw(toEdit.value)!!;
    cancel();

    remote.post("resource/delete", p).then((res) => {
        images.value.splice(images.value.findIndex((v) => v.id == p.id), 1)
    }).send();
}

</script>

<template>
    <h2>image resources</h2>
    <ImageResource v-for="image in images" :resource="image"></ImageResource>

    <button @click="create">create</button>

    <ImageResourceEditor v-if="toCreate" v-model:resource="toCreate" @done="createConfirm" @cancel="cancel"/>
    <ImageResourceEditor v-if="toEdit" v-model:resource="toEdit" allow-delete @done="editConfirm" @cancel="cancel" @delete="editDelete"/>
</template>