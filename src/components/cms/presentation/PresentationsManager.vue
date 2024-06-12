<script setup lang="ts">

import remote from '@/lib/remote/Remote';
import { type Presentation } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import PresentationHolder from './PresentationHolder.vue';
import PresentationEditor from './PresentationEditor.vue';
import Button from '@/components/util/Button.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';

const props = defineProps<{
    speaker_id: number
}>();


const presentations = ref<Presentation[]>([]);
const loading = ref<boolean>(true);

remote.post('speaker/presentations', { id: props.speaker_id }).then((res: Response<{ presentations: Presentation[] }>) => {
    presentations.value = res.presentations;
    loading.value = false;
}).send();

const toCreate = ref<Presentation>();
const toEdit = ref<Presentation>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function edit(presentation: Presentation) {
    reset();
    toEdit.value = Object.assign({}, presentation);
}

function create() {
    reset();
    toCreate.value = {
        name: "",
        speaker_id: props.speaker_id,
        description: "",
        long_description: ""
    };
}

async function createConfirm() {
    const { presentation }: { presentation: Presentation } = await remote.post("presentation/create", toRaw(toCreate.value)!!).unwrap().send();
    presentations.value.push(presentation);
}

async function editConfirm() {
    const { presentation }: { presentation: Presentation } = await remote.post("presentation/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(presentations.value.find(predicateByID(presentation.id!!))!!, presentation);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("presentation/delete", { id }).send();
    presentations.value.splice(presentations.value.findIndex(predicateByID(id)), 1)
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <PresentationHolder v-for="p in presentations" :key="p.id" :presentation="p" @edit="edit(p)"/>
            </div>
            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW PRESENTATION</Button>
            <PresentationEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset" >
                Create Presentation
            </PresentationEditor>
            <PresentationEditor v-if="toEdit" v-model="toEdit" allow-delete :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit Presentation [{{ toEdit.id }}]
            </PresentationEditor>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>