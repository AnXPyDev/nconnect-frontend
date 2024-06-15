<script setup lang="ts">

import Login from '@/components/ui/Login.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import Button from '@/components/util/Button.vue';
import { loginAdmin } from '@/lib/remote/Auth';
import router from '@/router';

function validate(username: string, password: string) {

}

async function confirm(username: string, password: string) {
    await loginAdmin({ username, password });
    router.push("/admin/cms");
}

</script>

<template>
    <div class="content-container">
        <div class="content">
            <PageSectionHeader class="section-header">ADMIN PRIHLÁSENIE</PageSectionHeader>
            <Login v-bind="{ confirm, validate }"></Login>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>