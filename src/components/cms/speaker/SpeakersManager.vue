<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Speaker } from '@/lib/remote/Models';
import SpeakerEditor from './SpeakerEditor.vue';
import SpeakerHolder from './SpeakerHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';

const speakers = ref<Speaker[]>([]);

const loading = ref<boolean>(true);

remote.post("speaker/index").then((response: Response<{ speakers: Speaker[] }>) => {
    speakers.value = response.speakers;
    loading.value = false;
}).send();

const toCreate = ref<Speaker>();
const toEdit = ref<Speaker>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = { 
        name: "",
        description: "",
        contact: {}
    };
}

function edit(speaker: Speaker) {
    reset();
    toEdit.value = Object.assign({}, speaker);
}

async function editConfirm() {
    const { speaker }: { speaker: Speaker } = await remote.post("speaker/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(speakers.value.find(predicateByID(speaker.id!!))!!, speaker);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("speaker/delete", { id }).send();
    speakers.value.splice(speakers.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { speaker }: { speaker: Speaker } = await remote.post("speaker/create", toRaw(toCreate.value)!!).unwrap().send();
    speakers.value.push(speaker);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="items">
                <SpeakerHolder v-for="speaker in speakers" :speaker="speaker" :key="speaker.id" @edit="edit(speaker)"/>
            </div>

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW SPEAKER</Button>

            <SpeakerEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit Speaker [{{ toEdit.id }}]
            </SpeakerEditor>
            <SpeakerEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create Speaker
            </SpeakerEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>