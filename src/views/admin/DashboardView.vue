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
                <div v-if="auth.isAdmin" class="nav">
                    <NavigationButton to="/admin/cms">CONTENT</NavigationButton>
                    <NavigationButton to="/admin/users">USERS</NavigationButton>
                    <NavigationButton to="/admin/stats">STATS</NavigationButton>
                </div>
                <div></div>
                <AdminAuth></AdminAuth>
            </div>
        </div>
    </div>
    <RouterView></RouterView>
</template>

<style scoped lang="scss">

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav {
        display: flex;
        padding-block: 0.5em;
    }
}


</style>