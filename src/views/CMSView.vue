<script setup lang="ts">

import GalleriesManager from '@/components/cms/GalleriesManager.vue';
import ImageResourcesManager from '@/components/cms/ImageResourcesManager.vue';
import SpeakersManager from '@/components/cms/SpeakersManager.vue';
import StagesManager from '@/components/cms/StagesManager.vue';
import TestimonialsManager from '@/components/cms/TestimonialsManager.vue';

</script>

<template>
    <h1>CMS</h1>

    <RouterLink to="/">HOME</RouterLink>

    <ImageResourcesManager/>

    <GalleriesManager />

    <SpeakersManager></SpeakersManager>
    <StagesManager></StagesManager>

    <TestimonialsManager></TestimonialsManager>

</template>