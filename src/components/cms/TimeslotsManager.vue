<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import type { RawTimeslot, Timeslot } from '@/lib/Bridge';
import { ref } from 'vue';
import { parseTimeslot, exportTimeslot } from '@/lib/Bridge';
import { exportDateTime, prettyDateTime } from '@/lib/Date';


const props = defineProps<{
    stage_id: number
}>();

const timeslots = ref<Timeslot[]>([]);

remote.post("stage/timeslots", { id: props.stage_id }).then((res: { timeslots: RawTimeslot[] }) => {
    console.log(res.timeslots);
    timeslots.value = res.timeslots.map(parseTimeslot);
}).send();

</script>


<template>
    <div v-for="timeslot in timeslots">[{{ timeslot.id }}] {{ prettyDateTime(timeslot.start_at) }} - {{ prettyDateTime(timeslot.end_at) }}</div>
</template>