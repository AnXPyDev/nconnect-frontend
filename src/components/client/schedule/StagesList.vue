<script setup lang="ts">

import Spinner from '@/components/util/Spinner.vue';
import type { Stage } from '@/lib/remote/Models';
import remote from '@/lib/remote/Remote';
import type { Response } from '@/lib/remote/RequestBuilder';
import { ref } from 'vue';

const emit = defineEmits<{
    select: [number]
}>();

const props = defineProps<{
    selected?: number
}>();

const stages = ref<Stage[]>([]);
const loading = ref<boolean>(true);

remote.post("stage/index").then((res: Response<{ stages: Stage[] }>) => {
    stages.value = res.stages;

    if (res.stages.length != 0) {
        emit('select', res.stages[0].id!!);
    }

    loading.value = false;
}).send();

</script>

<template>
    <div class="stages-list">
        <Spinner v-if="loading"></Spinner>
        <div v-else @click="emit('select', stage.id!!)" class="stage" :class="{ selected: stage.id == selected }" v-for="stage in stages">
            <span class="name">{{ stage.name }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/schedule-table';

.stages-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .stage {
        width: 100%;
        height: schedule-table.$row-height;
        @include schedule-table.align;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: start;

        transition: 0.5s ease all;

        cursor: pointer;

        &:hover, &.selected {
            background-color: var(--clr-primary-1);
        }

        > .name {
            font-size: 1.2em;
            font-weight: 900;
        }

    }
}
</style>