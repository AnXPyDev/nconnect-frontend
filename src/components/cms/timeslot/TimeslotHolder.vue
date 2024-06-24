<script setup lang="ts">

import { AdminPriv, type Timeslot, type WithID } from '@/lib/remote/Models';
import { ref } from 'vue';
import { format } from 'date-fns';
import { useAuth } from '@/stores/auth';
import TextButton from '../util/TextButton.vue';
import UsersManager from './UsersManager.vue';

const dt_fmt = "d. M. y HH:mm:ss";

const auth = useAuth();

const props = defineProps<{
    timeslot: WithID<Timeslot>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showUsers = ref(false);

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
            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i class="fa-solid fa-pen"></i>
            </TextButton>
            <TextButton @click="showUsers = !showUsers" :active="showUsers" class="icon-button">
                <i class="fa-solid fa-users"></i>
            </TextButton>
        </div>
        <UsersManager v-if="showUsers" :timeslot_id="timeslot.id!!"></UsersManager>
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
    }
}

</style>
