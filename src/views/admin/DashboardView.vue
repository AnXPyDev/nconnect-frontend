<script setup lang="ts">
import NavigationButton from '@/components/ui/NavigationButton.vue';
import { useAuth } from '@/stores/auth';
import AdminAuth from '@/components/admin/AdminAuth.vue';

const auth = useAuth();

</script>


<template>
    <div class="content-container header">
        <div class="content">
            <div class="header">
                <div v-if="auth.isAdmin()" class="nav">
                    <NavigationButton to="/admin/cms">CONTENT</NavigationButton>
                    <NavigationButton to="/admin/users">USERS</NavigationButton>
                    <NavigationButton to="/admin/stats">STATS</NavigationButton>
                    <NavigationButton to="/admin/account">ACCOUNT</NavigationButton>
                </div>
                <div></div>
                <AdminAuth></AdminAuth>
            </div>
        </div>
    </div>
    <RouterView></RouterView>
</template>

<style scoped lang="scss">

@use '@/styles/lib/media';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;

    @include media.phone {
        flex-direction: column-reverse;
    }

    .nav {
        display: flex;
        padding-block: 0.5em;

        @include media.phone {
            padding: 0;
        }
    }
}


</style>