<script setup lang="ts">

import { type Presentation, type Timeslot } from '@/lib/Bridge';
import { prettyDateTime } from '@/lib/Date';
import { ref, watch } from 'vue';
import PresentationHolder from './Presentation.vue';
import remote from '@/lib/ApiRemote';

const props = defineProps<{
    timeslot: Timeslot
}>();

defineEmits<{
    edit: []
}>();

const presentation = ref<Presentation>();

let last_presentation_id: number | undefined;
function getPresentation() {
    const id = props.timeslot.presentation_id;
    if (last_presentation_id === id) {
        return;
    }

    last_presentation_id = id;

    if (id == undefined) {
        presentation.value = undefined;
        return;
    }

    remote.post("timeslot/presentation", { id: props.timeslot.id }).then((res: { presentation: Presentation }) => {
        presentation.value = res.presentation;
    }).send();

}

watch(props.timeslot, getPresentation);
getPresentation();

</script>

<template>
    <div @click="$emit('edit')">[{{ timeslot.id }}] {{ prettyDateTime(timeslot.start_at) }} - {{ prettyDateTime(timeslot.end_at) }}</div>
    <PresentationHolder v-if="presentation" :presentation="presentation"/>
</template>