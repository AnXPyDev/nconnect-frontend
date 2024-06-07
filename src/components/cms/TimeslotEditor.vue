<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Stage, type Timeslot } from '@/lib/Bridge';
import { isDateValid, parseDateTime } from '@/lib/Date';
import Input from '../Input.vue';
import Editor from './Editor.vue';
import PresentationSelector from './PresentationSelector.vue';

const props = defineProps<{
    allowDelete?: boolean
}>();

const timeslot = defineModel<Timeslot>("timeslot", { required: true });

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function validate() {
    if (!isDateValid(timeslot.value.start_at)) {
        return "Start Date invalid";
    }
    
    if (!isDateValid(timeslot.value.end_at)) {
        return "End Date invalid";
    }

    if (!timeslot.value.presentation_id) {
        timeslot.value.presentation_id = undefined; 
    }

    return true;
}

</script>

<template>
    <Editor @cancel="emit('cancel')" @done="emit('done')" @delete="emit('delete')" :validate="validate" :allow-delete="allowDelete">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="timeslot.start_at">Start</Input>
            <Input v-model="timeslot.end_at">End</Input>
            <PresentationSelector :key="timeslot.id" :timeslot_id="timeslot.id" v-model="timeslot.presentation_id"></PresentationSelector>
        </template>
    </Editor>
</template>