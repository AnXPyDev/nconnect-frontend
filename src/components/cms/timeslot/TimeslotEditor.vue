<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Speaker, type Stage, type Timeslot } from '@/lib/remote/Models';
import Input from '@/components/util/input/Input.vue';
import Editor from '@/components/cms/util/Editor.vue';
import PresentationSelector from '@/components/cms/presentation/PresentationSelector.vue';
import { format, formatISO, parse, parseISO } from 'date-fns';

const props = defineProps<{
    confirm: () => ConfirmationResult
    delete_?: () => ConfirmationResult
}>();

const timeslot = defineModel<Timeslot>({ required: true });

const emit = defineEmits<{
    done: []
}>();

const dateFmt = "d. M. y";
const timeFmt = "HH:mm";


const startDate = ref<string>("");
const startTime = ref<string>("");
const endDate = ref<string>("");
const endTime = ref<string>("");

function updateInputs() {
    const start = parseISO(timeslot.value.start_at);
    const end = parseISO(timeslot.value.end_at);
    
    startDate.value = format(start, dateFmt);
    startTime.value = format(start, timeFmt);
    endDate.value = format(end, dateFmt);
    endTime.value = format(end, timeFmt);
}

watch(timeslot, (val, old) => {
    if (val != old) {
        updateInputs();
    }
})

updateInputs();


function validate() {
    try {
        const start = parse(startTime.value, timeFmt, parse(startDate.value, dateFmt, new Date()));
        const end = parse(endTime.value, timeFmt, parse(endDate.value, dateFmt, new Date()));
        timeslot.value.start_at = start.toISOString();
        timeslot.value.end_at = end.toISOString();
    } catch (e) {
        console.error(e);
        return "Invalid date time format";
    }

    console.log(timeslot.value);


    if (!timeslot.value.presentation_id) {
        timeslot.value.presentation_id = undefined; 
    }

    return true;
}

</script>

<template>
    <Editor @done="emit('done')" v-bind="{ confirm, delete_, validate }">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="startDate">Start Date</Input>
            <Input v-model="startTime">Start Time</Input>
            <Input v-model="endDate">End Date</Input>
            <Input v-model="endTime">End Time</Input>
            <PresentationSelector :key="timeslot.id" :timeslot_id="timeslot.id" v-model="timeslot.presentation_id">Presentation</PresentationSelector>
        </template>
    </Editor>
</template>