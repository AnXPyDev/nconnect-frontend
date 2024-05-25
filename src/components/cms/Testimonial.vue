<script setup lang="ts">

import { type Testimonial } from '@/lib/Bridge';

const props = defineProps<{
    testimonial: Testimonial
}>();

defineEmits<{
    edit: []
}>();

</script>

<template>
    <div @click="$emit('edit')">[{{ testimonial.id }}] {{ testimonial.author }} {{ testimonial.description }}</div>
</template>

