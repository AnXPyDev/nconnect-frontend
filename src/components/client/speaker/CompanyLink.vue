<script setup lang="ts">

import { type Company, type SpeakerMetadata } from '@/lib/remote/Models';
import Link from '@/components/ui/misc/Link.vue';

const props = defineProps<{
    company?: Company
}>();

</script>

<template>

<Link v-if="company" :href="company.link">{{ company.name }}</Link>

</template>