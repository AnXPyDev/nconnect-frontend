<script setup lang="ts">
import type { Gallery, Resource } from '@/lib/Bridge';
import { ref } from 'vue';
import GalleryHolder from './Gallery.vue';
import Spinner from '../util/Spinner.vue';
import remote from '@/lib/ApiRemote';

const resource_id = defineModel<number | undefined>();

const loading = ref<boolean>(true);

const emit = defineEmits<{
    select: [Resource]
}>();

const galleries = ref<Gallery[]>([]);

remote.post("gallery/index").then((response: { galleries: Gallery[] }) => {
    galleries.value = response.galleries;
    loading.value = false;
}).send();

</script>

<template>

<div class="image-browser">
    <template v-if="loading">
        <Spinner></Spinner>
    </template>
    <template v-else>
        <div class="items">
            <GalleryHolder v-for="g in galleries" picker :gallery="g" @select="(r) => emit('select', r)"/>
        </div>
    </template>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.image-browser {
    @include mixins.cmsmanager;
}
</style>