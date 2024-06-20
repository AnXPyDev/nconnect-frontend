<script setup lang="ts">

import Section from '@/components/cms/util/Section.vue';
import GalleriesManager from '@/components/cms/gallery/GalleriesManager.vue';
import SpeakersManager from '@/components/cms/speaker/SpeakersManager.vue';
import StagesManager from '@/components/cms/stage/StagesManager.vue';
import TestimonialsManager from '@/components/cms/testimonial/TestimonialsManager.vue';
import HeadlinersManager from '@/components/cms/headliner/HeadlinersManager.vue';
import SponsorsManager from '@/components/cms/sponsor/SponsorsManager.vue';
import PresentationsManager from '@/components/cms/presentation/PresentationsManager.vue';
import OrganizersManager from '@/components/cms/organizer/OrganizersManager.vue';
import QnasManager from '@/components/cms/qna/QnasManager.vue';
import ConferenceManager from '@/components/cms/conference/ConferenceManager.vue';

</script>

<template>
    <div class="sections-container">
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Galleries / Images</template>
                <GalleriesManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Conference</template>
                <ConferenceManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>QnA</template>
                <QnasManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Events</template>
                <PresentationsManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Speakers / Presentations</template>
                <SpeakersManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Stages / Timeslots</template>
                <StagesManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Headliners</template>
                <HeadlinersManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Testimonials</template>
                <TestimonialsManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Sponsors</template>
                <SponsorsManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Organizers</template>
                <OrganizersManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Pages</template>
                <h2>pages</h2>
            </Section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sections-container {
        > .section {
            &:nth-child(odd) {
                background-color: var(--clr-bg-1);
            }

            padding-block: 1em;
        }
    }
</style>