<script setup lang="ts">
import remote from '@/lib/ApiRemote';
import { type Speaker } from '@/lib/Bridge';
import { ref } from 'vue';

const speakers = ref<Speaker[]>([]);

remote.post("speaker/index", {}).then((res: { speakers: Speaker[] }) => {
    speakers.value = res.speakers;
}).send();

const speaker_id = defineModel<number | undefined>();

</script>

<template>
    <select v-model="speaker_id">
        <option :value="null">none</option>
        <option v-for="i in speakers" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
    </select>
</template>