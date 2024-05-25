<script setup lang="ts">
import remote, { ApiCodes } from '@/lib/ApiRemote';
import type { Timeslot } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';
import { exportDateTime, prettyDateTime } from '@/lib/Date';

import TimeslotEditor from './TimeslotEditor.vue';
import TimeslotHolder from './Timeslot.vue';


const props = defineProps<{
    stage_id: number
}>();

const timeslots = ref<Timeslot[]>([]);

const toCreate = ref<Timeslot>();
const toEdit = ref<Timeslot>();

function cancel() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    cancel();
    toCreate.value = {
        stage_id: props.stage_id,
        start_at: "",
        end_at: "",
        presentation_id: NaN
    };
}

function edit(ts: Timeslot) {
    cancel();
    toEdit.value = Object.assign({}, ts);
}

function editDelete() {
    const ts = toRaw(toEdit.value)!!;
    cancel();
    remote.post("timeslot/delete", { id: ts.id }).then((res) => {
        timeslots.value.splice(timeslots.value.findIndex((v) => v.id == ts.id), 1);
    }).send();
}

function editConfirm() {
    const ts = toRaw(toEdit.value)!!;
    cancel();
    remote.post("timeslot/edit", ts).then((res: { timeslot: Timeslot }) => {
        const timeslot = timeslots.value[timeslots.value.findIndex((v) => v.id == res.timeslot.id)];
        Object.assign(timeslot, res.timeslot);


        if (ts.presentation_id != res.timeslot.presentation_id) {
            remote.post("timeslot/setpresentation", { id: res.timeslot.id, presentation_id: ts.presentation_id }).then((res) => {
                timeslot.presentation_id = ts.presentation_id;
            }).code(ApiCodes.Occupied, (res) => {
                console.error("OCCUPIED");
            }).send();
        }
    }).code(ApiCodes.Overlap, (res) => {
        console.error("OVERLAP", res);
    }).send();
}

function createConfirm() {
    const ts = toRaw(toCreate.value)!!;
    cancel();
    remote.post("timeslot/create", ts).then((res: { timeslot: Timeslot }) => {
        const timeslot = res.timeslot;
        timeslots.value.push(timeslot);

        
        if (ts.presentation_id) {
            remote.post("timeslot/setpresentation", { id: res.timeslot.id, presentation_id: ts.presentation_id }).then((res) => {
                timeslot.presentation_id = ts.presentation_id;
            }).code(ApiCodes.Occupied, (res) => {
                console.error("OCCUPIED");
            }).send();
        }

    }).code(ApiCodes.Overlap, (res) => {
        console.error("OVERLAP", res);
    }).send();
}


remote.post("stage/timeslots", { id: props.stage_id }).then((res: { timeslots: Timeslot[] }) => {
    timeslots.value = res.timeslots;
}).send();

</script>


<template>
    <h3>timeslots</h3>
    <TimeslotHolder v-for="timeslot in timeslots" :key="timeslot.id" :timeslot="timeslot" @edit="edit(timeslot)"/>
    <button @click="create">create</button>
    <TimeslotEditor v-if="toEdit" v-model:timeslot="toEdit" allow-delete @done="editConfirm" @delete="editDelete" @cancel="cancel" />
    <TimeslotEditor v-if="toCreate" v-model:timeslot="toCreate" @done="createConfirm" @cancel="cancel" />
</template>