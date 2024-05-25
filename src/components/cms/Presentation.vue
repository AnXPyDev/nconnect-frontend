<script setup lang="ts">

import { type Presentation } from '@/lib/Bridge';

const props = defineProps<{
    presentation: Presentation
}>();

defineEmits<{
    edit: []
}>();

</script>

<template>

    <div @click="$emit('edit')">[{{ presentation.id }}] {{ presentation.name }} {{  presentation.description }}</div>

</template>