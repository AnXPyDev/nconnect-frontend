<script setup lang="ts">

import Login from '@/components/ui/Login.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import Button from '@/components/util/Button.vue';
import { loginAdmin } from '@/lib/remote/Auth';
import { ApiCodes } from '@/lib/remote/Codes';
import { RequestFailedError, ResponseHandler } from '@/lib/remote/RequestBuilder';
import router from '@/Router';

function validate(username: string, password: string) {

}

const handler = new ResponseHandler()
    .code(ApiCodes.WrongPass, (res) => {
        return "Wrong password"
    })
    .fail((res) => {
        return res.message;
    })
;

async function confirm(username: string, password: string) {
    try {
        await loginAdmin({ username, password });
    } catch (e) {
        if (e instanceof RequestFailedError) {
            return await handler.handle(e.response);
        }
    }
    router.push({ name: "admin/cms" });
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

.section-header {
    color: var(--clr-primary);
    padding-block: 1em;
}

</style>