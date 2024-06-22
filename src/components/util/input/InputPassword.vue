<script setup lang="ts">

import InputAbstract from './InputAbstract.vue';

const model = defineModel<string>();

</script>

<template>
    <InputAbstract>
        <template #label>
            <slot></slot>
        </template>
        <template #default>
            <input v-model="model" type="password">
        </template>
    </InputAbstract>
</template>