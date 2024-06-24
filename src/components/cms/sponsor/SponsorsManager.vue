<script setup lang="ts">

import { ref, toRaw } from 'vue';
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Sponsor, type WithID } from '@/lib/remote/Models';
import SponsorEditor from './SponsorEditor.vue';
import SponsorHolder from './SponsorHolder.vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import { copyEntity, deleteEntity, ensureObjects, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import type { Response } from '@/lib/remote/RequestBuilder';
import { EmptySponsor } from '@/lib/remote/Generators';
import { throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';

const sponsors = ref<WithID<Sponsor>[]>([]);

const loading = ref<boolean>(true);

const ensure = ensureObjects<WithID<Sponsor>>("contact");

remote.post("sponsor/index").then((response: Response<{ sponsors: WithID<Sponsor>[] }>) => {
    sponsors.value = response.sponsors.map(ensure);
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
    toCreate.value = EmptySponsor();
}

function edit(sponsor: Sponsor) {
    reset();
    toEdit.value = copyEntity(sponsor);
}

async function editConfirm() {
    const { sponsor }: { sponsor: WithID<Sponsor> } = await remote.post("sponsor/edit", toRaw(toEdit.value)!!).fail(throwValidation).send();
    ensure(sponsor);
    replaceEntity(sponsors, sponsor);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("sponsor/delete", { id }).fail(throwValidation).send();
    deleteEntity(sponsors, id);
}

async function createConfirm() {
    const { sponsor }: { sponsor: Sponsor } = await remote.post("sponsor/create", toRaw(toCreate.value)!!).fail(throwValidation).send();
    ensure(sponsor);
    pushEntity(sponsors, sponsor);
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
                <SponsorHolder v-for="sponsor in sponsors" :sponsor="sponsor" :key="sponsor.id" @edit="edit(sponsor)"/>
            </div>

            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW SPONSOR</Button>

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