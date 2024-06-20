<script setup lang="ts">
import Spinner from '@/components/util/Spinner.vue';
import { type Admin } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';
import AdminHolder from './AdminHolder.vue';
import Button from '@/components/util/Button.vue';


const admins = ref<Admin[]>([]);
const loading = ref<boolean>(true);

remote.post("auth/admin/index").then((res: Response<{ admins: Admin[]}>) => {
    admins.value = res.admins;
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
                <AdminHolder v-for="admin in admins" :admin="admin" :key="admin.id"/>
            </div>

            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; REGISTER ADMIN</Button>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>