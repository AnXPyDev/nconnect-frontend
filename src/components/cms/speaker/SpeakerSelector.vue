<script setup lang="ts">
import { ref } from 'vue';
import remote from '@/lib/remote/Remote';
import { type Presentation, type Speaker } from '@/lib/remote/Models';
import type { Response } from '@/lib/remote/RequestBuilder';

const speakers = ref<Speaker[]>([]);

remote.post("speaker/index", {}).then((res: Response<{ speakers: Speaker[] }>) => {
    speakers.value = res.speakers;
}).send();

const speaker_id = defineModel<number | undefined>();

</script>

<template>
    <div class="input">
        <div class="label">
            <slot></slot>
        </div>
        <select v-model="speaker_id">
            <option :value="null">none</option>
            <option v-for="i in speakers" :value="i.id">[{{ i.id }}] {{ i.name }}</option>
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