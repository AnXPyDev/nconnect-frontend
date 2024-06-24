<script setup lang="ts">

import { nullableStringModel, type Nullable } from '@/lib/util/Snippets';
import InputAbstract from './InputAbstract.vue';

const out = defineModel<Nullable<string>>({ required: true });
const model = nullableStringModel(out);

</script>

<template>
    <InputAbstract>
        <template #label>
            <slot></slot>
        </template>
        <template #default>
            <input v-model="model">
        </template>
    </InputAbstract>
</template>