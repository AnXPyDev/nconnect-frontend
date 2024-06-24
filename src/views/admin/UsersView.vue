<script setup lang="ts">
import { AdminPriv } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import { useAuth } from '@/stores/auth';
import Section from '@/components/cms/util/Section.vue';
import AdminsManager from '@/components/cms/admin/AdminsManager.vue';
import UsersManager from '@/components/cms/user/UsersManager.vue';
import PasswordManager from '@/components/admin/PasswordManager.vue';

const auth = useAuth();

</script>

<template>
    <div class="users-view">
        <div v-if="auth.checkPriv(AdminPriv.SUPER)" class="content-container">
            <div class="content">
                <Section>
                    <template #title>Admins</template>
                    <AdminsManager/>
                </Section>
            </div>
        </div>
        <div class="content-container">
            <div class="content">
                <Section>
                    <template #title>Change Password</template>
                    <PasswordManager/>
                </Section>
            </div>
        </div>
        <div class="content-container">
            <div class="content">
                <Section>
                    <template #title>Users</template>
                    <UsersManager/>
                </Section>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.users-view {
    > .content-container {
        padding-block: 1em;
        &:nth-child(odd) {
            background-color: var(--clr-bg-alt);
        }
    }
}
</style>