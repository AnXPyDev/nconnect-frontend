<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Stage } from '@/lib/Bridge';

import Editor from './Editor.vue';
import TextArea from '../TextArea.vue';
import Input from '../Input.vue';
import ImageResourceSelector from './ImageResourceSelector.vue';

const props = defineProps<{
    allowDelete?: boolean
}>();

const speaker = defineModel<Speaker>("speaker", { required: true });

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function validate() {
    if (speaker.value!!.name.length == 0) {
        return "Name empty";
    }

    return true;
}


</script>

<template>
    <Editor @done="emit('done')" @cancel="emit('cancel')" @delete="emit('delete')" :allow-delete="allowDelete" :validate="validate">
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