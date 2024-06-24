<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Qna, type WithID } from '@/lib/remote/Models';
import QnaEditor from './QnaEditor.vue';
import QnaHolder from './QnaHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { EmptyQna } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const qnas = ref<WithID<Qna>[]>([]);

const loading = ref<boolean>(true);

remote.post("qna/index").then((response: Response<{ qnas: WithID<Qna>[] }>) => {
    qnas.value = response.qnas;
    loading.value = false;
}).send();

const toCreate = ref<Qna>();
const toEdit = ref<Qna>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = EmptyQna();
}

function edit(qna: Qna) {
    reset();
    toEdit.value = copyEntity(qna);
}

async function editConfirm() {
    const { qna }: { qna: WithID<Qna> } = await remote.post("qna/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    console.log(qna, qnas);
    replaceEntity(qnas, qna);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("qna/delete", { id }).fail(throwValidation).send();
    deleteEntity(qnas, id);
}

async function createConfirm() {
    const { qna }: { qna: WithID<Qna> } = await remote.post("qna/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    pushEntity(qnas, qna);
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
                <QnaHolder v-for="qna in qnas" :qna="qna" :key="qna.id" @edit="edit(qna)"/>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW QNA</Button>

            <QnaEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit QnA [{{ toEdit.id }}]
            </QnaEditor>
            <QnaEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create QnA
            </QnaEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>