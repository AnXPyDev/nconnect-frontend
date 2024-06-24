<script setup lang="ts">

import { type Conference } from '@/lib/remote/Models';

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