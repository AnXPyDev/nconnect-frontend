<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { type User } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import UserHolder from './UserHolder.vue';
import Button from '@/components/util/Button.vue';


const users = ref<User[]>([]);
const loading = ref<boolean>(true);

remote.post("user/index").then((res: Response<{ users: User[]}>) => {
    users.value = res.users;
    loading.value = false;
}).send();

function create() {

}

</script>

<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>

        <template v-else>
            <div class="items">
                <UserHolder v-for="user in users" :user="user" :key="user.id"/>
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