<script setup lang="ts">
import { AdminPriv } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import { useAuth } from '@/stores/auth';
import Section from '@/components/cms/util/Section.vue';
import AdminsManager from '@/components/cms/admin/AdminsManager.vue';

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
    </div>
</template>

<style scoped lang="scss">
.users-view {
    > .content-container {
        padding-block: 1em;
        &:nth-child(odd) {
            background-color: var(--clr-bg-1);
        }
    }
}
</style>