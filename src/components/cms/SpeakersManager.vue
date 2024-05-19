<script setup lang="ts">

import remote from '@/lib/ApiRemote';
import { type Speaker } from '@/lib/Bridge';
import { ref } from 'vue';

const speakers = ref<Speaker[]>([]);

remote.post("speaker/index").then((response: { speakers: Speaker[] }) => {
    speakers.value = response.speakers;
}).send();

</script>

<template>
    <h2>speakers</h2>
    <div v-for="speaker in speakers" :key="speaker.id">{{ speaker.id }} {{ speaker.name }} {{ speaker.description }}</div>
</template>