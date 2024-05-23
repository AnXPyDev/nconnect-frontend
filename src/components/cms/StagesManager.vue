<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Stage } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';

import StageEditor from './StageEditor.vue';
import TimeslotsManager from './TimeslotsManager.vue';


const stages = ref<Stage[]>([]);

remote.post("stage/index").then((response: { stages: Stage[] }) => {
    stages.value = response.stages;
}).send();

const toEdit = ref<Stage>();
const toCreate = ref<Stage>();

function edit(stage: Stage) {
    toCreate.value = undefined;
    toEdit.value = Object.assign({}, stage);
}

function editConfirm() {
    const stage = toRaw(toEdit.value)!!;
    toEdit.value = undefined;
    remote.post("stage/edit", stage).then((res: { stage: Stage }) => {
        Object.assign(stages.value.find((s) => s.id == res.stage.id)!!, res.stage);
    }).send();
}

function editCancel() {
    toEdit.value = undefined;
}

function editDelete() {
    const stage = toRaw(toEdit.value)!!;
    toEdit.value = undefined;
    remote.post("stage/delete", { id: stage.id }).then((res) => {
        stages.value.splice(stages.value.findIndex((s) => s.id == stage.id), 1);
    }).send();
}

function create() {
    toEdit.value = undefined;
    toCreate.value = { name: "" };
}

function createCancel() {
    toCreate.value = undefined;
}

function createConfirm() {
    const stage = toRaw(toCreate.value)!!;
    toCreate.value = undefined;
    remote.post("stage/create", stage).then((res: { stage: Stage }) => {
        stages.value.push(res.stage);
    }).send();
}

</script>

<template>
    <h2>stages</h2>
    <template v-for="stage in stages" :key="stage.id">
        <div  @click="edit(stage)">{{ stage.id }} {{ stage.name }}</div>
        <TimeslotsManager :stage_id="stage.id!!"></TimeslotsManager>
    </template>
    <button @click="create">create</button>
    <StageEditor v-if="toEdit" v-model:stage="toEdit" allow-delete @done="editConfirm" @delete="editDelete" @cancel="editCancel"></StageEditor>
    <StageEditor v-if="toCreate" v-model:stage="toCreate" @done="createConfirm" @cancel="createCancel"></StageEditor>
</template>