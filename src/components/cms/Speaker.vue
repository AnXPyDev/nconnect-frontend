<script setup lang="ts">

import { type Speaker } from '@/lib/Bridge';
import PresentationsManager from './PresentationsManager.vue';

const props = defineProps<{
    speaker: Speaker
}>();

defineEmits<{
    edit: []
}>();

</script>

<template>
    <div @click="$emit('edit')">[{{ speaker.id }}] {{ speaker.name }} {{ speaker.description }}</div>
    <PresentationsManager v-if="speaker.id" :speaker_id="speaker.id"/>
</template>