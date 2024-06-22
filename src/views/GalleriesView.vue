<script setup lang="ts">
import GalleryList from '@/components/client/gallery/GalleryList.vue';
import Schedule from '@/components/client/schedule/ScheduleTable.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import Spinner from '@/components/util/Spinner.vue';
import { type Gallery } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';

const loading = ref(true);
const galleries = ref<Gallery[]>([]);

remote.post("gallery/publicindex").then((res: Response<{ galleries: Gallery[] }>) => {
    galleries.value = res.galleries;
    loading.value = false;
}).send();

</script>

<template>
    <PageHeader location="FOTOGALÉRIA"></PageHeader>

    <div class="content-container">
        <div class="content">
            <Spinner v-if="loading"/>
            <GalleryList v-else :galleries="galleries"/>
        </div>
    </div>

</template>

<style scoped lang="scss">

.content {
    padding-block: 4em;
    display: flex;
    flex-direction: column;
}

</style>