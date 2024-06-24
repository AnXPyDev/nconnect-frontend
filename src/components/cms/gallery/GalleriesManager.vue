<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Gallery, type WithID } from '@/lib/remote/Models';

import Button from '@/components/util/Button.vue';
import GalleryEditor from './GalleryEditor.vue';
import GalleryHolder from './GalleryHolder.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import { EmptyGallery } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import AdminAuth from '@/components/admin/AdminAuth.vue';
import { useAuth } from '@/stores/auth';

const loading = ref<boolean>(true);

const galleries = ref<WithID<Gallery>[]>([]);

remote.post("gallery/index").then((response: Response<{ galleries: WithID<Gallery>[] }>) => {
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
    toCreate.value = EmptyGallery();
}

function edit(gallery: Gallery) {
    reset();
    toEdit.value = copyEntity(gallery);
}

async function editConfirm() {
    const { gallery }: { gallery: WithID<Gallery> } = await remote.post("gallery/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();

    replaceEntity(galleries, gallery);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("gallery/delete", { id }).fail(throwValidation).send();

    deleteEntity(galleries, id);
}

async function createConfirm() {
    const { gallery }: { gallery: WithID<Gallery> } = await remote.post("gallery/create", toRaw(toCreate.value)!!).fail(throwValidation).send();

    pushEntity(galleries, gallery);
}

const auth = useAuth();

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
            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW GALLERY</Button>

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