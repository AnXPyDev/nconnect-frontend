<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Qna } from '@/lib/remote/Models';
import QnaEditor from './QnaEditor.vue';
import QnaHolder from './QnaHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';

const qnas = ref<Qna[]>([]);

const loading = ref<boolean>(true);

remote.post("qna/index").then((response: Response<{ qnas: Qna[] }>) => {
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
    toCreate.value = { 
        question: "",
        answer: ""
    };
}

function edit(qna: Qna) {
    reset();
    toEdit.value = structuredClone(toRaw(qna));
}

async function editConfirm() {
    const { qna }: { qna: Qna } = await remote.post("qna/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(qnas.value.find(predicateByID(qna.id!!))!!, qna);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("qna/delete", { id }).send();
    qnas.value.splice(qnas.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { qna }: { qna: Qna } = await remote.post("qna/create", toRaw(toCreate.value)!!).unwrap().send();
    qnas.value.push(qna);
}

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

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW QNA</Button>

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