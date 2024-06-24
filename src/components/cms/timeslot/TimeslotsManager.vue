<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import { AdminPriv, type Timeslot, type WithID } from '@/lib/remote/Models';
import { ref, toRaw } from 'vue';
import Button from '@/components/util/Button.vue';

import TimeslotEditor from './TimeslotEditor.vue';
import TimeslotHolder from './TimeslotHolder.vue';
import { copyEntity, deleteEntity, predicateByID, pushEntity, replaceEntity } from '@/lib/util/Snippets';
import RequestBuilder, { RequestFailedError, ResponseHandler, type FailResponse, type Response } from '@/lib/remote/RequestBuilder';
import { ApiCodes } from '@/lib/remote/Codes';
import Spinner from '@/components/util/Spinner.vue';
import { formatISO } from 'date-fns';
import { EmptyTimeslot } from '@/lib/remote/Generators';
import { ValidationError, throwValidation } from '@/lib/cms/Editor';
import { useAuth } from '@/stores/auth';


const props = defineProps<{
    stage_id: number
}>();

const timeslots = ref<WithID<Timeslot>[]>([]);

const loading = ref<boolean>(true);

remote.post("stage/timeslots", { id: props.stage_id }).then((res: Response<{ timeslots: WithID<Timeslot>[] }>) => {
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
    toCreate.value = EmptyTimeslot(props.stage_id);
}

function edit(ts: Timeslot) {
    reset();
    toEdit.value = copyEntity(ts);
}

async function editDelete() {
    const id = toEdit.value!!.id!!;
    await remote.post("timeslot/delete", { id }).fail(throwValidation).send();
    deleteEntity(timeslots, id);
}

function addHandlers(rh: ResponseHandler) {
    return rh.code(ApiCodes.Occupied, (res) => {
        throw new ValidationError("Presentation already assigned to another slot");
    })
    .code(ApiCodes.Overlap, (res: FailResponse<{ overlaps: WithID<Timeslot>[] }>) => {
        const ids = res.overlaps.map((v) => v.id);
        throw new ValidationError(`Ovelap with slots ${ids}`);
    });
};

async function editConfirm() {
    const { timeslot }: Response<{ timeslot: WithID<Timeslot> }> = await remote.post("timeslot/edit", toRaw(toEdit.value)!!).fail(throwValidation).apply(addHandlers).send();
    replaceEntity(timeslots, timeslot);
}

async function createConfirm() {
    const { timeslot }: Response<{ timeslot: WithID<Timeslot> }> = await remote.post("timeslot/create", toRaw(toCreate.value)!!).fail(throwValidation).apply(addHandlers).send();
    pushEntity(timeslots, timeslot);
}

const auth = useAuth();

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
            <Button v-if="auth.checkPriv(AdminPriv.EDIT)" @click="create"><i class="fa-solid fa-plus"></i>&nbsp; NEW TIMESLOT</Button>
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

