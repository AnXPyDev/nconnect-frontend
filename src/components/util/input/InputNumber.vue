<script setup lang="ts">

import type { Nullable } from '@/lib/util/Snippets';
import InputAbstract from './InputAbstract.vue';

const model = defineModel<Nullable<number>>();

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