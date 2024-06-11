<script setup lang="ts">
import services from '@/lib/Service';
import { ref } from 'vue';


const text = ref<string>("REQUEST");

async function request() {
    const r = await services.getService("test")?.request({});
    text.value = String(r);
}

</script>

<template>
    <button @click="request">{{ text }}</button>
</template>