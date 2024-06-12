<script setup lang="ts">
import { type Headliner } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import SpeakerSelector from '@/components/cms/speaker/SpeakerSelector.vue';
import StageSelector from '@/components/cms/stage/StageSelector.vue';

const props = defineProps<{
    confirm: () => ConfirmationResult
    delete_?: () => ConfirmationResult
}>();

const emit = defineEmits<{
    done: []
}>()

const headliner = defineModel<Headliner>({ required: true });

function validate() {
    if (headliner.value.speaker_id == null) {
        return "Speaker field empty";
    }
    
    if (headliner.value.stage_id == null) {
        return "Speaker field empty";
    }
}

</script>

<template>
    <Editor v-bind="{ confirm, delete_, validate }" @done="emit('done')">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <SpeakerSelector v-model="headliner.speaker_id">Speaker</SpeakerSelector>
            <StageSelector v-model="headliner.stage_id">Stage</StageSelector>
        </template>
    </Editor>
</template>