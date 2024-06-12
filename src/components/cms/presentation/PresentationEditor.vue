<script setup lang="ts">
import { type Presentation } from '@/lib/remote/Models';
import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import TextArea from '@/components/util/input/TextArea.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const presentation = defineModel<Presentation>({ required: true });


const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (presentation.value.name.length == 0) {
        return "Name empty";
    }

    return true;
}

</script>

<template>
    <Editor v-bind="{ confirm, validate, delete_ }" @done="emit('done')">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="presentation.name">Name</Input>
            <TextArea v-model="presentation.description">Short Description</TextArea>
            <TextArea v-model="presentation.long_description">Long Description</TextArea>
        </template>
    </Editor>
</template>