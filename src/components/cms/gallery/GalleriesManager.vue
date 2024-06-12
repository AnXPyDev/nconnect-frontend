<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Gallery } from '@/lib/remote/Models';

import Button from '@/components/util/Button.vue';
import GalleryEditor from './GalleryEditor.vue';
import GalleryHolder from './GalleryHolder.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';

const loading = ref<boolean>(true);

const galleries = ref<Gallery[]>([]);

remote.post("gallery/index").then((response: Response<{ galleries: Gallery[] }>) => {
    galleries.value = response.galleries;
    loading.value = false;
}).send();

const toCreate = ref<Gallery>();
const toEdit = ref<Gallery>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = { 
        name: "",
        description: "",
        public: false
    };
}

function edit(gallery: Gallery) {
    reset();
    toEdit.value = Object.assign({}, gallery);
}

async function editConfirm() {
    const { gallery }: { gallery: Gallery } = await remote.post("gallery/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(galleries.value.find(predicateByID(gallery.id!!))!!, gallery);;
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("gallery/delete", { id }).send();
    galleries.value.splice(galleries.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { gallery }: { gallery: Gallery } = await remote.post("gallery/create", toRaw(toCreate.value)!!).unwrap().send();
    galleries.value.push(gallery);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <GalleryHolder v-for="g in galleries" mutable :gallery="g" :key="g.id" @edit="edit(g)"/>
            </div>
            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW GALLERY</Button>
            <GalleryEditor v-if="toEdit" v-model="toEdit" @done="reset" :confirm="editConfirm" :delete_="editDelete" >
                Edit Gallery [{{ toEdit.id }}]
            </GalleryEditor>
            <GalleryEditor v-if="toCreate" v-model="toCreate" @done="reset" :confirm="createConfirm">
                Create Gallery
            </GalleryEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>