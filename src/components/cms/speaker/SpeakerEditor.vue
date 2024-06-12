<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Stage } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const speaker = defineModel<Speaker>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (speaker.value!!.name.length == 0) {
        return "Name empty";
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
            <Input v-model="speaker.name">Name</Input>
            <TextArea v-model="speaker.description">Description</TextArea>
            <ImageResourceSelector v-model="speaker.image_id"></ImageResourceSelector>
        </template>
    </Editor>
</template>