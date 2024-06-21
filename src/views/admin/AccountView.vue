<script setup lang="ts">
import { AdminPriv } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import { useAuth } from '@/stores/auth';
import Section from '@/components/cms/util/Section.vue';
import AdminsManager from '@/components/cms/admin/AdminsManager.vue';
import PasswordManager from '@/components/admin/PasswordManager.vue';

const auth = useAuth();

</script>

<template>
    <div class="account-view">
        <div class="content-container">
            <div class="content">
                <Section>
                    <template #title>Change Password</template>
                    <PasswordManager/>
                </Section>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.account-view {
    > .content-container {
        padding-block: 1em;
        &:nth-child(odd) {
            background-color: var(--clr-bg-1);
        }
    }
}
</style>