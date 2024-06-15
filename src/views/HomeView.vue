<script setup lang="ts">
import Schedule from '@/components/client/schedule/ScheduleTable.vue';
import SpeakersList from '@/components/client/speaker/SpeakersList.vue';
import TestimonialsList from '@/components/client/testimonials/TestimonialsList.vue';
import AboutSection from '@/components/ui/AboutSection.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import WelcomePresentation from '@/components/ui/presentation/WelcomePresentation.vue';
import Spinner from '@/components/util/Spinner.vue';
import type { Speaker } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';

const speakers = ref<Speaker[]>([]);
const loadingSpeakers = ref<boolean>(false);

remote.post("speaker/index").then((res: Response<{ speakers: Speaker[] }>) => {
    res.speakers.splice(4);
    speakers.value = res.speakers;
    loadingSpeakers.value = false;
}).send();

</script>

<template>

    <WelcomePresentation></WelcomePresentation>
    <div class="sections">
        <div class="section content-container">
            <div class="content">
                <AboutSection></AboutSection>
            </div>
        </div>
        <div class="section content-container">
            <div class="content">
                <PageSectionHeader class="section-header">SPEAKERS</PageSectionHeader>
                <Spinner v-if="loadingSpeakers"></Spinner>
                <SpeakersList :speakers="speakers"></SpeakersList>
            </div>
        </div>
        <div class="section content-container">
            <div class="content">
                <PageSectionHeader class="section-header">PROGRAM</PageSectionHeader>
                <Schedule></Schedule>
            </div>
        </div>
    </div>
    <TestimonialsList/>


</template>

<style scoped lang="scss">
@use '@/styles/lib/media';

.section {

    .section-header {
        color: var(--clr-primary);
    }

    &:nth-child(odd) {
        background-color: var(--clr-bg-1);
    }

    padding-block: 4em;

    @include media.phone {
        padding-block: 1em;
    }
}
</style>