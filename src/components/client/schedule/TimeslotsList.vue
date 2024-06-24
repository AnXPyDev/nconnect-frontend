<script setup lang="ts">
import { ref } from 'vue';
import type { Timeslot } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import TimeslotHolder from './TimeslotHolder.vue';
import { parseISO } from 'date-fns/parseISO';
import { format } from 'date-fns/format';
import { sk } from 'date-fns/locale/sk';
import { sortTimeslots } from '@/lib/client/Schedule';

const props = defineProps<{
    stage_id: number
}>();

const loading = ref<boolean>(true);

interface TimeslotWrapper {
    start_at: Date
    timeslot: Timeslot
}

const dates = ref<string[]>([]);
const timeslots = ref<Record<string, Timeslot[]>>({});

remote.post("stage/scheduleinfo", { id: props.stage_id }).then((res: Response<{ timeslots: Timeslot[] }>) => {
    const { dates: dates_, timeslots: timeslots_ } = sortTimeslots(res.timeslots);

    timeslots.value = timeslots_;
    dates.value = dates_;
    loading.value = false;
}).send();

const openTimeslot = ref<number>();

function open(id: number) {
    if (openTimeslot.value == id) {
        openTimeslot.value = undefined;
        return;
    }
    openTimeslot.value = id;
}

</script>

<template>

<div class="timeslots-list">
    <Spinner class="spinner" v-if="loading"></Spinner>

    <template v-else v-for="date in dates">
        <div class="date"><i class="fa-solid fa-calendar"></i>&nbsp; {{ date }}</div>
        <TimeslotHolder
            v-for="timeslot in timeslots[date]" 
            @open="open(timeslot.id!!)" class="timeslot" 
            :open="timeslot.id == openTimeslot" v-bind="{ timeslot }"
        />
    </template>
</div>

</template>

<style scoped lang="scss">

@use '@/styles/schedule-table';

.timeslots-list {
    display: flex;
    flex-direction: column;

    width: 100%;
    color: var(--clr-fg);
    background-color: var(--clr-bg);

    > .date {
        text-transform: uppercase;
        font-weight: 900;
        display: flex;
        align-items: center;
        height: calc(schedule-table.$row-height * 0.75);
        border-bottom: 1px solid var(--clr-bg-2);
        color: var(--clr-primary);
        background-color: var(--clr-bg-1);

        @include schedule-table.align;
    }

    > .timeslot {
        width: 100%;
    }
}

</style>