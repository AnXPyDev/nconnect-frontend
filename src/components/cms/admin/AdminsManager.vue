<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { AdminPriv, type Admin } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import AdminHolder from './AdminHolder.vue';
import Button from '@/components/util/Button.vue';
import AdminEditor from './AdminEditor.vue';
import { toRaw } from 'vue';


const admins = ref<Admin[]>([]);
const loading = ref<boolean>(true);

remote.post("auth/admin/index").then((res: Response<{ admins: Admin[]}>) => {
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
    toCreate.value = {
        priv: AdminPriv.VIEW,
        username: "",
        password: ""
    };
}

function edit(admin: Admin) {
    toEdit.value = structuredClone(admin);
}

async function confirm() {
    const { admin }: { admin: Admin } = await remote.post("auth/admin/register", toRaw(toCreate.value)).send();
    admins.value.push(admin);
}

async function confirmEdit() {

}

async function confirmDelete() {

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
        <AdminEditor v-if="toEdit" v-model="toEdit" v-bind="{ confirm: confirmEdit, delete_: confirmDelete }" @done="reset">Edit Admin {{ toEdit.username }}</AdminEditor>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>