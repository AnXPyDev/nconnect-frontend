<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import type { Timeslot } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import Button from '@/components/util/Button.vue';

import TimeslotEditor from './TimeslotEditor.vue';
import TimeslotHolder from './TimeslotHolder.vue';
import { predicateByID } from '@/lib/util/Snippets';
import { RequestFailedError, ResponseHandler, type FailResponse, type Response } from '@/lib/remote/RequestBuilder';
import ApiCodes from '@/lib/remote/Codes';
import Spinner from '@/components/util/Spinner.vue';
import { formatISO } from 'date-fns';


const props = defineProps<{
    stage_id: number
}>();

const timeslots = ref<Timeslot[]>([]);

const loading = ref<boolean>(true);

remote.post("stage/timeslots", { id: props.stage_id }).then((res: Response<{ timeslots: Timeslot[] }>) => {
    timeslots.value = res.timeslots;
    loading.value = false;
}).send();

const toCreate = ref<Timeslot>();
const toEdit = ref<Timeslot>();

function reset() {
    toCreate.value = undefined;
    toEdit.value = undefined;
}

function create() {
    reset();
    toCreate.value = {
        stage_id: props.stage_id,
        start_at: formatISO(Date.now()),
        end_at: formatISO(Date.now()),
        presentation_id: undefined
    };
}

function edit(ts: Timeslot) {
    reset();
    toEdit.value = Object.assign({}, ts);
}

async function editDelete() {
    const ts = toRaw(toEdit.value)!!;
    const id = toEdit.value!!.id!!;
    await remote.post("timeslot/delete", { id }).send();
    timeslots.value.splice(timeslots.value.findIndex(predicateByID(id)), 1);
}

const errorHandler = new ResponseHandler()
    .code(ApiCodes.Occupied, (res: FailResponse) => "OCCUPIED")
    .code(ApiCodes.Overlap, (res: FailResponse) => "OVERLAP")
;

async function editConfirm() {
    try {
        const { timeslot }: Response<{ timeslot: Timeslot }> = await remote.post("timeslot/edit", toRaw(toEdit.value)!!).send();
        Object.assign(timeslots.value.find(predicateByID(timeslot.id!!))!!, timeslot);
    } catch (e) {
        if (!(e instanceof RequestFailedError)) {
            throw e;
        }
        return await errorHandler.handle(e.response);
    }
}

async function createConfirm() {
    try {
        const { timeslot }: Response<{ timeslot: Timeslot }> = await remote.post("timeslot/create", toRaw(toCreate.value)!!).send();
        timeslots.value.push(timeslot);
    } catch (e) {
        if (!(e instanceof RequestFailedError)) {
            throw e;
        }
        return await errorHandler.handle(e.response);
    }
}

</script>


<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <TimeslotHolder v-for="timeslot in timeslots" :key="timeslot.id" :timeslot="timeslot" @edit="edit(timeslot)"/>
            </div>
            <Button @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TIMESLOT</Button>
            <TimeslotEditor v-if="toEdit" v-model="toEdit" :confirm="editConfirm" :delete_="editDelete" @done="reset">
                Edit timeslot [{{ toEdit.id }}]
            </TimeslotEditor>
            <TimeslotEditor v-if="toCreate" v-model="toCreate" :confirm="createConfirm" @done="reset">
                Create timeslot
            </TimeslotEditor>
        </template>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>

