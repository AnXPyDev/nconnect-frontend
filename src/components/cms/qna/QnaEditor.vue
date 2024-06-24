<script setup lang="ts">
import { type Qna } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import type { ConfirmationCallback } from '@/lib/cms/Editor';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const qna = defineModel<Qna>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (!qna.value.question) {
        return "Question empty";
    }
    
    if (!qna.value.answer) {
        return "Answer empty";
    }

    return true;
}


</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="qna.question">Question</Input>
            <TextArea v-model="qna.answer">Answer</TextArea>
        </template>
    </Editor>
</template>