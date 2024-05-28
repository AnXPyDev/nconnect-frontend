<script setup lang="ts">

import remote from '@/lib/ApiRemote';
import { type Gallery } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';
import GalleryEditor from './GalleryEditor.vue';
import GalleryHolder from './Gallery.vue';

const galleries = ref<Gallery[]>([]);

remote.post("gallery/index").then((response: { galleries: Gallery[] }) => {
    galleries.value = response.galleries;
}).send();

const toCreate = ref<Gallery>();
const toEdit = ref<Gallery>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    cancel();
    toCreate.value = { 
        name: "",
        description: ""
    };
}

function edit(gallery: Gallery) {
    cancel();
    toEdit.value = Object.assign({}, gallery);
}

function editConfirm() {
    const gallery = toRaw(toEdit.value)!!;

    cancel();
    remote.post("gallery/edit", gallery).then((res: { gallery: Gallery }) => {
        Object.assign(galleries.value.find((s) => s.id == res.gallery.id)!!, res.gallery);
    }).send();
}

function editDelete() {
    const gallery = toRaw(toEdit.value)!!;
    cancel();
    remote.post("gallery/delete", gallery).then((res) => {
        galleries.value.splice(galleries.value.findIndex((s) => s.id == gallery.id), 1)
    }).send();
}

function createConfirm() {
    const gallery = toRaw(toCreate.value)!!;
    cancel();
    remote.post("gallery/create", gallery).then((res: { gallery: Gallery }) => {
        galleries.value.push(res.gallery);
    }).send();
}

</script>

<template>
    <h2>galleries</h2>
    <GalleryHolder v-for="g in galleries" :gallery="g" :key="g.id" @edit="edit(g)"/>
    <button @click="create">create</button>
    <GalleryEditor v-if="toEdit" v-model:gallery="toEdit" allow-delete @done="editConfirm" @delete="editDelete" @cancel="cancel" />
    <GalleryEditor v-if="toCreate" v-model:gallery="toCreate" allow-delete @done="createConfirm" @cancel="cancel" />
</template>