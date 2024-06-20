<script setup lang="ts">

import { ref } from 'vue';
import { type Conference } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';

import ContactHolder from '@/components/cms/contact/ContactHolder.vue';

const props = defineProps<{
    conference: Conference
}>();

</script>

<template>

    <div class="conference">
        <div class="header">
            <span class="name">Conference Singleton</span>
        </div>

        <div class="details">
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.conference {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>