<script setup lang="ts">

import remote from '@/lib/ApiRemote';
import { type Presentation } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';
import PresentationHolder from './Presentation.vue';
import PresentationEditor from './PresentationEditor.vue';
import Button from '../Button.vue';

const props = defineProps<{
    speaker_id: number
}>();


const presentations = ref<Presentation[]>([]);

remote.post('speaker/presentations', { id: props.speaker_id }).then((res: { presentations: Presentation[] }) => {
    presentations.value = res.presentations;
}).send();

const toCreate = ref<Presentation>();
const toEdit = ref<Presentation>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function edit(presentation: Presentation) {
    cancel();
    toEdit.value = Object.assign({}, presentation);
}

function create() {
    cancel();
    toCreate.value = {
        name: "",
        speaker_id: props.speaker_id,
        description: "",
        long_description: ""
    };
}

function createConfirm() {
    const p = toRaw(toCreate.value)!!;
    cancel();

    remote.post("presentation/create", p).then((res: { presentation: Presentation }) => {
        presentations.value.push(res.presentation);
    }).send();
}

function editConfirm() {
    const p = toRaw(toEdit.value)!!;
    cancel();

    remote.post("presentation/edit", p).then((res: { presentation: Presentation }) => {
        Object.assign(presentations.value[presentations.value.findIndex((v) => v.id == res.presentation.id)], res.presentation);
    }).send();
}

function editDelete() {
    const p = toRaw(toEdit.value)!!;
    cancel();

    remote.post("presentation/delete", p).then((res) => {
        presentations.value.splice(presentations.value.findIndex((v) => v.id == p.id), 1)
    }).send();
}

</script>

<template>
    <div class="manager">
        <div class="items">
            <PresentationHolder v-for="p in presentations" :key="p.id" :presentation="p" @edit="edit(p)"/>
        </div>
        <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW PRESENTATION</Button>
        <PresentationEditor v-if="toCreate" v-model:presentation="toCreate" @done="createConfirm" @cancel="cancel">
            Create Presentation
        </PresentationEditor>
        <PresentationEditor v-if="toEdit" v-model:presentation="toEdit" allow-delete @done="editConfirm" @cancel="cancel" @delete="editDelete">
            Edit Presentation [{{ toEdit.id }}]
        </PresentationEditor>
    </div>


</template>

<style lang="scss" scoped>
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>