<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { type User, type WithID } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import UserHolder from './UserHolder.vue';
import Button from '@/components/util/Button.vue';
import { deleteEntity, predicateByID } from '@/lib/util/Snippets';
import ConfirmDialog from '@/components/util/ConfirmDialog.vue';

const props = defineProps<{
    timeslot_id: number 
}>();

const users = ref<WithID<User>[]>([]);
const loading = ref<boolean>(true);

remote.post("timeslot/users", { id: props.timeslot_id }).then((res: Response<{ users: WithID<User>[]}>) => {
    users.value = res.users;
    loading.value = false;
}).send();

async function unregister(user: WithID<User>) {
    const id = user.id;
    await remote.post("user/adminunregistertimeslot", { id, timeslot_id: props.timeslot_id }).failMessage().send();
    deleteEntity(users, id);
}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else-if="users.length == 0">
            No users registered for this presentation
        </template>

        <template v-else>
            <span>Registered Users ({{ users.length }})</span>
            <div class="items">
                <UserHolder v-for="user in users" :user="user" :key="user.id" @unregister="unregister(user)"/>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>