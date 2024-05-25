<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Stage, type Timeslot } from '@/lib/Bridge';
import { isDateValid, parseDateTime } from '@/lib/Date';

const props = defineProps<{
    allowDelete?: boolean
}>();

const timeslot = defineModel<Timeslot>("timeslot", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (!isDateValid(timeslot.value.start_at)) {
        error.value = "Start Date invalid";
        return;
    }
    
    if (!isDateValid(timeslot.value.end_at)) {
        error.value = "End Date invalid";
        return;
    }

    if (!timeslot.value.presentation_id) {
        timeslot.value.presentation_id = undefined; 
    }

    emit("done");
}

function delete_() {
    emit("delete");
}

function cancel() {
    emit("cancel");
}

</script>

<template>
    <div>
        <input v-model="timeslot.start_at"></input>
        <input v-model="timeslot.end_at"></input>
        <input type="number" v-model="timeslot.presentation_id"></input>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>