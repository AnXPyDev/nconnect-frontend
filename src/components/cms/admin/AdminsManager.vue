<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { AdminPriv, type Admin, type WithID } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import AdminHolder from './AdminHolder.vue';
import Button from '@/components/util/Button.vue';
import AdminEditor from './AdminEditor.vue';
import { toRaw } from 'vue';
import { deleteEntity, predicateByID, pushEntity, withEntity } from '@/lib/util/Snippets';
import { ValidationError, throwValidation } from '@/lib/cms/Editor';
import { EmptyAdmin } from '@/lib/remote/Generators';


const admins = ref<WithID<Admin>[]>([]);
const loading = ref<boolean>(true);

remote.post("auth/admin/index").then((res: Response<{ admins: WithID<Admin>[]}>) => {
    admins.value = res.admins;
    loading.value = false;
}).send();

const toCreate = ref<Admin>();
const toEdit = ref<Admin>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = EmptyAdmin();
}

function edit(admin: Admin) {
    reset();
    toEdit.value = structuredClone(toRaw(admin));
}

async function confirm() {
    const { admin }: { admin: WithID<Admin> } = await remote.post("auth/admin/register", toRaw(toCreate.value)).fail(throwValidation).send();

    pushEntity(admins, admin);
}

async function confirmEdit() {
    const id = toEdit.value!!.id!!;
    const priv = toEdit.value!!.priv;

    await remote.post("auth/admin/setpriv", { id, priv }).fail(throwValidation).send();

    withEntity(admins, id, (admin) => {
        admin.priv = priv;
    });
}

async function confirmDelete() {
    const id = toEdit.value!!.id!!;

    await remote.post("auth/admin/delete", { id }).fail(throwValidation).send();

    deleteEntity(admins, id);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="items">
                <AdminHolder v-for="admin in admins" :admin="admin" :key="admin.id" @edit="edit(admin)"/>
            </div>

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; REGISTER ADMIN</Button>
        </template>
        
        <AdminEditor v-if="toCreate" v-model="toCreate" v-bind="{ confirm }" @done="reset">Register Admin</AdminEditor>
        <AdminEditor v-if="toEdit" v-model="toEdit" v-bind="{ confirm: confirmEdit, delete_: confirmDelete }" @done="reset" priv-only>Edit Admin {{ toEdit.username }}</AdminEditor>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>