<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Stage, type WithID } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';

import StageEditor from './StageEditor.vue';
import StageHolder from './StageHolder.vue';

import Button from '@/components/util/Button.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import { EmptyStage } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';


const stages = ref<WithID<Stage>[]>([]);
const loading = ref<boolean>(true);

remote.post("stage/index").then((response: Response<{ stages: WithID<Stage>[] }>) => {
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
    toEdit.value = copyEntity(stage);
}

function create() {
    reset();
    toCreate.value = EmptyStage();
}

async function editConfirm() {
    const { stage }: { stage: WithID<Stage> } = await remote.post("stage/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    replaceEntity(stages, stage)
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("stage/delete", { id }).fail(throwValidation).send();
    deleteEntity(stages, id);
}


async function createConfirm() {
    const { stage }: { stage: Stage } = await remote.post("stage/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    pushEntity(stages, stage);
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
                <StageHolder v-for="stage in stages" :stage="stage" :key="stage.id" @edit="edit(stage)"></StageHolder>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create" :active="!!toCreate" :enabled="!toCreate"><i class="fa-solid fa-plus"></i>&nbsp; NEW STAGE</Button>

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