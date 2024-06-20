<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/util/Button.vue';
import Spinner from '@/components/util/Spinner.vue';
import Error from '@/components/util/Error.vue';

type Output<T> = (username: string, password: string) => T;

const props = withDefaults(defineProps<{
    usernameField?: string
    confirmationText?: string
    confirm: Output<ConfirmationResult>
    validate: Output<ValidationResult>
}>(), {
    usernameField: "Username",
    confirmationText: "LOGIN"
});

const username = ref<string>("");
const password = ref<string>("");

const loading = ref<boolean>(false);
const error = ref<string>();

function handleValidationResult(result: ValidationResult): boolean {
    if (result !== true && result !== undefined) {
        if (typeof(result) === "string") {
            error.value = result;
        } else {
            console.error(result);
            error.value = "Unknown error";
        }

        return false;
    }
    return true;
}

async function confirm() {
    if (!handleValidationResult(props.validate(username.value, password.value))) {
        return;
    }

    loading.value = true;
    let result = await props.confirm(username.value, password.value);
    loading.value = false;

    if (!handleValidationResult(result)) {
        return; 
    }
}

</script>

<template>
    <div class="login">
        <div class="input">
            <div class="label">{{ usernameField }}</div>
            <input v-model="username">
        </div>
        <div class="input">
            <div class="label">Password</div>
            <input type="password" v-model="password">
        </div>

        <Button @click="confirm" :enabled="!loading"><i class="fa-solid fa-check"></i>&nbsp; LOGIN</Button>
        <Error :error="error"></Error>
        <Spinner v-if="loading"></Spinner>
    </div>
</template>

<style scoped lang="scss">

.login {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: start;

    > .input {
        display: flex;
        align-items: center;
        
        > .label {
            width: 6em;
        }
    }
}


</style>