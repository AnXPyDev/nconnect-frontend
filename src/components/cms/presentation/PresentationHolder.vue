<script setup lang="ts">

import { type Presentation } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';

const props = defineProps<{
    presentation: Presentation
}>();

defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

</script>

<template>
    <div class="presentation">
        <div class="header">
            <span class="id">[{{ presentation.id }}]</span>
            <span class="name">{{ presentation.name }}</span>

            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>
            <i v-if="presentation.image_id" @click="showImage = !showImage" class="icon-button fa-solid fa-image"></i>
        </div>

        <div class="details">
            <img v-if="showImage" :src="getResourceURL(presentation.image_id!!)"/>
            <div v-if="presentation.description" class="description">{{ presentation.description }}</div>
            <div v-if="presentation.long_description" class="description">{{ presentation.long_description }}</div>
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