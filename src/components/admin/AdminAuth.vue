<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import Button from '@/components/util/Button.vue';
import router from '@/Router';
import { logoutAdmin } from '@/lib/remote/Auth';
import type { Admin } from '@/lib/remote/Models';

const auth = useAuth();

function login() {
    router.push({ name: "admin/login" });
}

function logout() {
    logoutAdmin();
}

</script>


<template>
    <div class="admin-auth">
        <template v-if="auth.isAdmin()">
            <div>
                <i class="fa-solid fa-user-tie"></i>&nbsp;
                {{ auth.admin!!.username }}
            </div>
            <Button @click="logout"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; LOGOUT</Button>
        </template>
        <template v-else>
            <Button @click="login"><i class="fa-solid fa-right-to-bracket"></i>&nbsp; LOGIN</Button>
        </template>
    </div>
</template>

<style scoped lang="scss">

.admin-auth {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

</style>


