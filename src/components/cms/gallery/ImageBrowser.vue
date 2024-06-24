<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import type { Gallery, ID, Image, Resource, WithID } from '@/lib/remote/Models';

import GalleryHolder from './GalleryHolder.vue';
import Spinner from '@/components/util/Spinner.vue';
import type { Response } from '@/lib/remote/RequestBuilder';
import type { Nullable } from '@/lib/util/Snippets';

const resource_id = defineModel<Nullable<ID>>();

const loading = ref<boolean>(true);

const emit = defineEmits<{
    select: [WithID<Image>]
}>();

const galleries = ref<WithID<Gallery>[]>([]);

remote.post("gallery/index").then((response: Response<{ galleries: WithID<Gallery>[] }>) => {
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