<script setup lang="ts">
import { ref } from 'vue';
import type { Timeslot } from '@/lib/remote/Models';
import TimeslotHolder from '@/components/client/schedule/TimeslotHolder.vue';
import { sortTimeslots } from '@/lib/client/Schedule';
import { useAuth } from '@/stores/auth';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';

const loading = ref<boolean>(true);

const dates = ref<string[]>([]);
const timeslots = ref<Record<string, Timeslot[]>>({});

remote.post("user/mytimeslots").then((res: Response<{ timeslots: Timeslot[] }>) => {
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
    <template v-for="date in dates">
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

    --background: var(--clr-bg);
    --date-fg: var(--clr-primary);
    --date-bg: var(--clr-fg-on-primary);

    width: 100%;
    color: var(--clr-fg);
    background-color: var(--background);

    > .date {
        text-transform: uppercase;
        font-weight: 900;
        display: flex;
        align-items: center;
        height: calc(schedule-table.$row-height * 0.75);
        border-bottom: 1px solid var(--clr-bg-2);
        padding-left: schedule-table.$align;
        color: var(--clr-primary);
        background-color: var(--clr-bg-alt);
    }

    > .timeslot {
        width: 100%;
    }
}

</style>