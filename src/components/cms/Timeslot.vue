<script setup lang="ts">

import { type Presentation, type Timeslot } from '@/lib/Bridge';
import { prettyDateTime } from '@/lib/Date';
import { ref, watch } from 'vue';
import PresentationHolder from './Presentation.vue';
import remote from '@/lib/ApiRemote';

const props = defineProps<{
    timeslot: Timeslot
}>();

const emit = defineEmits<{
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
    <div class="timeslot">
        <div class="header">
            <div class="id">[{{ timeslot.id }}]</div>
            <div class="start"><i class="fa-solid fa-hourglass-start"></i>&nbsp; {{ prettyDateTime(timeslot.start_at) }}</div>
            <i class="fa-solid fa-arrow-right"></i>
            <div class="end"><i class="fa-solid fa-hourglass-end"></i>&nbsp; {{ prettyDateTime(timeslot.end_at) }}</div>
            <div v-if="presentation"><i class="fa-solid fa-presentation"></i>&nbsp; <span class="id">[{{ presentation.id }}]</span> {{ presentation.name }}</div>
            <div class="nopresentation" v-else><i class="fa-solid fa-presentation"></i>&nbsp; No presentation assigned</div>
            <i @click="emit('edit')" class="icon-button fa-solid fa-pen"></i>
        </div> 
    </div>
</template>

<style lang="scss" scoped>

.timeslot {
    display: flex;
    flex-direction: column;

    border: solid 1.5px var(--clr-bg-2);
    padding: 0.5em;
    gap: 0.5em;

    > .header {
        display: flex;
        gap: 0.5em;

        .id {
            font-size: 0.75em;
            opacity: 75%;
        }

        > .nopresentation {
            opacity: 75%;
        }

        > .icon-button {
            cursor: pointer;
            &:hover {
                color: var(--clr-primary);
            }
        }
    }
}

</style>
