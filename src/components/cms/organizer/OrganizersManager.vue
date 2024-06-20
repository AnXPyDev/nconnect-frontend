<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Organizer } from '@/lib/remote/Models';
import OrganizerEditor from './OrganizerEditor.vue';
import OrganizerHolder from './OrganizerHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';

const organizers = ref<Organizer[]>([]);

const loading = ref<boolean>(true);

remote.post("organizer/index").then((response: Response<{ organizers: Organizer[] }>) => {
    organizers.value = response.organizers;
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
    toCreate.value = { 
        name: "",
        role: "",
        contact: {}
    };
}

function edit(organizer: Organizer) {
    reset();
    toEdit.value = structuredClone(toRaw(organizer));
}

async function editConfirm() {
    const { organizer }: { organizer: Organizer } = await remote.post("organizer/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(organizers.value.find(predicateByID(organizer.id!!))!!, organizer);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("organizer/delete", { id }).send();
    organizers.value.splice(organizers.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { organizer }: { organizer: Organizer } = await remote.post("organizer/create", toRaw(toCreate.value)!!).unwrap().send();
    organizers.value.push(organizer);
}

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

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW ORGANIZER</Button>

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