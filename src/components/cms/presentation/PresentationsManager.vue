<script setup lang="ts">

import remote from '@/lib/remote/Remote';
import { AdminPriv, type Presentation, type WithID } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import PresentationHolder from './PresentationHolder.vue';
import PresentationEditor from './PresentationEditor.vue';
import Button from '@/components/util/Button.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import { EmptyPresentation } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const props = defineProps<{
    speaker_id?: number
}>();


const presentations = ref<WithID<Presentation>[]>([]);
const loading = ref<boolean>(true);

let endpoint = 'speaker/presentations';
if (!props.speaker_id) {
    endpoint = 'presentation/events';
}



remote.post(endpoint, { id: props.speaker_id }).then((res: Response<{ presentations: WithID<Presentation>[] }>) => {
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
    toEdit.value = copyEntity(presentation);
}

function create() {
    reset();
    toCreate.value = EmptyPresentation(props.speaker_id);
}

async function createConfirm() {
    const { presentation }: { presentation: WithID<Presentation> } = await remote.post("presentation/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    pushEntity(presentations, presentation)
}

async function editConfirm() {
    const { presentation }: { presentation: WithID<Presentation> } = await remote.post("presentation/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    if (presentation.speaker_id != props.speaker_id) {
        deleteEntity(presentations, presentation.id);
    } else {
        replaceEntity(presentations, presentation);
    }
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("presentation/delete", { id }).fail(throwValidation).send();
    deleteEntity(presentations, id);
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
                <PresentationHolder v-for="p in presentations" :key="p.id" :presentation="p" @edit="edit(p)"/>
            </div>
            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW PRESENTATION</Button>
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