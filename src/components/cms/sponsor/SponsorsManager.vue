<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Sponsor } from '@/lib/remote/Models';
import SponsorEditor from './SponsorEditor.vue';
import SponsorHolder from './SponsorHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { predicateByID } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';

const sponsors = ref<Sponsor[]>([]);

const loading = ref<boolean>(true);

remote.post("sponsor/index").then((response: Response<{ sponsors: Sponsor[] }>) => {
    sponsors.value = response.sponsors;
    loading.value = false;
}).send();

const toCreate = ref<Sponsor>();
const toEdit = ref<Sponsor>();

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

function edit(sponsor: Sponsor) {
    reset();
    toEdit.value = Object.assign({}, sponsor);
}

async function editConfirm() {
    const { sponsor }: { sponsor: Sponsor } = await remote.post("sponsor/edit", toRaw(toEdit.value)!!).unwrap().send();
    Object.assign(sponsors.value.find(predicateByID(sponsor.id!!))!!, sponsor);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("sponsor/delete", { id }).send();
    sponsors.value.splice(sponsors.value.findIndex(predicateByID(id)), 1);
}

async function createConfirm() {
    const { sponsor }: { sponsor: Sponsor } = await remote.post("sponsor/create", toRaw(toCreate.value)!!).unwrap().send();
    sponsors.value.push(sponsor);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="items">
                <SponsorHolder v-for="sponsor in sponsors" :sponsor="sponsor" :key="sponsor.id" @edit="edit(sponsor)"/>
            </div>

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW SPONSOR</Button>

            <SponsorEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit sponsor [{{ toEdit.id }}]
            </SponsorEditor>
            <SponsorEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create sponsor
            </SponsorEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>