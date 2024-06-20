<script setup lang="ts">
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import type { Headliner, Speaker } from '@/lib/remote/Models';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import HeadlinersList from '@/components/client/speaker/HeadlinersList.vue';
import SpeakersList from '@/components/client/speaker/SpeakersList.vue';

const loadingHeadliners = ref<boolean>(true);
const headliners = ref<Headliner[]>([]);

const headliner_ids: Promise<number[]> = remote.post("headliner/index").then((res: Response<{ headliners: Headliner[] }>) => {
    headliners.value = res.headliners;
    loadingHeadliners.value = false;
    return res.headliners.map((v) => v.speaker!!.id);
}).send();

const loadingSpeakers = ref<boolean>(true);
const speakers = ref<Speaker[]>([]);

remote.post("speaker/index").then(async (res: Response<{ speakers: Speaker[] }>) => {
    const hids = await headliner_ids;
    speakers.value = res.speakers.filter((v) => !hids.find((id) => v.id == id));
    loadingSpeakers.value = false;
}).send();

</script>

<template>
    
    <PageHeader location="SPEAKERS"></PageHeader>

    <div class="content-container">
        <div class="content">
            <PageSectionHeader class="section-header">HEADLINERI</PageSectionHeader>
            <Spinner v-if="loadingHeadliners"></Spinner>
            <HeadlinersList v-else :headliners="headliners"></HeadlinersList>
            <PageSectionHeader class="section-header">SPEAKERS</PageSectionHeader>
            <Spinner v-if="loadingSpeakers"></Spinner>
            <SpeakersList v-else :speakers="speakers"></SpeakersList>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';

.section-header {
    color: var(--clr-primary);
    margin-top: 3em;
    padding-block: 1em;
    @include media.phone {
        margin-top: 0;
    }
}

.content {
    padding-bottom: 4em;
}

</style>