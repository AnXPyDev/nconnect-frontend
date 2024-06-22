<script setup lang="ts">

import Login from '@/components/ui/Login.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import Button from '@/components/util/Button.vue';
import { loginAdmin, registerUser } from '@/lib/remote/Auth';
import { ApiCodes } from '@/lib/remote/Codes';
import { RequestFailedError, ResponseHandler, type Response } from '@/lib/remote/RequestBuilder';
import router from '@/Router';
import Input from '@/components/util/input/Input.vue';
import { ref } from 'vue';
import Spinner from '@/components/util/Spinner.vue';
import remote from '@/lib/remote/Remote';
import type { User } from '@/lib/remote/Models';

const loading = ref(false);
const name = ref<string>("");
const email = ref<string>("");

async function confirm() {
    loading.value = true;
    await registerUser({ name: name.value, email: email.value });
    loading.value = false;
    router.push({ name: "user" });
}

</script>

<template>
    <div class="content-container">
        <div class="content">
            <PageSectionHeader class="section-header">REGISTRÁCIA</PageSectionHeader>

            <Input v-model="name">Meno</Input>
            <Input v-model="email">E-Mail</Input>
            <Button @click="confirm">REGISTER</Button>
            <Spinner v-if="loading"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

.section-header {
    color: var(--clr-primary);
    padding-block: 1em;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

</style>