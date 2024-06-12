<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import { type Stage } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';

import StageEditor from './StageEditor.vue';
import StageHolder from './StageHolder.vue';

import Button from '@/components/util/Button.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';


const stages = ref<Stage[]>([]);
const loading = ref<boolean>(true);

remote.post("stage/index").then((response: Response<{ stages: Stage[] }>) => {
    stages.value = response.stages;
    loading.value = false;
}).send();

const toEdit = ref<Stage>();
const toCreate = ref<Stage>();

function reset() {
    toEdit.value = undefined;
    toCreate.value = undefined;
}

function edit(stage: Stage) {
    reset();
    toEdit.value = Object.assign({}, stage);
}

function create() {
    reset();
    toCreate.value = { name: "" };
}

async function editConfirm() {
    const { stage }: { stage: Stage } = await remote.post("stage/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(stages.value.find(predicateByID(stage.id!!))!!, stage);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("stage/delete", { id }).send();
    stages.value.splice(stages.value.findIndex(predicateByID(id)), 1);
}


async function createConfirm() {
    const { stage }: { stage: Stage } = await remote.post("stage/create", toRaw(toCreate.value)!!).unwrap().send();
    stages.value.push(stage);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <StageHolder v-for="stage in stages" :stage="stage" :key="stage.id" @edit="edit(stage)"></StageHolder>
            </div>

            <Button @click="create" :active="!!toCreate" :enabled="!toCreate"><i class="fa-solid fa-plus"></i>&nbsp; NEW STAGE</Button>

            <StageEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit Stage [{{ toEdit.id }}]
            </StageEditor>
            <StageEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create Stage
            </StageEditor>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}
</style>