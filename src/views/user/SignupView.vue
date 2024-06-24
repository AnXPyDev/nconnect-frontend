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
const agree = ref<boolean>(false);
const error = ref<string>();

async function confirm() {
    error.value = undefined;

    if (name.value.length == 0) {
        error.value = "Prázdne meno!";
        return;
    }
    
    if (email.value.length == 0) {
        error.value = "Prázdny E-mail!";
        return;
    }

    if (agree.value === false) {
        error.value = "Musíte súhlasiť s podmienkami registrácie";
        return;
    }


    loading.value = true;
    try {
        await registerUser({ name: name.value, email: email.value });
    } catch (e) {
        if (e instanceof RequestFailedError) {
            error.value = await new ResponseHandler()
                .code(ApiCodes.BadInput, (res) => {
                    const msg = res.message ?? "";
                    if (/taken/.test(msg)) {
                        return "Táto mailová adresa je už zaregistrovaná!"
                    }
                    if (/valid/.test(msg)) {
                        return "Nesprávna mailová adresa!"
                    }
                    return "Neznáma chyba, skúste registráciu neskôr."
                })
                .fail((res) => res.message)
            .handle(e.response);
        } else {
            throw e;
        }
        loading.value = false;
        return;
    }

    loading.value = false;
    router.push({ name: "user" });
}

</script>

<template>
    <div class="content-container">
        <div class="content">
            <PageSectionHeader class="section-header">REGISTRÁCIA</PageSectionHeader>

            <div class="form">
                <div class="input">
                    <span class="label">
                        Meno
                    </span>
                    <input v-model="name">
                </div>
                
                <div class="input">
                    <span class="label">
                        E-Mail
                    </span>
                    <input v-model="email">
                </div>

                <div class="agreement">
                    <input type="checkbox" v-model="agree">
                    <span class="label">
                        Súhlasím s <RouterLink class="link" to="/page/privacy">pravidlami pre registráciu</RouterLink>
                    </span>
                </div>
            </div>

            <Button @click="confirm">REGISTROVAŤ SA</Button>
            <Spinner v-if="loading"/>
            <span v-if="error" class="error"><i class="fa-solid fa-circle-exclamation"></i>&nbsp; {{ error }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">


.content {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1em;

    > .section-header {
        color: var(--clr-primary);
        padding-block: 1em;
    }

    > .error {
        color: var(--clr-error);
        font-size: 1.2em;
    }

    > .form {
        display: flex;
        flex-direction: column;
        gap: 1em;

        > * {
            font-size: 1.2em;
        }

        > .input {

            > .label {
                width: 4em;
            }



            > input {
                width: 15em;
                padding: 0.5em;
            }
        }

        > .agreement {

            > input {
                margin: 0;
            }

            .link {
                &:hover {
                    text-decoration: underline;
                }
                color: var(--clr-fg-strong);
                font-style: italic;
            }
        }
    }
}

</style>