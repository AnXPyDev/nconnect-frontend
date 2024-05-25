<script setup lang="ts">

import remote from '@/lib/ApiRemote';
import { type Speaker } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';
import SpeakerEditor from './SpeakerEditor.vue';
import StagesManager from './StagesManager.vue';
import SpeakerHolder from './Speaker.vue';

const speakers = ref<Speaker[]>([]);

remote.post("speaker/index").then((response: { speakers: Speaker[] }) => {
    speakers.value = response.speakers;
}).send();

const toCreate = ref<Speaker>();
const toEdit = ref<Speaker>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    cancel();
    toCreate.value = { 
        name: "",
        description: ""
    };
}

function edit(speaker: Speaker) {
    cancel();
    toEdit.value = Object.assign({}, speaker);
}

function editConfirm() {
    const speaker = toRaw(toEdit.value)!!;

    console.log(speaker);
    cancel();
    remote.post("speaker/edit", speaker).then((res: { speaker: Speaker }) => {
        Object.assign(speakers.value.find((s) => s.id == res.speaker.id)!!, res.speaker);
    }).send();
}

function editDelete() {
    const speaker = toRaw(toEdit.value)!!;
    cancel();
    remote.post("speaker/delete", speaker).then((res) => {
        speakers.value.splice(speakers.value.findIndex((s) => s.id == speaker.id), 1)
    }).send();
}

function createConfirm() {
    const speaker = toRaw(toCreate.value)!!;
    cancel();
    remote.post("speaker/create", speaker).then((res: { speaker: Speaker }) => {
        speakers.value.push(res.speaker);
    }).send();
}

</script>

<template>
    <h2>speakers</h2>
    <SpeakerHolder v-for="speaker in speakers" :speaker="speaker" :key="speaker.id" @edit="edit(speaker)"/>
    <button @click="create">create</button>
    <SpeakerEditor v-if="toEdit" v-model:speaker="toEdit" allow-delete @done="editConfirm" @delete="editDelete" @cancel="cancel"></SpeakerEditor>
    <SpeakerEditor v-if="toCreate" v-model:speaker="toCreate" allow-delete @done="createConfirm" @cancel="cancel"></SpeakerEditor>
</template>