<script setup lang="ts">

import { AdminPriv, type Timeslot, type WithID } from '@/lib/remote/Models';
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';

const dt_fmt = "d. M. y HH:mm:ss";

const props = defineProps<{
    timeslot: WithID<Timeslot>
}>();

const emit = defineEmits<{
    unregister: []
}>();

const auth = useAuth();

</script>

<template>
    <div class="timeslot">
        <div class="header">
            <div class="id">[{{ timeslot.id }}]</div>
            <div class="start"><i class="fa-solid fa-hourglass-start"></i>&nbsp; {{ format(timeslot.start_at, dt_fmt) }}</div>
            <i class="fa-solid fa-arrow-right"></i>
            <div class="end"><i class="fa-solid fa-hourglass-end"></i>&nbsp; {{ format(timeslot.end_at, dt_fmt) }}</div>
            <div v-if="timeslot.presentation"><i class="fa-solid fa-presentation"></i>&nbsp; <span class="id">[{{ timeslot.presentation.id }}]</span> {{ timeslot.presentation.name }}</div>
            <div class="nopresentation" v-else><i class="fa-solid fa-presentation"></i>&nbsp; No presentation assigned</div>
            <TextButton v-if="auth.checkPriv(AdminPriv.SUPER)" @click="emit('unregister')"><i class="fa-solid fa-xmark"></i></TextButton>
        </div> 
    </div>
</template>

<style lang="scss" scoped>

.timeslot {
    display: flex;
    flex-direction: column;

    border: solid 1.5px var(--clr-bg-2);
    padding: 0.5em;
    gap: 0.5em;

    > .header {
        display: flex;
        gap: 0.5em;

        .id {
            font-size: 0.75em;
            opacity: 75%;
        }

        > .nopresentation {
            opacity: 75%;
        }

        > .icon-button {
            cursor: pointer;
            &:hover {
                color: var(--clr-primary);
            }
        }
    }
}

</style>
