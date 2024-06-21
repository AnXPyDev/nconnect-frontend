<script setup lang="ts">

import { ref } from 'vue';
import { type Page } from '@/lib/remote/Models';

const props = defineProps<{
    page: Page
}>();

const emit = defineEmits<{
    edit: [],
    editContent: [],
    show: [],
}>();

const showImage = ref<boolean>(false);

</script>

<template>

    <div class="page">
        <div class="header">
            <span class="id">[{{ page.id }}]</span>
            <span class="name">{{ page.name }}</span>
            <span class="slug">page/{{ page.metadata.slug }}</span>
            
            <i @click="emit('edit')" class="icon-button fa-solid fa-pen"></i>
            <i @click="emit('editContent')" class="icon-button fa-solid fa-file-pen"></i>
            <i @click="emit('show')" class="icon-button fa-solid fa-eye"></i>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.page {
    @include mixins.cmspanel;
    @include mixins.cmsitem;

    > .header {
        > .slug {
            font-style: italic;
        }
    }
}

</style>
