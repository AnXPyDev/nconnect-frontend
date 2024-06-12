<script setup lang="ts">

import { type Presentation } from '@/lib/remote/Models';

const props = defineProps<{
    presentation: Presentation
}>();

defineEmits<{
    edit: []
}>();

</script>

<template>
    <div class="presentation">
        <div class="header">
            <span class="id">[{{ presentation.id }}]</span>
            <span class="name">{{ presentation.name }}</span>

            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.presentation {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}
</style>