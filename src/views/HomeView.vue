<script setup lang="ts">
import Schedule from '@/components/client/schedule/ScheduleTable.vue';
import SpeakersList from '@/components/client/speaker/SpeakersList.vue';
import SponsorsList from '@/components/client/sponsor/SponsorsList.vue';
import TestimonialsSection from '@/components/client/testimonials/TestimonialsSection.vue';
import AboutSection from '@/components/ui/AboutSection.vue';
import PageSectionHeader from '@/components/ui/PageSectionHeader.vue';
import WelcomePresentation from '@/components/ui/presentation/WelcomePresentation.vue';
import Spinner from '@/components/util/Spinner.vue';
import type { Speaker, Sponsor } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { useState } from '@/stores/state';
import { ref } from 'vue';

const speakers = ref<Speaker[]>([]);
const loadingSpeakers = ref<boolean>(false);

remote.post("speaker/index").then((res: Response<{ speakers: Speaker[] }>) => {
    res.speakers.splice(4);
    speakers.value = res.speakers;
    loadingSpeakers.value = false;
}).send();

const sponsors = ref<Sponsor[]>([]);
const loadingSponsors = ref<boolean>(false);

remote.post("sponsor/index").then((res: Response<{ sponsors: Sponsor[] }>) => {
    res.sponsors.splice(4);
    sponsors.value = res.sponsors;
    loadingSponsors.value = false;
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
        <div class="section content-container">
            <div class="content">
                <PageSectionHeader class="section-header">NAŠI PARTNERI</PageSectionHeader>
                <Spinner v-if="loadingSponsors"></Spinner>
                <SponsorsList :sponsors="sponsors"></SponsorsList>
            </div>
        </div>
    </div>
    <TestimonialsSection/>


</template>

<style scoped lang="scss">
@use '@/styles/lib/media';
@use '@/styles/lib/dimens';

.section {

    .section-header {
        padding-block: 1em;
        color: var(--clr-primary);
    }

    &:nth-child(odd) {
        background-color: var(--clr-bg-alt);
    }

    padding-block: dimens.$section-padding;

    @include media.phone {
        padding-block: 1em;
    }
}
</style>