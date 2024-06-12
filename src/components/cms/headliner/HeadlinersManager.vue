<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import remote from '@/lib/remote/Remote';
import type { Headliner } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import HeadlinerHolder from './HeadlinerHolder.vue';
import HeadlinerEditor from './HeadlinerEditor.vue';

import Button from '@/components/util/Button.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';


const loading = ref<boolean>(true);
const headliners = ref<Headliner[]>([]);

remote.post("headliner/index").then((res: Response<{ headliners: Headliner[] }>) => {
    headliners.value = res.headliners;
    loading.value = false;
}).send();

const toCreate = ref<Headliner>();
const toEdit = ref<Headliner>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = {
        speaker_id: null,
        stage_id: null
    };
}

function edit(h: Headliner) {
    reset();
    toEdit.value = Object.assign({}, h);
}

async function confirmEdit() {
    const { headliner }: { headliner: Headliner } = await remote.post("headliner/edit", toRaw(toEdit.value)).unwrap().send();
    Object.assign(headliners.value.find(predicateByID(headliner.id!!))!!, headliner);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("headliner/delete", { id }).send();
    headliners.value.splice(headliners.value.findIndex(predicateByID(id)), 1);
}

async function confirmCreate() {
    const { headliner }: { headliner: Headliner } = await remote.post("headliner/create", toRaw(toCreate.value)).unwrap().send();
    headliners.value.push(headliner);
}

</script>

<template>

<div class="manager">

    <template v-if="loading">
        <Spinner></Spinner>
    </template>
    <template v-else>
        <div class="items">
            <HeadlinerHolder @edit="edit(h)" v-for="h in headliners" :headliner="h"></HeadlinerHolder>
        </div>

        <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW HEADLINER</Button>

        <HeadlinerEditor v-if="toCreate" v-model="toCreate" :confirm="confirmCreate" @done="reset"></HeadlinerEditor>
        <HeadlinerEditor v-if="toEdit" v-model="toEdit" :confirm="confirmEdit" :delete_="editDelete" @done="reset"></HeadlinerEditor>
    </template>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}
</style>