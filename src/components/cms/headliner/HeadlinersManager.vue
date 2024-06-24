<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Headliner, type WithID } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import HeadlinerHolder from './HeadlinerHolder.vue';
import HeadlinerEditor from './HeadlinerEditor.vue';

import Button from '@/components/util/Button.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { EmptyHeadliner } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';


const loading = ref<boolean>(true);
const headliners = ref<WithID<Headliner>[]>([]);

remote.post("headliner/index").then((res: Response<{ headliners: WithID<Headliner>[] }>) => {
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
    toCreate.value = EmptyHeadliner();
}

function edit(h: Headliner) {
    reset();
    toEdit.value = copyEntity(h);
}

async function confirmEdit() {
    const { headliner }: { headliner: WithID<Headliner> } = await remote.post("headliner/edit", toRaw(toEdit.value)).fail(throwValidation).send();
    replaceEntity(headliners, headliner);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("headliner/delete", { id }).fail(throwValidation).send();
    deleteEntity(headliners, id);
}

async function confirmCreate() {
    const { headliner }: { headliner: WithID<Headliner> } = await remote.post("headliner/create", toRaw(toCreate.value)).fail(throwValidation).send();
    pushEntity(headliners, headliner);
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
            <HeadlinerHolder @edit="edit(h)" v-for="h in headliners" :headliner="h"></HeadlinerHolder>
        </div>

        <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW HEADLINER</Button>

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