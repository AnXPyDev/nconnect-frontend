<script setup lang="ts">

import { type Company } from '@/lib/remote/Models';
import { type Nullable } from '@/lib/util/Snippets';
import Link from '@/components/ui/misc/Link.vue';

const props = defineProps<{
    company: Nullable<Company>
}>();

</script>

<template>

<Link v-if="company" :href="company.link">{{ company.name }}</Link>

</template>