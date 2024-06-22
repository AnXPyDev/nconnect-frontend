<script setup lang="ts">

import InputAbstract from './InputAbstract.vue';

const model = defineModel<number>();

</script>

<template>
    <InputAbstract>
        <template #label>
            <slot></slot>
        </template>
        <template #default>
            <input v-model.number="model" type="number">
        </template>
    </InputAbstract>
</template>