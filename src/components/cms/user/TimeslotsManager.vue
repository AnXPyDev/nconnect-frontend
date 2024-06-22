<script setup lang="ts">
import remote from '@/lib/remote/Remote';
import type { Timeslot } from '@/lib/remote/Models';
import { ref } from 'vue';

import TimeslotHolder from './TimeslotHolder.vue';
import Spinner from '@/components/util/Spinner.vue';
import type { Response } from '@/lib/remote/RequestBuilder';


const props = defineProps<{
    user_id: number
}>();

const timeslots = ref<Timeslot[]>([]);

const loading = ref<boolean>(true);

remote.post("user/timeslots", { id: props.user_id }).then((res: Response<{ timeslots: Timeslot[] }>) => {
    timeslots.value = res.timeslots;
    loading.value = false;
}).send();


</script>


<template>
    <div class="manager">
        <template v-if="loading">
            <Spinner></Spinner>
        </template>
        <template v-else>
            <div class="items">
                <TimeslotHolder v-for="timeslot in timeslots" :key="timeslot.id" :timeslot="timeslot"/>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.manager {
    @include mixins.cmsmanager;
}

</style>

