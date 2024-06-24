<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { type User, type WithID } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import UserHolder from './UserHolder.vue';
import { deleteEntity } from '@/lib/util/Snippets';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue';

const users = ref<WithID<User>[]>([]);
const loading = ref<boolean>(true);

remote.post("user/index").then((res: Response<{ users: WithID<User>[]}>) => {
    users.value = res.users;
    loading.value = false;
}).send();

let target: WithID<User>;

async function unregister(user: WithID<User>) {
    showDialog.value = false;
    const id = user.id;
    await remote.post("user/adminunregister", { id }).failMessage().send();
    deleteEntity(users, id);
}

const showDialog = ref(false);
function askUnregister(user: WithID<User>) {
    target = user;
    showDialog.value = true;
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="total">
                User Count: {{ users.length }}
            </div>
            <div class="items">
                <UserHolder v-for="user in users" :user="user" :key="user.id" @unregister="askUnregister(user)"/>
            </div>
        </template>
        <ConfirmDialog v-if="showDialog" @no="showDialog=false" @yes="unregister(target)">
            Are you sure you want to unregister this user?
        </ConfirmDialog>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>