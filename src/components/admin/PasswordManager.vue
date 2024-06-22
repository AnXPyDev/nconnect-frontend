<script setup lang="ts">

import InputPassword from '@/components/util/input/InputPassword.vue';
import { ref } from 'vue';
import Spinner from '@/components/util/Spinner.vue';
import Button from '@/components/util/Button.vue';
import remote from '@/lib/remote/Remote';
import { dropAuth } from '@/lib/remote/Auth';
import router from '@/Router';

const password1 = ref<string>("");
const password2 = ref<string>("");
const loading = ref(false);
const error = ref<string>();

async function confirm() {
    if (password1.value != password2.value) {
        error.value = "Passwords do not match";
        return;
    }

    loading.value = true;

    await remote.post("auth/admin/changepassword", { password: password1.value }).then((res) => {
        dropAuth();
        router.push({ name: "admin/login" });
    }).fail((res) => {
        error.value = res.message;
    }).send();

    loading.value = false;
}

</script>

<template>

<div class="password-manager">
    <InputPassword v-model="password1">New Password</InputPassword>
    <InputPassword v-model="password2">Repeat Password</InputPassword>
    <Button @click="confirm">CONFIRM</Button>
    <Spinner v-if="loading"></Spinner>
    <span v-if="error" class="error"><i class="fa-solid fa-circle-exclamation"></i>&nbsp; {{ error }}</span>
</div>

</template>

<style scoped lang="scss">
.password-manager {
    display: flex;
    flex-direction: column;
    align-items: start;
}    
</style>