<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Stage } from '@/lib/remote/Models';
import type { Response } from '@/lib/remote/RequestBuilder';

const stages = ref<Stage[]>([]);

remote.post("stage/index", {}).then((res: Response<{ stages: Stage[] }>) => {
    stages.value = res.stages;
}).send();

const stage_id = defineModel<number | undefined>();

</script>

<template>
    <div class="input">
        <div class="label">
            <slot></slot>
        </div>
        <select v-model="stage_id">
            <option :value="null">none</option>
            <option v-for="i in stages" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
        </select>
    </div>
</template>

<style scoped lang="scss">

.input {
    --min-input-width: 0;

    display: flex;
    align-items: center;
    gap: 0.5em;

    > input {
        min-width: var(--min-input-width);
    }

}

</style>