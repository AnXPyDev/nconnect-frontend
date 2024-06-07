<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Stage } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';

import StageEditor from './StageEditor.vue';
import StageHolder from './Stage.vue';
import TimeslotsManager from './TimeslotsManager.vue';

import Button from '@/components/Button.vue';


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

    <div class="StagesManager">
        <div class="stages">
            <StageHolder v-for="stage in stages" :stage="stage" :key="stage.id" @edit="edit(stage)"></StageHolder>
        </div>

        <Button @click="create" :active="!!toCreate" :enabled="!toCreate"><i class="fa-solid fa-plus"></i>&nbsp; NEW STAGE</Button>

        <StageEditor class="editor" v-if="toEdit" v-model:stage="toEdit" allow-delete @done="editConfirm" @delete="editDelete" @cancel="editCancel">
            Edit Stage [{{ toEdit.id }}]
        </StageEditor>
        <StageEditor class="editor" v-if="toCreate" v-model:stage="toCreate" @done="createConfirm" @cancel="createCancel">
            Create Stage
        </StageEditor>
    </div>
</template>

<style lang="scss" scoped>
    .StagesManager {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: start;

        > .stages, > .editor {
            width: 100%;
        }

        > .stages {
            display: flex;
            flex-direction: column;
            gap: 1em;

            > * {
                width: 100%;
            }
        }
    }
</style>