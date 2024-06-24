<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import {  AdminPriv, type Organizer, type WithID } from '@/lib/remote/Models';
import OrganizerEditor from './OrganizerEditor.vue';
import OrganizerHolder from './OrganizerHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { copyEntity, deleteEntity, ensureObjects, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { EmptyOrganizer } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const organizers = ref<WithID<Organizer>[]>([]);

const loading = ref<boolean>(true);

const ensure = ensureObjects<WithID<Organizer>>("contact");

remote.post("organizer/index").then((response: Response<{ organizers: WithID<Organizer>[] }>) => {
    organizers.value = response.organizers.map(ensure);
    loading.value = false;
}).send();

const toCreate = ref<Organizer>();
const toEdit = ref<Organizer>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = EmptyOrganizer();
}

function edit(organizer: Organizer) {
    reset();
    toEdit.value = copyEntity(organizer);
}

async function editConfirm() {
    const { organizer }: { organizer: WithID<Organizer> } = await remote.post("organizer/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    ensure(organizer);
    replaceEntity(organizers, organizer);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("organizer/delete", { id }).fail(throwValidation).send();
    deleteEntity(organizers, id);
}

async function createConfirm() {
    const { organizer }: { organizer: Organizer } = await remote.post("organizer/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    ensure(organizer);
    pushEntity(organizers, organizer);
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
                <OrganizerHolder v-for="organizer in organizers" :organizer="organizer" :key="organizer.id" @edit="edit(organizer)"/>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW ORGANIZER</Button>

            <OrganizerEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit organizer [{{ toEdit.id }}]
            </OrganizerEditor>
            <OrganizerEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create organizer
            </OrganizerEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>