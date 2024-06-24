<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Speaker, type WithID } from '@/lib/remote/Models';
import SpeakerEditor from './SpeakerEditor.vue';
import SpeakerHolder from './SpeakerHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { copyEntity, deleteEntity, ensureObjects, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { EmptySpeaker } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const speakers = ref<WithID<Speaker>[]>([]);

const loading = ref<boolean>(true);

const ensure = ensureObjects<WithID<Speaker>>("contact");

remote.post("speaker/index").then((response: Response<{ speakers: WithID<Speaker>[] }>) => {
    speakers.value = response.speakers.map(ensure);
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
    toCreate.value = EmptySpeaker();
}

function edit(speaker: Speaker) {
    reset();
    toEdit.value = copyEntity(speaker);
}

async function editConfirm() {
    const { speaker }: { speaker: WithID<Speaker> } = await remote.post("speaker/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    ensure(speaker);
    replaceEntity(speakers, speaker);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("speaker/delete", { id }).fail(throwValidation).send();
    deleteEntity(speakers, id);
}

async function createConfirm() {
    const { speaker }: { speaker: WithID<Speaker> } = await remote.post("speaker/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    ensure(speaker);
    pushEntity(speakers, speaker);
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
                <SpeakerHolder v-for="speaker in speakers" :speaker="speaker" :key="speaker.id" @edit="edit(speaker)"/>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW SPEAKER</Button>

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