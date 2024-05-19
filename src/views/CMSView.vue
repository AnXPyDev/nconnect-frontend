<script setup lang="ts">

import SpeakersManager from '@/components/cms/SpeakersManager.vue';
import StagesManager from '@/components/cms/StagesManager.vue';

</script>

<template>
    <h1>CMS</h1>

    <RouterLink to="/">HOME</RouterLink>

    <SpeakersManager></SpeakersManager>
    <StagesManager></StagesManager>

</template>