<script setup lang="ts">

import type { Resource } from '@/lib/Bridge';
import { getResourceURL } from '@/lib/urls';

const props = defineProps<{
    resource: Resource
}>();

const emit = defineEmits<{
    remove: []
}>();

</script>

<template>
    <div>
        <img :src="getResourceURL(resource.id!!)">
        {{ resource.name }}
        <button @click="emit('remove')">remove</button>
    </div>
</template>

<style scoped lang="scss">
    img {
        width: 200px;
    }
</style>