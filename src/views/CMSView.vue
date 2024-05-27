<script setup lang="ts">

import ImageResourcesManager from '@/components/cms/ImageResourcesManager.vue';
import SpeakersManager from '@/components/cms/SpeakersManager.vue';
import StagesManager from '@/components/cms/StagesManager.vue';
import TestimonialsManager from '@/components/cms/TestimonialsManager.vue';

</script>

<template>
    <h1>CMS</h1>

    <RouterLink to="/">HOME</RouterLink>

    <ImageResourcesManager/>

    <SpeakersManager></SpeakersManager>
    <StagesManager></StagesManager>

    <TestimonialsManager></TestimonialsManager>

</template>