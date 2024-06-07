<script setup lang="ts">

import GalleriesManager from '@/components/cms/GalleriesManager.vue';
import ImageResourcesManager from '@/components/cms/ImageResourcesManager.vue';
import Section from '@/components/cms/Section.vue';
import SpeakersManager from '@/components/cms/SpeakersManager.vue';
import StagesManager from '@/components/cms/StagesManager.vue';
import TestimonialsManager from '@/components/cms/TestimonialsManager.vue';

</script>

<template>
    <div class="sections-container">
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Images</template>
                <ImageResourcesManager/>
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Galleries</template>
                <GalleriesManager />
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
                <template v-slot:title>Testimonials</template>
                <TestimonialsManager />
            </Section>
        </div>
        <div class="section content-container">
            <Section class="content">
                <template v-slot:title>Sponsors</template>
                <h2>sponsors</h2>
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

            > .content {

                > .title {
                }

            }
        }
    }
</style>