<script setup lang="ts">
import { RouterView } from 'vue-router';
import remote from './lib/remote/Remote';
import { useAuth } from './stores/auth';
import { ref } from 'vue';
import InfoBar from '@/components/ui/InfoBar.vue';
import Header from '@/components/ui/Header.vue';
import Footer from '@/components/ui/Footer.vue';
import FooterBar from './components/ui/FooterBar.vue';
import ConfirmDialog from './components/util/ConfirmDialog.vue';

</script>

<template>
    <div class="fullscreen">
        <div class="top">
            <InfoBar />
            <Header />
            <RouterView></RouterView>
        </div>
        <div class="bottom">
            <Footer />
            <FooterBar />
        </div>
    </div>

    <!-- services -->
</template>

<style lang="scss" scoped>

.fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;

    > .top {
        padding-bottom: 4rem;
    }

}

</style>