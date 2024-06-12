<script setup lang="ts">
import services, { type DefferedServiceRequest, type ServiceFeeder } from '@/lib/service/Service';
import { ref } from 'vue';

const working = ref<boolean>(false);
let feed: ServiceFeeder;
let request: DefferedServiceRequest | undefined = undefined;

async function take() {
    request = await feed();
    working.value = true;
}

async function complete() {
    request?.resolve(Math.random());
    working.value = false;
    take();
}

services.registerService("test", {
    registerFeed: (feed_) => {
        feed = feed_
        take();
    }
});

</script>

<template>
    <button v-if="working" @click="complete">RESOLVE</button>
</template>