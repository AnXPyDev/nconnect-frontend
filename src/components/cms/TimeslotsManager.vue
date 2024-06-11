<script setup lang="ts">
import remote, { ApiCodes } from '@/lib/ApiRemote';
import type { Timeslot } from '@/lib/Bridge';
import { ref, toRaw } from 'vue';
import { exportDateTime, prettyDateTime } from '@/lib/Date';
import Button from '../Button.vue';

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

async function editConfirm(): Promise<boolean | string> {
    const ts = toRaw(toEdit.value)!!;

    let result: boolean | string = true;

    await remote.post("timeslot/edit", ts).then(async (res: { timeslot: Timeslot }) => {
        const timeslot = timeslots.value[timeslots.value.findIndex((v) => v.id == res.timeslot.id)];
        Object.assign(timeslot, res.timeslot);


        if (ts.presentation_id != res.timeslot.presentation_id) {
            await remote.post("timeslot/setpresentation", { id: res.timeslot.id, presentation_id: ts.presentation_id }).then((res) => {
                timeslot.presentation_id = ts.presentation_id;
            }).code(ApiCodes.Occupied, (res) => {
                console.error("OCCUPIED");
                result = "OCCUPIED";
            }).send();
        }
    }).code(ApiCodes.Overlap, (res) => {
        console.error("OVERLAP", res);
        result = "OVERLAP";
    }).send();

    return result;
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
    <div class="manager">
        <div class="timeslots">
            <TimeslotHolder v-for="timeslot in timeslots" :key="timeslot.id" :timeslot="timeslot" @edit="edit(timeslot)"/>
        </div>
        <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TIMESLOT</Button>
        <TimeslotEditor v-if="toEdit" v-model:timeslot="toEdit" :confirm="editConfirm" allow-delete @done="cancel" @delete="editDelete" @cancel="cancel">
            Edit timeslot [{{ toEdit.id }}]
        </TimeslotEditor>
        <TimeslotEditor v-if="toCreate" v-model:timeslot="toCreate" @done="createConfirm" @cancel="cancel">
            Create timeslot
        </TimeslotEditor>
    </div>
</template>

<style scoped lang="scss">

    .manager {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: start;

        > .timeslots, > .editor {
            width: 100%;
        }

        > .timeslots {
            display: flex;
            flex-direction: column;
            gap: 0.5em;

            > * {
                width: 100%;
            }
        }
    }

</style>

