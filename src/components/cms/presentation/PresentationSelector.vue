<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Presentation } from '@/lib/remote/Models';
import type { Response } from '@/lib/remote/RequestBuilder';

const props = defineProps<{
    timeslot_id?: number
}>();

const presentations = ref<Presentation[]>([]);

remote.post("presentation/available", {
    timeslot_id: props.timeslot_id
}).then((res: Response<{ presentations: Presentation[] }>) => {
    presentations.value = res.presentations;
}).send();

const presentation_id = defineModel<number | undefined>();

</script>

<template>
    <div class="input">
        <div class="label">
            <slot></slot>
        </div>
        <select v-model="presentation_id">
            <option :value="null">none</option>
            <option v-for="i in presentations" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
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