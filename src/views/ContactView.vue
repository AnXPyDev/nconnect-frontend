<script setup lang="ts">

import PageHeader from '@/components/ui/PageHeader.vue';
import ContactSection from '@/components/ui/ContactSection.vue';

</script>

<template>

    <PageHeader location="KONTAKT"></PageHeader>
    <ContactSection class="contact-section"></ContactSection>

</template>

<style scoped lang="scss">

.contact-section {
    background-color: var(--clr-bg-1);
}

</style>