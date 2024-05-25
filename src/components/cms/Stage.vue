<script setup lang="ts">

import type { Stage } from '@/lib/Bridge';
import TimeslotsManager from './TimeslotsManager.vue';

const props = defineProps<{
    stage: Stage 
}>();

defineEmits<{
    edit: []
}>();

</script>

<template>
    <div>
        <div @click="$emit('edit')">[{{ stage.id }}] {{ stage.name }}</div>
        <TimeslotsManager v-if="stage.id" :stage_id="stage.id"/>
    </div>
</template>