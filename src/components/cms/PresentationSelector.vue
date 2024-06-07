<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Presentation } from '@/lib/Bridge';
import { ref } from 'vue';

const props = defineProps<{
    timeslot_id?: number
}>();

const presentations = ref<Presentation[]>([]);

remote.post("presentation/available", {
    timeslot_id: props.timeslot_id
}).then((res: { presentations: Presentation[] }) => {
    presentations.value = res.presentations;
}).send();

const presentation_id = defineModel<number | undefined>();

</script>

<template>
    <select v-model="presentation_id">
        <option :value="null">none</option>
        <option v-for="i in presentations" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
    </select>
</template>