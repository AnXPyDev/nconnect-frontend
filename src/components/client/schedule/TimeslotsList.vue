<script setup lang="ts">
import { ref } from 'vue';
import type { Timeslot } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import Spinner from '@/components/util/Spinner.vue';
import TimeslotHolder from './TimeslotHolder.vue';

const props = defineProps<{
    stage_id: number
}>();

const timeslots = ref<Timeslot[]>();
const loading = ref<boolean>(true);

remote.post("stage/timeslotsplus", { id: props.stage_id }).then((res: Response<{ timeslots: Timeslot[] }>) => {
    timeslots.value = res.timeslots;
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
    <TimeslotHolder v-else
        v-for="timeslot in timeslots" 
        @open="open(timeslot.id!!)" class="timeslot" 
        :open="timeslot.id == openTimeslot" v-bind="{ timeslot }"
    />
</div>

</template>

<style scoped lang="scss">

.timeslots-list {
    display: flex;
    flex-direction: column;

    width: 100%;
    color: var(--clr-fg);
    background-color: var(--clr-bg);

    > .timeslot {
        width: 100%;
    }
}

</style>